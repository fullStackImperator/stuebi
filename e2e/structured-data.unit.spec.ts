import { expect, test } from '@playwright/test'
import { newsArticleJsonLd, schoolJsonLd } from '../src/lib/structured-data'

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
