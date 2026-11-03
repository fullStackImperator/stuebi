import { expect, test } from '@playwright/test'

test('the Weg chart shows both branches, links each stage and marks every degree', async ({ page }) => {
  await page.goto('/bildungswege')
  const chart = page.locator('#stufen [data-weg-lanes]')
  for (const href of ['/vorschule', '/grundschule', '/mittelstufe', '/oberstufe', '/ganztag']) {
    expect(await chart.locator(`a[href="${href}"]`).count(), href).toBeGreaterThan(0)
  }
  await expect(chart.getByRole('link', { name: /Gymnasialzweig/ })).toBeVisible()
  await expect(chart.getByRole('link', { name: /Stadtteilschulzweig/ })).toBeVisible()
  for (const degree of ['ESA', 'MSA']) await expect(chart.getByText(degree, { exact: true })).toBeVisible()
  await expect(chart.getByText(/Abitur\s*nach 12 Jahren/)).toHaveCount(1)
  await expect(chart.getByText(/Abitur\s*nach 13 Jahren/)).toHaveCount(1)
})

test('the degrees climb like steps and the Abitur names both routes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'steps from sm up')
  await page.goto('/bildungswege')
  const heights = await page.locator('section#abschluesse [data-degree]').evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height))
  expect(heights[0]).toBeLessThan(heights[1])
  expect(heights[1]).toBeLessThan(heights[2])
  const abitur = page.locator('section#abschluesse [data-degree]').nth(2)
  await expect(abitur).toContainText('Gymnasialzweig')
  await expect(abitur).toContainText('Stadtteilschulzweig')
})

test('the two profiles are colour tiles with what students do there, followed by the link to the requirements', async ({ page }) => {
  await page.goto('/bildungswege')
  const profiles = page.locator('section#abschluesse [data-profile]')
  await expect(profiles).toHaveCount(2)
  for (let i = 0; i < 2; i++) expect(await profiles.nth(i).locator('li').count()).toBe(3)
  await expect(page.locator('section#abschluesse a[href="/oberstufe#voraussetzungen"]')).toContainText('Voraussetzungen')
})

test('the IVK section explains itself in four short points', async ({ page }) => {
  await page.goto('/bildungswege')
  await expect(page.locator('section#ivk [data-ivk-point]')).toHaveCount(4)
})

test('on phones the Weg chart fits the screen', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone layout only')
  await page.goto('/bildungswege')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width)
})
