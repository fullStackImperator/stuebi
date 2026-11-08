import { expect, test } from '@playwright/test'

const jsonLd = async (page: import('@playwright/test').Page) =>
  Promise.all((await page.locator('script[type="application/ld+json"]').all()).map(async (s) => JSON.parse((await s.textContent()) ?? '{}')))

test('the start page describes the school', async ({ page }) => {
  await page.goto('/')
  const data = await jsonLd(page)
  expect(data).toHaveLength(1)
  expect(data[0]['@type']).toBe('School')
  expect(data[0].address.streetAddress).toBe('Stübenhofer Weg 20a')
})

test('a news article is marked up as NewsArticle', async ({ page }) => {
  await page.goto('/news/wir-sind-1-klasse')
  const article = (await jsonLd(page)).find((d) => d['@type'] === 'NewsArticle')
  expect(article.headline).toBe('Wir sind 1. Klasse!')
  expect(article.datePublished).toBeTruthy()
})

test('the preview image loads in 1200×630', async ({ page, request }) => {
  await page.goto('/vision')
  const url = await page.locator('meta[property="og:image"]').first().getAttribute('content')
  await expect(page.locator('meta[property="og:image:width"]').first()).toHaveAttribute('content', '1200')
  await expect(page.locator('meta[property="og:image:height"]').first()).toHaveAttribute('content', '630')
  const res = await request.get(new URL(url!).pathname)
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toMatch(/^image\//)
})
