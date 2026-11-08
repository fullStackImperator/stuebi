import { expect, test } from '@playwright/test'
import { STATIC_PATHS } from '../src/lib/site'

for (const path of STATIC_PATHS) {
  test(`${path} has canonical, og tags and a short description`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://stuebi-hamburg.de${path === '/' ? '' : path}`)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Stübi/)
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', /^https:\/\/stuebi-hamburg\.de\//)
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description!.length).toBeGreaterThan(40)
    expect(description!.length).toBeLessThanOrEqual(150)
    if (path !== '/') await expect(page).toHaveTitle(/ \| Stübi Hamburg$/)
  })
}

test('a news article is canonical under its slug and uses its excerpt', async ({ page }) => {
  await page.goto('/news/wir-sind-1-klasse')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://stuebi-hamburg.de/news/wir-sind-1-klasse')
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article')
})
