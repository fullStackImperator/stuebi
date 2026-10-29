import { expect, test } from '@playwright/test'

// Requires e2e/fixtures/seed-page-images.ts on the test database: startseite.band1,
// bildungswege.vorschule and schwerpunkt.sport are filled; every other slot is empty.

test('filled band renders full width with caption and focal point', async ({ page }) => {
  await page.goto('/')
  const band = page.locator('[data-photo-band]')
  await expect(band).toHaveCount(1)
  await expect(band).toContainText('Testunterschrift')
  const img = band.locator('img')
  await expect(img).toHaveAttribute('alt', 'Testfoto Schulhof')
  expect(await img.evaluate((el) => getComputedStyle(el).objectPosition)).toBe('30% 20%')
  await img.scrollIntoViewIfNeeded()
  await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0)
  const box = (await band.boundingBox())!
  expect(box.width).toBe(page.viewportSize()!.width)
})

test('filled Stufe photo replaces the brochure photo on the stage page', async ({ page }) => {
  await page.goto('/vorschule')
  const img = page.locator('#erwartet [data-stage-photo] img')
  await expect(img).toBeVisible()
  await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0)
  await expect(img).not.toHaveAttribute('src', /fotos/)
  // Empty slot: the brochure photo stands in.
  await page.goto('/grundschule')
  await expect(page.locator('#erwartet [data-stage-photo] img')).toHaveAttribute('src', /grundschule-spiel/)
})

test('Schwerpunkt card shows its photo, empty slots fall back to brochure photos', async ({ page }) => {
  await page.goto('/schwerpunkt')
  await expect(page.locator('#sport [data-stage-photo] img')).toBeVisible()
  await expect(page.locator('#makerspace [data-stage-photo] img')).toHaveAttribute('src', /makerspace-3d-drucker/)
})

test('empty band slots render nothing', async ({ page }) => {
  for (const path of ['/vision', '/anmeldung']) {
    await page.goto(path)
    await expect(page.locator('[data-photo-band]')).toHaveCount(0)
  }
  await expect(page.locator('img[src=""]')).toHaveCount(0)
})

test('page images global is readable', async ({ request }) => {
  expect((await request.get('/api/globals/page-images')).status()).toBe(200)
})

test('hero falls back to the default photo', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('img[src*="hero-school"]').first()).toBeVisible()
})
