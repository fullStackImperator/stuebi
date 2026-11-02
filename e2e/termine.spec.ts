import { expect, test } from '@playwright/test'

// Uses the dates currently maintained in the CMS (Abteilungen → Termine).
test('Termine come from the CMS and sit in the section of their kind', async ({ page }) => {
  await page.goto('/termine')
  await expect(page.locator('section#anmeldezeitraeume [data-date-row]', { hasText: 'Anmeldung 1. Klasse' })).toBeVisible()
  await expect(page.locator('section#infoabende [data-date-row]', { hasText: 'Marktplatz der Grundschulen' })).toBeVisible()
  // The Winterfest is the Tag der offenen Tür, entered for Primar- and Mittelstufe and listed once.
  const fest = page.locator('section#offene-tuer [data-date-row]', { hasText: 'Tag der offenen Tür – Winterfest' })
  await expect(fest).toHaveCount(1)
  await expect(fest).toContainText('Primarstufe & Mittelstufe')
  await expect(page.locator('section#anmeldezeitraeume a[href="/anmeldung"]')).toBeVisible()
})

test('every Termine section keeps its menu anchor', async ({ page }) => {
  await page.goto('/termine')
  for (const id of ['offene-tuer', 'anmeldezeitraeume', 'infoabende', 'veranstaltungen']) await expect(page.locator(`section#${id}`)).toBeVisible()
})

test('Termine rows show a calendar leaf with the day', async ({ page }) => {
  await page.goto('/termine')
  const row = page.locator('section#offene-tuer [data-date-row]', { hasText: 'Winterfest' })
  await expect(row.locator('[data-calendar-day]')).toHaveText('3')
})

test('Termine shows every upcoming entry of the public IServ calendar', async ({ page }) => {
  await page.goto('/termine')
  const kalender = page.locator('section#schulkalender')
  await expect(kalender).toBeVisible()
  // The Winterfest (3.12.2026) is in IServ, so the school calendar lists it with its IServ time.
  const fest = kalender.locator('[data-date-row]', { hasText: 'Winterfest' })
  await expect(fest).toBeVisible()
  await expect(fest).toContainText('15:00 – 18:00 Uhr')
})
