import { expect, test } from '@playwright/test'
import { parseCalendar } from '../src/lib/iserv-calendar'

// Shape of the public IServ feed: Europe/Berlin VTIMEZONE, timed and all-day events, folded lines.
const ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//IServ.eu//NONSGML Calendar v3//EN
BEGIN:VTIMEZONE
TZID:Europe/Berlin
BEGIN:DAYLIGHT
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
DTSTART:19810329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
DTSTART:19961027T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
UID:fest@iserv
DTSTART;TZID=Europe/Berlin:20261203T150000
DTEND;TZID=Europe/Berlin:20261203T180000
SUMMARY:Tag der offenen Tür - Winterfest
LOCATION:Hauptgebäude
END:VEVENT
BEGIN:VEVENT
UID:eltern@iserv
DTSTART;VALUE=DATE:20261209
DTEND;VALUE=DATE:20261210
SUMMARY:Elternabend Jg 8 18:00 Foyer
END:VEVENT
BEGIN:VEVENT
UID:reise@iserv
DTSTART;VALUE=DATE:20261214
DTEND;VALUE=DATE:20261217
SUMMARY:Klassenreise 6b
END:VEVENT
BEGIN:VEVENT
UID:alt@iserv
DTSTART;VALUE=DATE:20251208
DTEND;VALUE=DATE:20251209
SUMMARY:LEG 4a
END:VEVENT
BEGIN:VEVENT
UID:rat@iserv
DTSTART;TZID=Europe/Berlin:20261102T170000
DTEND;TZID=Europe/Berlin:20261102T183000
RRULE:FREQ=MONTHLY;COUNT=3
SUMMARY:Elternrat
END:VEVENT
END:VCALENDAR`

const now = new Date('2026-11-15T10:00:00Z')

test('parseCalendar keeps upcoming entries in date order, with time and place', () => {
  const items = parseCalendar(ICS, now)
  // The monthly Elternrat (2.11., 2.12., 2.1.): November is past, December and January follow.
  expect(items.map((d) => d.title)).toEqual([
    'Elternrat',
    'Tag der offenen Tür - Winterfest',
    'Elternabend Jg 8 18:00 Foyer',
    'Klassenreise 6b',
    'Elternrat',
  ])
  const fest = items.find((d) => d.title.startsWith('Tag der offenen Tür'))!
  expect(fest.time).toBe('15:00 – 18:00 Uhr')
  expect(fest.location).toBe('Hauptgebäude')
  // 15:00 in Berlin (winter time) is 14:00 UTC.
  expect(fest.startDate).toBe('2026-12-03T14:00:00.000Z')
})

test('parseCalendar treats all-day entries as days, without a time', () => {
  const items = parseCalendar(ICS, now)
  const abend = items.find((d) => d.title.startsWith('Elternabend'))!
  expect(abend.time).toBeFalsy()
  expect(abend.endDate).toBeFalsy()
  // DTEND of an all-day entry is exclusive: 14.–16.12., not 17.12.
  const reise = items.find((d) => d.title === 'Klassenreise 6b')!
  expect(new Date(reise.endDate!).toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' })).toBe('16.12.2026')
})

test('parseCalendar returns nothing for a broken feed instead of throwing', () => {
  expect(parseCalendar('<html>Wartung</html>', now)).toEqual([])
})
