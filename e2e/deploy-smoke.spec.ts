import { expect, test } from '@playwright/test'

// Smoke test for a deployed build (Docker image locally, the netcup server, later stuebi-hamburg.de).
// Runs only with BASE_URL set, e.g. BASE_URL=https://v2202611456465561877.ultrasrv.de npx playwright test e2e/deploy-smoke.spec.ts
test.skip(!process.env.BASE_URL, 'only against a deployed build (BASE_URL)')

test('home answers 200 with the school name', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('a news post renders', async ({ page }) => {
  await page.goto('/news')
  const first = page.locator('a[href^="/news/"]').first()
  await first.click()
  await expect(page).toHaveURL(/\/news\/.+/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('uploaded photos are served', async ({ page }) => {
  await page.goto('/')
  const photo = page.locator('img[src*="/api/media/file/"], img[src*="_next/image"]').first()
  await photo.scrollIntoViewIfNeeded()
  await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth)).toBeGreaterThan(0)
})

test('the CMS login loads', async ({ page }) => {
  await page.goto('/admin')
  await expect(page.locator('input[name="email"]')).toBeVisible({ timeout: 30_000 })
})

test('old addresses redirect', async ({ page }) => {
  await page.goto('/stadtteilschule/kontakt/beratung/bob-team/')
  await expect(page).toHaveURL(/\/beratung/)
})
