import { expect, test } from '@playwright/test'
import { nextDates } from '../src/lib/next-dates'
import type { Department } from '../src/payload-types'

test('nextDates merges departments, drops past dates, sorts and limits', () => {
  const now = new Date('2026-11-01T10:00:00Z')
  const deps = [
    { title: 'Primarstufe', dates: { items: [{ title: 'Winterfest', startDate: '2026-12-03T12:00:00Z' }, { title: 'Alt', startDate: '2026-10-01T12:00:00Z' }] } },
    { title: 'Mittelstufe', dates: { items: [{ title: 'Infoabend', startDate: '2026-11-19T12:00:00Z' }] } },
    { title: 'Oberstufe', dates: { items: [] } },
  ] as unknown as Department[]
  expect(nextDates(deps, 3, now).map((d) => [d.title, d.department])).toEqual([
    ['Infoabend', 'Mittelstufe'],
    ['Winterfest', 'Primarstufe'],
  ])
  expect(nextDates(deps, 1, now)).toHaveLength(1)
})

test('nextDates keeps a running registration period', () => {
  const now = new Date('2026-12-01T10:00:00Z')
  const deps = [{ title: 'Primarstufe', dates: { items: [{ title: 'Anmeldung Vorschule', startDate: '2026-11-01T12:00:00Z', endDate: '2027-01-22T12:00:00Z' }] } }] as unknown as Department[]
  expect(nextDates(deps, 3, now).map((d) => d.title)).toEqual(['Anmeldung Vorschule'])
})
