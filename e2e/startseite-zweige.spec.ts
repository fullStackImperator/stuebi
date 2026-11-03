import { expect, test } from '@playwright/test'

test('the start page shows both routes to the Abitur, between the parents intro and the stage tiles', async ({ page }) => {
  await page.goto('/')
  const eltern = page.locator('section#eltern')
  const teaser = eltern.locator('[data-zweige-teaser]')
  const branches = teaser.locator('[data-zweig-teaser]')
  await expect(branches).toHaveCount(2)
  await expect(branches.nth(0)).toContainText('Gymnasialzweig')
  await expect(branches.nth(0).locator('[data-years]')).toHaveText('12')
  await expect(branches.nth(1)).toContainText('Stadtteilschulzweig')
  await expect(branches.nth(1).locator('[data-years]')).toHaveText('13')
  await expect(branches.nth(1)).toContainText('ESA, MSA oder Abitur')
  await expect(teaser).toContainText('ohne die Schule zu verlassen')
  await expect(teaser.locator('a[href="/mittelstufe#zweige"]')).toBeVisible()
  // Above the stage tiles.
  const teaserBox = (await teaser.boundingBox())!
  const firstTile = (await eltern.locator('[data-notch-card]').first().boundingBox())!
  expect(teaserBox.y + teaserBox.height).toBeLessThan(firstTile.y)
})
