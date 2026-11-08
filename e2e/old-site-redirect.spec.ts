import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

const urls = readFileSync('e2e/fixtures/alte-seite-urls.txt', 'utf8').split('\n').filter(Boolean)

test.describe('addresses of the old site', () => {
  test.describe.configure({ mode: 'parallel' })
  test.skip(() => test.info().project.name === 'phone', 'plain HTTP check, once is enough')

  test('the fixture holds all 287 old addresses', () => {
    expect(urls).toHaveLength(287)
  })

  // Four chunks, so the run stays short.
  for (let chunk = 0; chunk < 4; chunk++) {
    test(`old addresses part ${chunk + 1} redirect permanently to a page that loads`, async ({ request }) => {
      for (const url of urls.filter((_, i) => i % 4 === chunk)) {
        // Next first drops the trailing slash with a 308; both hops are permanent.
        const first = await request.get(url, { maxRedirects: 0 })
        expect(first.status(), url).toBe(308)
        const final = await request.get(url)
        expect(final.status(), url).toBe(200)
      }
    })
  }

  test('samples land on the right page', async ({ request }) => {
    const location = async (url: string) => (await request.get(url, { maxRedirects: 0 })).headers()['location']
    expect(await location('/stadtteilschule/kontakt/beratung/bob-team')).toBe('/beratung')
    expect(await location('/stadtteilschule/2026/08/25/wir-sind-1-klasse')).toBe('/news/wir-sind-1-klasse')
    expect(await location('/stadtteilschule/2018/06/24/stuebi-faehrt-fahrrad')).toBe('/news')
    expect(await location('/stadtteilschule/tag/sport')).toBe('/news')
    expect(await location('/stadtteilschule/gibt-es-nicht')).toBe('/')
    expect(await location('/stadtteilschule/KONTAKT/Beratung/BOB-Team')).toBe('/beratung')
    expect(await location('/stadtteilschule/schulleben/ganztaegiges-lernen/mittagsessen')).toBe('/ganztag#mensa')
  })
})
