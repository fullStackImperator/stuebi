import { expect, test } from '@playwright/test'
import { openMenuSection } from './helpers'

test('Bildungswege menu lists every Stufe', async ({ page }) => {
  await page.goto('/')
  await openMenuSection(page, 'Bildungswege')
  for (const hash of ['vorschule', 'grundschule', 'mittelstufe', 'oberstufe', 'abschluesse'])
    await expect(page.locator(`a[href="/bildungswege#${hash}"]`).filter({ visible: true }).first()).toBeVisible()
  await expect(page.locator('a[href="/bildungswege#stufen"]')).toHaveCount(0)
})

test('Bildungswege has one section per Stufe', async ({ page }) => {
  await page.goto('/bildungswege')
  for (const id of ['vorschule', 'grundschule', 'mittelstufe', 'oberstufe', 'abschluesse'])
    await expect(page.locator(`section#${id}`)).toBeVisible()
  await expect(page.locator('#vorschule a[href="/anmeldung#primarstufe"]')).toBeVisible()
  await expect(page.locator('#oberstufe a[href="/anmeldung#oberstufe"]')).toBeVisible()
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
