import { expect, test } from '@playwright/test'

test('Ganztag Schulbibliothek shows more photos of the library', async ({ page }) => {
  await page.goto('/ganztag')
  const bib = page.locator('section#bibliothek')
  await expect(bib.locator('[data-block-gallery] img')).toHaveCount(3)
})
