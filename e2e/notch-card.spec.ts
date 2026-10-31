import { expect, test } from '@playwright/test'

// Leitvision and Für Eltern share one card: photo with the title on it and the arrow in a notch.
for (const [section, count] of [
  ['section#eltern', 5],
  ['section#vision', 4],
] as const)
  test(`${section} uses notch cards with arrow and title on the photo`, async ({ page }) => {
    await page.goto('/')
    const cards = page.locator(`${section} a[data-notch-card]`)
    await expect(cards).toHaveCount(count)
    for (const card of await cards.all()) {
      await expect(card.locator('[data-notch-arrow]')).toBeVisible()
      const photo = await card.locator('[data-notch-photo]').boundingBox()
      const title = await card.locator('h3').boundingBox()
      expect(title!.y).toBeGreaterThan(photo!.y)
      expect(title!.y + title!.height).toBeLessThanOrEqual(photo!.y + photo!.height + 1)
    }
  })

test('/vision shows the pillar cards without arrows', async ({ page }) => {
  await page.goto('/vision')
  await expect(page.locator('section#vision [data-notch-card]')).toHaveCount(4)
  await expect(page.locator('section#vision [data-notch-arrow]')).toHaveCount(0)
  await expect(page.locator('section#vision a[data-notch-card]')).toHaveCount(0)
})
