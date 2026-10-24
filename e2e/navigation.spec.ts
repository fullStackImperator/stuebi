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
