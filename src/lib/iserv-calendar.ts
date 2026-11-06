import ICAL from "ical.js";

import { upcomingDates, type DateItem } from "@/lib/next-dates";

/**
 * The school's public IServ calendar (Mail der Schulleitung vom 2.11.2026). The key belongs to a calendar
 * the school published on purpose, so it lives here instead of in an environment variable.
 */
export const ISERV_CALENDAR_URL =
  "https://stuebenhofer-weg.de/iserv/calendar/public?key=912877c43e81bc5404579a339a606f14";

// How far ahead recurring entries are expanded.
const HORIZON_DAYS = 400;
const MAX_OCCURRENCES = 200;

const pad = (n: number) => String(n).padStart(2, "0");
const clock = (t: ICAL.Time) => `${pad(t.hour)}:${pad(t.minute)}`;
// All-day entries are pinned to noon UTC, like the CMS's day-only dates, so no time zone moves them a day.
const noon = (t: ICAL.Time) => new Date(Date.UTC(t.year, t.month - 1, t.day, 12)).toISOString();

function toItem(event: ICAL.Event, start: ICAL.Time, end: ICAL.Time | null): DateItem {
  const base = { id: `iserv-${event.uid}-${start.toString()}`, title: event.summary?.trim() || "Termin", kind: "event" as const };
  const location = event.location?.trim() || null;

  if (start.isDate) {
    // DTEND of an all-day entry is exclusive: an entry on 14.–16.12. ends on 17.12.
    const last = end?.clone();
    last?.adjust(-1, 0, 0, 0);
    const multiDay = last && last.compare(start) > 0;
    return { ...base, startDate: noon(start), endDate: multiDay ? noon(last) : null, location };
  }

  const sameDay = !end || (end.year === start.year && end.month === start.month && end.day === start.day);
  return {
    ...base,
    startDate: start.toJSDate().toISOString(),
    endDate: sameDay ? null : end.toJSDate().toISOString(),
    time: end && sameDay ? `${clock(start)} – ${clock(end)} Uhr` : `${clock(start)} Uhr`,
    location,
  };
}

/** Upcoming entries of an iCalendar feed as dates for {@link DateRow}; an empty list for anything unreadable. */
export function parseCalendar(ics: string, now = new Date()): DateItem[] {
  let calendar: ICAL.Component;
  try {
    calendar = new ICAL.Component(ICAL.parse(ics));
  } catch {
    return [];
  }

  // Times like DTSTART;TZID=Europe/Berlin only convert correctly once the feed's zones are known.
  for (const vtimezone of calendar.getAllSubcomponents("vtimezone")) {
    const zone = new ICAL.Timezone(vtimezone);
    if (zone.tzid && !ICAL.TimezoneService.has(zone.tzid)) ICAL.TimezoneService.register(zone);
  }

  const horizon = new Date(now.getTime() + HORIZON_DAYS * 24 * 60 * 60 * 1000);
  const items: DateItem[] = [];

  for (const vevent of calendar.getAllSubcomponents("vevent")) {
    const event = new ICAL.Event(vevent);
    if (!event.startDate) continue;

    if (!event.isRecurring()) {
      items.push(toItem(event, event.startDate, event.endDate ?? null));
      continue;
    }

    const occurrences = event.iterator();
    for (let next = occurrences.next(), n = 0; next && n < MAX_OCCURRENCES; next = occurrences.next(), n++) {
      if (next.toJSDate() > horizon) break;
      const { startDate, endDate } = event.getOccurrenceDetails(next);
      items.push(toItem(event, startDate, endDate));
    }
  }

  return upcomingDates(items, now);
}

/** The upcoming entries of the school's public IServ calendar, refreshed at most hourly; empty if IServ is down. */
/** Upcoming entries of the public IServ calendar; `null` when it can't be loaded. */
export async function loadSchoolCalendar(now = new Date()): Promise<DateItem[] | null> {
  try {
    const res = await fetch(ISERV_CALENDAR_URL, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return parseCalendar(await res.text(), now);
  } catch (err) {
    console.error("IServ-Kalender konnte nicht geladen werden", err);
    return null;
  }
}
