import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { oldPageRedirects } from '../src/content/alte-seite-weiterleitungen'
import { normalizeOldPath, resolveOldPath } from '../src/lib/old-site-redirect'

const has = async (slug: string) => slug === 'wir-sind-1-klasse'

test('old pages, articles, tags and unknown addresses each find a new page', async () => {
  expect(await resolveOldPath('/stadtteilschule/kontakt/beratung/bob-team/', has)).toBe('/beratung')
  expect(await resolveOldPath('/stadtteilschule/Kontakt/Beratung/BOB-Team', has)).toBe('/beratung')
  expect(await resolveOldPath('/stadtteilschule/kontakt/beratung/bob-team/?fbclid=x', has)).toBe('/beratung')
  expect(await resolveOldPath('/stadtteilschule/kontakt/beratung/bob-team/#team', has)).toBe('/beratung')
  expect(await resolveOldPath('/stadtteilschule/2026/08/25/wir-sind-1-klasse/', has)).toBe('/news/wir-sind-1-klasse')
  expect(await resolveOldPath('/stadtteilschule/2018/06/24/stuebi-faehrt-fahrrad/', has)).toBe('/news')
  expect(await resolveOldPath('/stadtteilschule/category/ausflug/', has)).toBe('/news')
  expect(await resolveOldPath('/stadtteilschule/tag/sport/', has)).toBe('/news')
  expect(await resolveOldPath('/stadtteilschule/wir-sind-1-klasse/', has)).toBe('/news/wir-sind-1-klasse')
  expect(await resolveOldPath('/stadtteilschule/stuebi-faehrt-fahrrad/', has)).toBe('/')
  expect(await resolveOldPath('/stadtteilschule/wp-content/uploads/2020/01/flyer.pdf', has)).toBe('/')
  expect(await resolveOldPath('/stadtteilschule/', has)).toBe('/')
  expect(await resolveOldPath('/stadtteilschule', has)).toBe('/')
})

test('a draft article sends visitors to the news overview', async () => {
  expect(await resolveOldPath('/stadtteilschule/2026/08/25/wir-sind-1-klasse/', async () => false)).toBe('/news')
})

test('every old page from the sitemap is in the list', () => {
  const pages = readFileSync('e2e/fixtures/alte-seite-urls.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(normalizeOldPath)
    .filter((path) => !/^\d{4}\/\d{2}\/\d{2}\//.test(path) && !/^(tag|category)\//.test(path))
  expect(pages).toHaveLength(132)
  expect(pages.filter((path) => !(path in oldPageRedirects))).toEqual([])
})
