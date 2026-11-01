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

test('datesByKind groups upcoming dates and pulls out the Tag der offenen Tür', async () => {
  const { datesByKind } = await import('../src/lib/next-dates')
  const now = new Date('2026-11-01T10:00:00Z')
  const deps = [
    {
      title: 'Primarstufe',
      dates: {
        items: [
          { title: 'Anmeldung 1. Klasse', kind: 'registration', startDate: '2027-01-04T12:00:00Z', endDate: '2027-01-22T12:00:00Z' },
          { title: 'Marktplatz der Grundschulen', kind: 'info', startDate: '2026-11-19T12:00:00Z' },
          { title: 'Winterfest', kind: 'event', startDate: '2026-12-03T12:00:00Z' },
          { title: 'Altes Fest', kind: 'event', startDate: '2026-09-01T12:00:00Z' },
        ],
      },
    },
    { title: 'Mittelstufe', dates: { items: [{ title: 'Tag der offenen Tür', kind: 'info', startDate: '2027-01-16T10:00:00Z' }] } },
  ] as unknown as Department[]
  const g = datesByKind(deps, now)
  expect(g.openDay.map((d) => d.title)).toEqual(['Tag der offenen Tür'])
  expect(g.registration.map((d) => d.title)).toEqual(['Anmeldung 1. Klasse'])
  expect(g.info.map((d) => d.title)).toEqual(['Marktplatz der Grundschulen'])
  expect(g.event.map((d) => [d.title, d.department])).toEqual([['Winterfest', 'Primarstufe']])
})
