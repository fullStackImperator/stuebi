import { expect, test } from '@playwright/test'

// „So ist die Oberstufe organisiert“: Wege-Balken, die zwei Profile groß, Fächer der Vorstufe und Begleitung.

test('the Oberstufe highlights both Studienstufe profiles right under the routes', async ({ page }) => {
  await page.goto('/oberstufe')
  const profiles = page.locator('section#alltag [data-oberstufe-profile] [data-profile]')
  await expect(profiles).toHaveCount(2)
  await expect(profiles.nth(0)).toContainText('Fair Play')
  await expect(profiles.nth(0)).toContainText('Sport, Gesundheit & Management')
  await expect(profiles.nth(1)).toContainText('Mein Start-Up')
  await expect(profiles.nth(1)).toContainText('Businesspläne')
})

test('Bildungswege and Oberstufe show the same profile texts', async ({ page }) => {
  await page.goto('/bildungswege')
  const there = await page.locator('section#abschluesse [data-profile]').allTextContents()
  await page.goto('/oberstufe')
  const here = await page.locator('section#alltag [data-profile]').allTextContents()
  expect(here).toEqual(there)
})

test('the Vorstufe subjects come in three tiers, the main subjects first', async ({ page }) => {
  await page.goto('/oberstufe')
  const tiers = page.locator('section#alltag [data-vorstufe-faecher] [data-subject-tier]')
  await expect(tiers).toHaveCount(3)
  await expect(tiers.nth(0).locator('li')).toHaveText(['Deutsch', 'Mathematik', 'Englisch'])
  await expect(tiers.nth(1)).toContainText('Informatik')
  await expect(tiers.nth(2)).toContainText('Darstellendes Spiel')
})

test('personal support names the three destinations', async ({ page }) => {
  await page.goto('/oberstufe')
  await expect(page.locator('section#alltag [data-begleitung] [data-destination]')).toHaveText([
    'Studium',
    'Duale Ausbildung',
    'Ausbildung im höheren Dienst',
  ])
})

test('„Das erwartet Ihr Kind“ leaves the profiles to the section below', async ({ page }) => {
  await page.goto('/oberstufe')
  const erwartet = page.locator('section#erwartet')
  await expect(erwartet).not.toContainText('Fair Play')
  await expect(erwartet).toContainText('Fächerbreite & Sprachen')
  await expect(erwartet).toContainText('Vertrautes Umfeld')
})
