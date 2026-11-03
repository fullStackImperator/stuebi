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

test('Unser Campus is a bento of campus photos with the building as third educator and the facts', async ({ page }) => {
  await page.goto('/vision')
  const raum = page.locator('section#raum')
  await expect(raum).toContainText('dritter Pädagoge')
  expect(await raum.locator('[data-bento-cell="photo"]').count()).toBeGreaterThanOrEqual(5)
  await expect(raum.locator('[data-bento-cell="fact"]')).toHaveCount(4)
})

test('Vision lists the four values from the brochure, without placeholder', async ({ page }) => {
  await page.goto('/vision')
  const werte = page.locator('section#werte')
  // "Kein Kind muss gehen" as the large band, the other three as cards.
  await expect(werte.locator('[data-wert-hero]')).toContainText('Kein Kind muss gehen')
  await expect(werte.locator('[data-info-card]')).toHaveCount(3)
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

test('the campus facts are colour tiles on grid paper, each with a line icon', async ({ page }) => {
  await page.goto('/vision')
  const facts = page.locator('section#raum [data-bento-cell="fact"]')
  for (let i = 0; i < 4; i++) {
    await expect(facts.nth(i)).toHaveClass(/deco-tile/)
    await expect(facts.nth(i).locator('svg[aria-hidden="true"]')).toHaveCount(1)
  }
})

test('the menu links to Unser Campus', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop menu')
  await page.goto('/')
  await page.getByRole('button', { name: 'Unsere Vision' }).hover()
  await expect(page.getByRole('link', { name: /Unser Campus/ })).toHaveAttribute('href', '/vision#raum')
})

test('Vision shows the four pillars as rows, each with a photo and an example', async ({ page }) => {
  await page.goto('/vision')
  const rows = page.locator('#saeulen [data-saeule]')
  await expect(rows).toHaveCount(4)
  for (let i = 0; i < 4; i++) {
    await expect(rows.nth(i).locator('img')).toHaveCount(1)
    await expect(rows.nth(i)).toContainText('Zum Beispiel')
  }
  // The guiding idea appears once on the page, in the Kompass.
  await expect(page.getByText('Chancen schaffen – Schülerinnen und Schüler stärken!')).toHaveCount(1)
})

test('the start page keeps the pillar cards', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('section#vision [data-notch-card]')).toHaveCount(4)
})

test('the pillars are numbered "1. Säule" to "4. Säule", read out with the title', async ({ page }) => {
  await page.goto('/vision')
  const rows = page.locator('#saeulen [data-saeule]')
  for (let i = 0; i < 4; i++) {
    await expect(rows.nth(i).locator('h3')).toContainText(`${i + 1}. Säule:`)
    await expect(rows.nth(i).locator('div[aria-hidden="true"]').first()).toHaveText(`${i + 1}.Säule`)
  }
})
