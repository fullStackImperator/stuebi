import { expect, test } from '@playwright/test'

test('Sport is called "Sportbetonte Schule" with its award in the band, and the menu says so too', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const sport = page.locator('section#sport')
  await expect(sport.locator('h2')).toHaveText('Sportbetonte Schule')
  await expect(sport.locator('[data-badge]')).toContainText('2017/18')
  await expect(page.locator('footer a[href="/schwerpunkt#sport"]')).toHaveText('Sportbetonte Schule')
})

test('each Schwerpunkt groups its details under headings', async ({ page }) => {
  await page.goto('/schwerpunkt')
  for (const [id, groups] of [['sport', 3], ['makerspace', 2], ['abgekocht', 2]] as const) {
    await expect(page.locator(`section#${id} [data-point-group]`), id).toHaveCount(groups)
  }
  await expect(page.locator('section#sport [data-point-group] h3')).toHaveText(['Training und Coaches', 'Im Schulalltag', 'Wettkämpfe'])
})

test('Individuelle Förderung explains itself in four points and links the stage pages', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const f = page.locator('section#foerderung')
  await expect(f.locator('[data-foerder-point]')).toHaveCount(4)
  for (const stage of ['vorschule', 'grundschule', 'mittelstufe', 'oberstufe']) {
    await expect(f.locator(`a[href="/${stage}#foerderung"]`)).toBeVisible()
  }
})

test('"Noch mehr" links the four extras and shows the two profiles as colour tiles', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const mehr = page.locator('section#mehr')
  await expect(mehr.locator('[data-extra] a')).toHaveCount(4)
  await expect(mehr.locator('[data-profile]')).toHaveCount(2)
  await expect(mehr.locator('[data-info-card]')).toHaveCount(0)
})
