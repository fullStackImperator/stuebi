import { expect, test } from '@playwright/test'

// Uses the dates currently maintained in the CMS (Abteilungen → Termine).
test('Termine come from the CMS and sit in the section of their kind', async ({ page }) => {
  await page.goto('/termine')
  await expect(page.locator('section#anmeldezeitraeume [data-date-row]', { hasText: 'Anmeldung 1. Klasse' })).toBeVisible()
  await expect(page.locator('section#infoabende [data-date-row]', { hasText: 'Marktplatz der Grundschulen' })).toBeVisible()
  await expect(page.locator('section#veranstaltungen [data-date-row]', { hasText: 'Winterfest' })).toBeVisible()
  await expect(page.locator('section#anmeldezeitraeume a[href="/anmeldung"]')).toBeVisible()
})

test('every Termine section keeps its menu anchor', async ({ page }) => {
  await page.goto('/termine')
  for (const id of ['offene-tuer', 'anmeldezeitraeume', 'infoabende', 'veranstaltungen']) await expect(page.locator(`section#${id}`)).toBeVisible()
})

test('Termine rows show a calendar leaf with the day', async ({ page }) => {
  await page.goto('/termine')
  const row = page.locator('[data-date-row]', { hasText: 'Winterfest' })
  await expect(row.locator('[data-calendar-day]')).toHaveText('3')
})
