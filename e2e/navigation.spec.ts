import { expect, test } from '@playwright/test'
import { openMenuSection } from './helpers'

test('Bildungswege menu links every Stufe page', async ({ page }) => {
  await page.goto('/')
  await openMenuSection(page, 'Bildungswege')
  for (const path of ['/vorschule', '/grundschule', '/mittelstufe', '/oberstufe'])
    await expect(page.locator(`a[href="${path}"]`).filter({ visible: true }).first()).toBeVisible()
  await expect(page.locator('a[href="/bildungswege#abschluesse"]').filter({ visible: true }).first()).toBeVisible()
})

test('Bildungswege overview keeps the old anchors', async ({ page }) => {
  await page.goto('/bildungswege#mittelstufe')
  for (const id of ['vorschule', 'grundschule', 'mittelstufe', 'oberstufe', 'ganztag', 'abschluesse'])
    await expect(page.locator(`#${id}`)).toBeVisible()
  await expect(page.locator('a#mittelstufe[href="/mittelstufe"]')).toBeVisible()
})

test('no link points to the old stage anchors', async ({ page }) => {
  for (const path of ['/', '/schwerpunkt', '/bildungswege']) {
    await page.goto(path)
    await expect(page.locator('a[href^="/bildungswege#"]:not([href="/bildungswege#abschluesse"])')).toHaveCount(0)
  }
})

test('Anmeldung has one section per department', async ({ page }) => {
  await page.goto('/anmeldung')
  for (const id of ['ablauf', 'primarstufe', 'mittelstufe', 'oberstufe', 'schulbuero', 'ansprechpartner'])
    await expect(page.locator(`section#${id}`)).toBeVisible()
  // ids must be unique on the page so menu anchors land on the right place
  expect(await page.locator('[id="anmeldung"], [id="termine"]').count()).toBe(0)
})

test('oberstufe section renders without dates', async ({ page }) => {
  await page.goto('/anmeldung#oberstufe')
  await expect(page.locator('section#oberstufe h2')).toContainText('Oberstufe')
  await expect(page.locator('section#oberstufe')).toContainText('Aktuell stehen keine Termine an')
})

test('Anmeldung menu lists departments, not "Abteilungen"', async ({ page }) => {
  await page.goto('/')
  await openMenuSection(page, 'Anmeldung & Kontakt')
  for (const hash of ['ablauf', 'primarstufe', 'mittelstufe', 'oberstufe', 'schulbuero', 'ansprechpartner'])
    await expect(page.locator(`a[href="/anmeldung#${hash}"]`).filter({ visible: true }).first()).toBeVisible()
  await expect(page.locator('a[href="/abteilungen"]')).toHaveCount(0)
})

test('Anmeldung shows a deadline row per Stufe and the steps in order', async ({ page }) => {
  await page.goto('/anmeldung#ablauf')
  const rows = page.locator('#ablauf [data-deadline-row]')
  await expect(rows).toHaveCount(3)
  await expect(rows.filter({ hasText: 'Primarstufe' }).locator('a[href="/anmeldung#primarstufe"]').first()).toBeVisible()
  await expect(rows.filter({ hasText: 'Oberstufe' })).toContainText('Termine folgen')
  // every registration window links to its Stufe section
  await expect(rows.filter({ hasText: 'Primarstufe' }).locator('a[data-deadline-window][href="/anmeldung#primarstufe"]').first()).toBeVisible()
  await expect(page.locator('#ablauf ol[data-step-list] > li')).toHaveCount(3)
})

test('Schulbüro offers tap-to-call, mail and a route link', async ({ page }) => {
  await page.goto('/anmeldung#schulbuero')
  const office = page.locator('section#schulbuero')
  await expect(office.locator('a[data-office-card][href="tel:+4940428761910"]')).toBeVisible()
  await expect(office.locator('a[data-office-card][href="tel:+494042896660"]')).toBeVisible()
  await expect(office.locator('a[data-office-card][href^="mailto:"]')).toBeVisible()
  const route = office.getByRole('link', { name: /Route planen/ })
  await expect(route).toHaveAttribute('target', '_blank')
  await expect(route).toHaveAttribute('href', /google\.com\/maps/)
})
