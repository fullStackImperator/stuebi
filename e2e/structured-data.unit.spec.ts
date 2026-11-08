import { expect, test } from '@playwright/test'
import { berlinIso, eventJsonLd, newsArticleJsonLd, parseTimeRange, schoolJsonLd } from '../src/lib/structured-data'
import type { DateItem } from '../src/lib/next-dates'

test('the school has its address and contact', () => {
  const school = schoolJsonLd() as { '@type': string; address: { postalCode: string; streetAddress: string }; telephone: string }
  expect(school['@type']).toBe('School')
  expect(school.address.postalCode).toBe('21109')
  expect(school.address.streetAddress).toBe('Stübenhofer Weg 20a')
  expect(school.telephone).toBe('+4940428761910')
})

test('a news article names headline, dates and its address', () => {
  const article = newsArticleJsonLd({ title: 'Wir sind 1. Klasse!', slug: 'wir-sind-1-klasse', publishedAt: '2026-08-25T08:00:00.000Z', updatedAt: '2026-08-26T08:00:00.000Z', excerpt: 'Willkommen', image: null })
  expect(article['@type']).toBe('NewsArticle')
  expect(article.headline).toBe('Wir sind 1. Klasse!')
  expect(article.datePublished).toBe('2026-08-25T08:00:00.000Z')
  expect(article.dateModified).toBe('2026-08-26T08:00:00.000Z')
  expect(article.mainEntityOfPage).toBe('https://stuebi-hamburg.de/news/wir-sind-1-klasse')
})

test('times from the CMS free text become ISO times in Hamburg time', () => {
  expect(parseTimeRange('15:00 – 17:00 Uhr')).toEqual({ start: '15:00', end: '17:00' })
  expect(parseTimeRange('ab 9.30 Uhr')).toEqual({ start: '09:30' })
  expect(parseTimeRange('ganztägig')).toBeNull()
  expect(parseTimeRange(null)).toBeNull()
  expect(berlinIso('2026-12-03', '15:00')).toBe('2026-12-03T15:00:00+01:00')
  expect(berlinIso('2027-06-10', '15:00')).toBe('2027-06-10T15:00:00+02:00')
  expect(berlinIso('2026-12-03')).toBe('2026-12-03')
})

test('a CMS date becomes an Event at its place, on its Hamburg calendar day', () => {
  // 23:00 UTC on 2 December is already 3 December in Hamburg.
  const item = { title: 'Winterfest', kind: 'event', startDate: '2026-12-02T23:00:00.000Z', time: '15:00 – 17:00 Uhr', location: 'Tor zur Welt' } as DateItem
  const event = eventJsonLd(item) as { name: string; startDate: string; endDate: string; location: { address: string }; organizer: { name: string } }
  expect(event.name).toBe('Winterfest')
  expect(event.startDate).toBe('2026-12-03T15:00:00+01:00')
  expect(event.endDate).toBe('2026-12-03T17:00:00+01:00')
  expect(event.location.address).toBe('Tor zur Welt, Hamburg')
  expect(event.organizer.name).toBe('Stadtteilschule Stübenhofer Weg')
  const allDay = eventJsonLd({ title: 'Projektwoche', kind: 'event', startDate: '2027-06-07T10:00:00.000Z', endDate: '2027-06-11T10:00:00.000Z', time: 'ganztägig' } as DateItem) as { startDate: string; endDate: string; location: { address: { streetAddress: string } } }
  expect(allDay.startDate).toBe('2027-06-07')
  expect(allDay.endDate).toBe('2027-06-11')
  expect(allDay.location.address.streetAddress).toBe('Stübenhofer Weg 20a')
})
