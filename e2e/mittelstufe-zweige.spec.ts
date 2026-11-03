import { expect, test } from '@playwright/test'

// Mittelstufe aufgehübscht: zwei Bildungswege, Klassenzahlen, Listen statt Tag-Haufen, besondere Klassen.

test('Mittelstufe explains both branches after the Beobachtungsstufe', async ({ page }) => {
  await page.goto('/mittelstufe')
  const section = page.locator('section#zweige')
  await expect(section.locator('h2')).toHaveText('Zwei Bildungswege, eine Schule')
  const cards = section.locator('[data-zweig]')
  await expect(cards).toHaveCount(2)
  await expect(cards.nth(0)).toContainText('Gymnasialzweig')
  await expect(cards.nth(0)).toContainText('Abitur nach 12 Jahren')
  await expect(cards.nth(0)).toContainText('Campus-Tage')
  await expect(cards.nth(1)).toContainText('Stadtteilschulzweig')
  await expect(cards.nth(1)).toContainText('ESA, MSA oder Abitur nach 13 Jahren')
})

test('on large screens the route map splits after Klasse 6 and ends in both Abitur markers', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'map from md up')
  await page.goto('/mittelstufe')
  const map = page.locator('section#zweige [data-zweige-map]')
  await expect(map).toBeVisible()
  await expect(map).toContainText('Beobachtungsstufe')
  await expect(map.locator('[data-abitur]')).toHaveCount(2)
  await expect(map).toContainText('Wechsel möglich')
  await expect(page.locator('section#zweige [data-zweige-list]')).toBeHidden()
})

test('on phones the route is a fork: together, two branches with the switch between them, together again', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone layout only')
  await page.goto('/mittelstufe')
  await expect(page.locator('section#zweige [data-zweige-map]')).toBeHidden()
  const list = page.locator('section#zweige [data-zweige-list]')
  await expect(list).toContainText('Gemeinsam ankommen')
  await expect(list).toContainText('Wechsel möglich')
  await expect(list.locator('[data-abitur]')).toContainText('Gemeinsam zum Abitur')
  const branches = list.locator('[data-branch]')
  await expect(branches).toHaveCount(2)
  await expect(branches.nth(0)).toContainText('12')
  await expect(branches.nth(1)).toContainText('13')
  const gym = await branches.nth(0).boundingBox()
  const sts = await branches.nth(1).boundingBox()
  const badge = await list.locator('[data-wechsel]').boundingBox()
  // The badge sits on the gap between both branches.
  expect(badge!.x).toBeLessThan(gym!.x + gym!.width)
  expect(badge!.x + badge!.width).toBeGreaterThan(sts!.x)
  const box = await list.boundingBox()
  expect(sts!.x + sts!.width).toBeLessThanOrEqual(box!.x + box!.width)
})

test('the branches moved out of „Das erwartet Ihr Kind“', async ({ page }) => {
  await page.goto('/mittelstufe')
  const erwartet = page.locator('section#erwartet')
  await expect(erwartet).not.toContainText('Gymnasialzweig')
  await expect(erwartet).toContainText('Neigungen entdecken')
})

test('phases show the grades as a large number and the highlights as a check list', async ({ page }) => {
  await page.goto('/mittelstufe')
  for (const id of ['alltag', 'berufsorientierung']) {
    const tags = page.locator(`section#${id} [data-phase] [data-phase-tag]`)
    expect(await tags.count()).toBeGreaterThan(5)
    await expect(tags.first().locator('svg')).toHaveCount(1)
  }
  await expect(page.locator('section#alltag [data-phase]').first()).toContainText('5–6')
})

test('the special classes sit under a photo band, each with its key figures', async ({ page }) => {
  await page.goto('/mittelstufe')
  const tracks = page.locator('section#berufsorientierung [data-career-tracks]')
  await expect(tracks.locator('h3')).toHaveText('Zwei besondere Klassen im 10. Jahrgang')
  const tiles = tracks.locator('[data-career-track]')
  await expect(tiles).toHaveCount(2)
  await expect(tiles.nth(0).locator('[data-track-facts] li')).toHaveCount(2)
  await expect(tiles.nth(0)).toContainText('Blockpraktika')
  await expect(tiles.nth(1)).toContainText('täglich')
})
