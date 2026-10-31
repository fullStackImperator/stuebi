import { expect, test } from '@playwright/test'

test('Schwerpunkt page has the three big sections, then Förderung and extras', async ({ page }) => {
  expect((await page.goto('/schwerpunkt'))?.status()).toBe(200)
  const ids = ['sport', 'makerspace', 'abgekocht', 'foerderung', 'mehr']
  for (const id of ids) await expect(page.locator(`section#${id}`)).toBeVisible()
  const tops = await Promise.all(ids.map(async (id) => (await page.locator(`section#${id}`).boundingBox())!.y))
  expect(tops).toEqual([...tops].sort((a, b) => a - b))
})

test('each section has a bento mosaic with facts', async ({ page }) => {
  await page.goto('/schwerpunkt')
  for (const id of ['sport', 'makerspace', 'abgekocht'])
    await expect(page.locator(`section#${id} [data-bento] [data-bento-cell="fact"]`).first()).toBeVisible()
  await expect(page.locator('section#sport [data-bento]')).toContainText('3 Std.')
})

test('title photo or brochure fallback fills the large tile', async ({ page }) => {
  await page.goto('/schwerpunkt')
  await expect(page.locator('section#makerspace [data-bento-cell="photo"] img').first()).toBeVisible()
  await expect(page.locator('section#makerspace [data-bento-cell="photo"] img').first()).toHaveAttribute('src', /makerspace-3d-drucker|api\/media/)
})

test('Makerspace links its website in a new tab', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const link = page.locator('section#makerspace a[href="https://stuebi-makerspace.de/"]')
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', /noopener/)
})

test('no horizontal scroll on the Schwerpunkt page', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})

test('an empty CMS gallery falls back to brochure photos', async ({ page }) => {
  await page.goto('/schwerpunkt')
  for (const id of ['sport', 'makerspace', 'abgekocht'])
    expect(await page.locator(`section#${id} [data-bento-cell="photo"]`).count(), id).toBeGreaterThanOrEqual(4)
})
