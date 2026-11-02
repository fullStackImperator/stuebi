import { expect, test } from '@playwright/test'
import { parseIcs, withoutDuplicates } from '../src/lib/iserv-calendar'
import { datesByKind, nextDates } from '../src/lib/next-dates'
import type { Department } from '../src/payload-types'

// Shaped like an IServ public calendar export: Berlin TZID times, all-day events, folded lines.
const ICS = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//IServ//Calendar//DE',
  'BEGIN:VEVENT',
  'UID:abc-1',
  'SUMMARY:Laternenumzug',
  'DTSTART;TZID=Europe/Berlin:20261112T170000',
  'DTEND;TZID=Europe/Berlin:20261112T183000',
  'LOCATION:Schulhof\\, Stübenhofer Weg',
  'DESCRIPTION:Bitte Laternen mitbringen.\\nAlle sind willkommen.',
  'BEGIN:VALARM',
  'TRIGGER:-PT15M',
  'DESCRIPTION:Erinnerung',
  'END:VALARM',
  'END:VEVENT',
  'BEGIN:VEVENT',
  'UID:abc-2',
  'SUMMARY:Herbstferien mit sehr langem Titel, der umgebro',
  ' chen wurde',
  'DTSTART;VALUE=DATE:20261012',
  'DTEND;VALUE=DATE:20261024',
  'END:VEVENT',
  'BEGIN:VEVENT',
  'UID:abc-3',
  'SUMMARY:Schulfest',
  'DTSTART;VALUE=DATE:20261203',
  'DTEND;VALUE=DATE:20261204',
  'END:VEVENT',
  'BEGIN:VEVENT',
  'UID:abc-4',
  'SUMMARY:Elternabend Jahrgang 5',
  'DTSTART:20261119T173000Z',
  'END:VEVENT',
  'BEGIN:VEVENT',
  'UID:abc-5',
  'SUMMARY:Abgesagt',
  'STATUS:CANCELLED',
  'DTSTART;VALUE=DATE:20261120',
  'END:VEVENT',
  'BEGIN:VEVENT',
  'UID:abc-6',
  'SUMMARY:Schülerrat',
  'DTSTART;TZID=Europe/Berlin:20261104T080000',
  'RRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=3',
  'EXDATE;TZID=Europe/Berlin:20261118T080000',
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n')

const now = new Date('2026-11-02T10:00:00Z')
const day = (iso: string) => new Date(iso).toISOString().slice(0, 10)

test('parseIcs reads timed, all-day, multi-day and UTC events', () => {
  const dates = parseIcs(ICS, now)
  const byTitle = Object.fromEntries(dates.map((d) => [d.title, d]))

  expect(byTitle['Laternenumzug']).toMatchObject({
    kind: 'event',
    time: '17:00–18:30 Uhr',
    location: 'Schulhof, Stübenhofer Weg',
    note: 'Bitte Laternen mitbringen.\nAlle sind willkommen.',
    endDate: null,
    department: 'Ganze Schule',
  })
  expect(day(byTitle['Laternenumzug'].startDate)).toBe('2026-11-12')

  const ferien = byTitle['Herbstferien mit sehr langem Titel, der umgebrochen wurde']
  expect(day(ferien.startDate)).toBe('2026-10-12')
  expect(day(ferien.endDate!)).toBe('2026-10-23') // DTEND of all-day events is exclusive

  expect(byTitle['Schulfest'].endDate).toBeNull()
  expect(byTitle['Schulfest'].time).toBeNull()

  // 17:30 UTC is 18:30 in Berlin (winter time); "Elternabend" counts as an info event
  expect(byTitle['Elternabend Jahrgang 5']).toMatchObject({ kind: 'info', time: '18:30 Uhr' })

  expect(byTitle['Abgesagt']).toBeUndefined()
})

test('parseIcs expands simple recurring events and skips EXDATEs', () => {
  const rat = parseIcs(ICS, now).filter((d) => d.title === 'Schülerrat')
  expect(rat.map((d) => day(d.startDate))).toEqual(['2026-11-04', '2026-12-02'])
  expect(new Set(rat.map((d) => d.id)).size).toBe(2)
})

test('IServ dates join the CMS dates; past ones drop and duplicates of CMS dates are hidden', () => {
  const deps = [
    { title: 'Primarstufe', dates: { items: [{ title: 'Schulfest', kind: 'event', startDate: '2026-12-03T12:00:00Z' }] } },
  ] as unknown as Department[]
  const iserv = parseIcs(ICS, now)

  const titles = nextDates(deps, Infinity, now, iserv).map((d) => `${d.title} (${d.department})`)
  expect(titles).toEqual([
    'Schülerrat (Ganze Schule)',
    'Laternenumzug (Ganze Schule)',
    'Elternabend Jahrgang 5 (Ganze Schule)',
    'Schülerrat (Ganze Schule)',
    'Schulfest (Primarstufe)',
  ])

  const byKind = datesByKind(deps, now, iserv)
  expect(byKind.info.map((d) => d.title)).toEqual(['Elternabend Jahrgang 5'])
  expect(withoutDuplicates(nextDates(deps, Infinity, now), iserv).some((d) => d.title === 'Schulfest')).toBe(false)
})
