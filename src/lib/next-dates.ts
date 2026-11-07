import type { Department } from "@/payload-types";

export type DateItem = NonNullable<NonNullable<Department["dates"]>["items"]>[number];

const TIME_ZONE = "Europe/Berlin";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TIME_ZONE,
  });
}

export function dateText(item: DateItem) {
  if (item.dateLabel) return item.dateLabel;
  if (item.endDate) return `${formatDate(item.startDate)} – ${formatDate(item.endDate)}`;
  return formatDate(item.startDate);
}

/** Termine whose (end) date lies before today are hidden, sorted by start date. */
export function upcomingDates(items: DateItem[] | null | undefined, now = new Date()) {
  const today = new Date(now.toLocaleDateString("en-CA", { timeZone: TIME_ZONE }));
  return (items ?? [])
    .filter((item) => {
      const last = new Date(new Date(item.endDate ?? item.startDate).toLocaleDateString("en-CA", { timeZone: TIME_ZONE }));
      return last >= today;
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

/** The next `limit` upcoming dates across all departments, each tagged with its department. */
export function nextDates(departments: Department[], limit = 3, now = new Date()) {
  const sorted = upcomingDates(
    departments.flatMap((d) => (d.dates?.items ?? []).map((item) => ({ ...item, department: d.title }))),
    now,
  ) as Array<DateItem & { department: string }>;
  // A joint event (e.g. the Tag der offenen Tür) is entered in each department; list it once, naming all of them.
  const byKey = new Map<string, { item: DateItem & { department: string }; departments: string[] }>();
  for (const item of sorted) {
    const day = new Date(item.startDate).toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
    const key = `${item.title.trim().toLowerCase()}|${day}`;
    const seen = byKey.get(key);
    if (seen) seen.departments.push(item.department);
    else byKey.set(key, { item: { ...item }, departments: [item.department] });
  }
  // „Primarstufe & Mittelstufe“, „Primarstufe, Mittelstufe & Oberstufe“.
  const list = (names: string[]) => (names.length < 2 ? names[0] : `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`);
  return [...byKey.values()].map(({ item, departments }) => ({ ...item, department: list(departments) })).slice(0, limit);
}

const OPEN_DAY = /offene[nr]? T(ü|ue)r/i;

/**
 * All upcoming dates of every department for /termine, by kind. A „Tag der offenen Tür“ is pulled
 * out of its kind, so the page can feature it on its own.
 */
export function datesByKind(departments: Department[], now = new Date()) {
  const all = nextDates(departments, Infinity, now);
  const rest = all.filter((d) => !OPEN_DAY.test(d.title));
  return {
    openDay: all.filter((d) => OPEN_DAY.test(d.title)),
    registration: rest.filter((d) => d.kind === "registration"),
    info: rest.filter((d) => d.kind === "info"),
    event: rest.filter((d) => d.kind === "event"),
  };
}

/**
 * Every department with its registration windows that are still open or ahead, the earliest
 * deadline first. Departments without windows stay in the list, so each Stufe gets a row.
 */
export function registrationDeadlines(departments: Department[], now = new Date()) {
  const end = (item: DateItem) => new Date(item.endDate ?? item.startDate).getTime();
  return departments.map((d) => ({
    slug: d.slug,
    title: d.title,
    grades: d.grades,
    windows: upcomingDates(d.dates?.items, now)
      .filter((item) => item.kind === "registration")
      .sort((a, b) => end(a) - end(b)),
  }));
}

// Fixed names, as Intl's German short months mix "Jan" and "Feb." depending on the format.
const MONTHS = ["Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dez"];

/** Calendar tile of a registration window: its last day, or its first day when it has no end. */
export function deadlineTile(item: DateItem) {
  const [, month, day] = new Date(item.endDate ?? item.startDate)
    .toLocaleDateString("en-CA", { timeZone: TIME_ZONE })
    .split("-")
    .map(Number);
  return { day: String(day), month: MONTHS[month - 1] };
}

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const MONTHS_LONG = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

// The Berlin calendar day of a moment, as midnight UTC, so days can be counted by subtraction.
function berlinDay(at: string | Date) {
  return new Date(new Date(at).toLocaleDateString("en-CA", { timeZone: TIME_ZONE }));
}

/** Day number, short and long month and short weekday of a date in Berlin, e.g. 19 · Nov · November · Do. */
export function dayParts(iso: string) {
  const day = berlinDay(iso);
  return {
    day: String(day.getUTCDate()),
    month: MONTHS[day.getUTCMonth()],
    monthLong: MONTHS_LONG[day.getUTCMonth()],
    weekday: WEEKDAYS[day.getUTCDay()],
  };
}

/**
 * A registration window that runs today: the days left until its last day and how far it has run (0–100).
 * `null` for anything else, including windows without an end.
 */
export function openRegistration(item: DateItem, now = new Date()) {
  if (item.kind !== "registration" || !item.endDate) return null;
  const today = berlinDay(now).getTime();
  const start = berlinDay(item.startDate).getTime();
  const end = berlinDay(item.endDate).getTime();
  if (today < start || today > end) return null;
  return {
    daysLeft: Math.round((end - today) / 86_400_000),
    percent: end === start ? 100 : Math.round(((today - start) / (end - start)) * 100),
  };
}

/** Splits dates into registration windows that run today (with days left and progress) and the rest, both in order. */
export function splitOpenRegistrations<T extends DateItem>(items: T[], now = new Date()) {
  const open = items.flatMap((item) => {
    const state = openRegistration(item, now);
    return state ? [{ item, ...state }] : [];
  });
  return { open, rest: items.filter((item) => !open.some((o) => o.item === item)) };
}

/** The day a calendar tile shows: a registration window's deadline, otherwise the (start) date. */
export function tileDate(item: Pick<DateItem, "kind" | "startDate" | "endDate">) {
  return item.kind === "registration" && item.endDate ? item.endDate : item.startDate;
}

/** Dates by month, e.g. „Dezember 2026“, keeping their order. */
export function groupByMonth<T extends Pick<DateItem, "startDate">>(items: T[]): [string, T[]][] {
  const months = new Map<string, T[]>();
  for (const item of items) {
    const label = new Date(item.startDate).toLocaleDateString("de-DE", { month: "long", year: "numeric", timeZone: TIME_ZONE });
    months.set(label, [...(months.get(label) ?? []), item]);
  }
  return [...months];
}
