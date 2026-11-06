import { expect, test } from '@playwright/test'
import { dayParts, openRegistration, type DateItem } from '../src/lib/next-dates'

const vorschule = {
  kind: 'registration',
  title: 'Anmeldung Vorschule',
  startDate: '2026-11-01T12:00:00Z',
  endDate: '2027-01-22T12:00:00Z',
} as DateItem

test('a registration window is open from its first to its last day (Berlin time)', () => {
  expect(openRegistration(vorschule, new Date('2026-10-31T23:30:00Z'))).not.toBeNull() // 1 Nov, 00:30 in Berlin
  expect(openRegistration(vorschule, new Date('2026-10-31T12:00:00Z'))).toBeNull()
  expect(openRegistration(vorschule, new Date('2027-01-22T20:00:00Z'))).not.toBeNull()
  expect(openRegistration(vorschule, new Date('2027-01-22T23:30:00Z'))).toBeNull() // 23 Jan in Berlin
})

test('only registration windows with an end can be open', () => {
  const now = new Date('2026-11-06T10:00:00Z')
  expect(openRegistration({ ...vorschule, kind: 'info' }, now)).toBeNull()
  expect(openRegistration({ ...vorschule, endDate: null }, now)).toBeNull()
})

test('an open window tells the days left and how far it has run', () => {
  expect(openRegistration(vorschule, new Date('2026-11-06T10:00:00Z'))).toEqual({ daysLeft: 77, percent: 6 })
  expect(openRegistration(vorschule, new Date('2027-01-22T10:00:00Z'))).toEqual({ daysLeft: 0, percent: 100 })
})

test('dayParts gives day, month and weekday in Berlin', () => {
  expect(dayParts('2026-11-19T12:00:00Z')).toEqual({ day: '19', month: 'Nov', monthLong: 'November', weekday: 'Do' })
  // 23:30 UTC on 2 Dec is already 3 Dec in Berlin.
  expect(dayParts('2026-12-02T23:30:00Z')).toMatchObject({ day: '3', month: 'Dez', weekday: 'Do' })
})
