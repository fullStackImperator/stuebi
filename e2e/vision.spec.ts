import { expect, test } from '@playwright/test'

test('Vision shows our principles: guiding idea and four principles, no compass', async ({ page }) => {
  await page.goto('/vision')
  const section = page.locator('section#prinzipien')
  await expect(section.locator('[data-leitgedanke]')).toContainText('Chancen schaffen')
  const items = section.locator('[data-prinzip]')
  await expect(items).toHaveCount(4)
  for (const title of ['Lernwege mitgestalten', 'Persönlichkeit entwickeln', 'Aktive Lernkultur', 'Demokratisch miteinander']) {
    await expect(items.filter({ hasText: title })).toHaveCount(1)
  }
  await expect(page.locator('[data-kompass-rose], [data-kompass-ziel]')).toHaveCount(0)
})

test('the principles end with Phoebe Lorenz and her sentence, phone and mail', async ({ page }) => {
  await page.goto('/vision')
  const panel = page.locator('section#prinzipien [data-didaktik]')
  await expect(panel).toContainText('Bildung bedeutet, Möglichkeiten zu schaffen, nicht Grenzen zu setzen.')
  await expect(panel.locator('[data-contact-person]')).toContainText('Phoebe Lorenz')
  await expect(panel.locator('a[href="tel:+4940428761916"]')).toBeVisible()
  await expect(panel.locator('a[href="mailto:phoebe.lorenz@stuebenhofer-weg.de"]')).toBeVisible()
  await expect(page.locator('section#prinzipien')).not.toContainText('daran gemessen')
})

test('old links to /vision#kompass still find the section', async ({ page }) => {
  await page.goto('/vision#kompass')
  await expect(page.locator('section#prinzipien #kompass')).toHaveCount(1)
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
  // The guiding idea appears once on the page, in the principles.
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
