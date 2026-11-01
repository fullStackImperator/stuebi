import { expect, test } from '@playwright/test'
import { deadlineTile, registrationDeadlines } from '../src/lib/next-dates'
import type { Department } from '../src/payload-types'

const deps = [
  {
    slug: 'primarstufe',
    title: 'Primarstufe',
    grades: 'Vorschule bis Klasse 4',
    dates: {
      items: [
        { kind: 'registration', title: 'Anmeldung 1. Klasse', startDate: '2027-01-04T12:00:00Z', endDate: '2027-01-22T12:00:00Z' },
        { kind: 'info', title: 'Marktplatz', startDate: '2026-11-19T12:00:00Z' },
        { kind: 'registration', title: 'Anmeldung Vorschule', startDate: '2026-11-01T12:00:00Z', endDate: '2027-01-15T12:00:00Z' },
        { kind: 'registration', title: 'Alte Runde', startDate: '2026-01-04T12:00:00Z', endDate: '2026-01-22T12:00:00Z' },
      ],
    },
  },
  { slug: 'mittelstufe', title: 'Mittelstufe', grades: 'Klasse 5 bis 10', dates: { items: [] } },
] as unknown as Department[]

test('registrationDeadlines keeps every department, only open registration windows, earliest end first', () => {
  const now = new Date('2026-12-01T10:00:00Z')
  expect(registrationDeadlines(deps, now).map((d) => [d.slug, d.windows.map((w) => w.title)])).toEqual([
    ['primarstufe', ['Anmeldung Vorschule', 'Anmeldung 1. Klasse']],
    ['mittelstufe', []],
  ])
})

test('deadlineTile shows the end date, or the start date without an end', () => {
  expect(deadlineTile({ startDate: '2027-01-04T12:00:00Z', endDate: '2027-01-22T12:00:00Z' } as never)).toEqual({ day: '22', month: 'Jan' })
  expect(deadlineTile({ startDate: '2027-02-01T12:00:00Z' } as never)).toEqual({ day: '1', month: 'Feb' })
})
