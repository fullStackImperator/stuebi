import { expect, test } from '@playwright/test'

test('Vision shows the Kompass: guiding idea, goal in the middle and four directions', async ({ page }) => {
  await page.goto('/vision')
  const kompass = page.locator('section#kompass')
  await expect(kompass.locator('[data-leitgedanke]')).toContainText('Chancen schaffen')
  await expect(kompass.locator('[data-kompass-ziel]')).toContainText('personalisiertes und zukunftsorientiertes Bildungsangebot')
  const directions = kompass.locator('[data-kompass-richtung]')
  await expect(directions).toHaveCount(4)
  for (const title of ['Lernwege mitgestalten', 'Persönlichkeit entwickeln', 'Aktive Lernkultur', 'Demokratisch miteinander']) {
    await expect(directions.filter({ hasText: title })).toHaveCount(1)
  }
  await expect(kompass).toContainText('daran gemessen')
})

test('Vision shows the school in numbers and the building as third educator', async ({ page }) => {
  await page.goto('/vision')
  await expect(page.locator('[data-vision-fact]')).toHaveCount(4)
  const raum = page.locator('[data-vision-raum]')
  await expect(raum).toContainText('dritter Pädagoge')
  await expect(raum.locator('img')).toHaveCount(1)
})

test('Vision lists the four values from the brochure, without placeholder', async ({ page }) => {
  await page.goto('/vision')
  const werte = page.locator('section#werte')
  await expect(werte.locator('[data-info-card]')).toHaveCount(4)
  await expect(werte).toContainText('Kein Kind muss gehen')
  await expect(werte).not.toContainText('in den Worten der Schulgemeinschaft')
})

test('on phones the Kompass directions stack below the goal', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone layout only')
  await page.goto('/vision')
  const goal = await page.locator('[data-kompass-ziel]').boundingBox()
  const first = await page.locator('[data-kompass-richtung]').first().boundingBox()
  expect(first!.y).toBeGreaterThan(goal!.y + goal!.height - 1)
})

test('the Kompass has a decorative compass rose and ends with the didactic lead next to the test sentence', async ({ page }) => {
  await page.goto('/vision')
  const kompass = page.locator('section#kompass')
  await expect(kompass.locator('[data-kompass-rose]').first()).toHaveAttribute('aria-hidden', 'true')
  const panel = kompass.locator('[data-kompass-pruefstein]')
  await expect(panel).toContainText('daran gemessen')
  await expect(panel.locator('[data-contact-person]')).toContainText('Phoebe Lorenz')
})

test('the facts are colour tiles on grid paper, each with a line icon', async ({ page }) => {
  await page.goto('/vision')
  const facts = page.locator('[data-vision-fact]')
  for (let i = 0; i < 4; i++) {
    await expect(facts.nth(i)).toHaveClass(/deco-tile/)
    await expect(facts.nth(i).locator('svg[aria-hidden="true"]')).toHaveCount(1)
  }
})
