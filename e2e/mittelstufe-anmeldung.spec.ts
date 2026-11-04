import { expect, test } from '@playwright/test'

// Uses the Mittelstufe department in the CMS, filled by scripts/mittelstufe-anmeldung.ts (Mail von Frau Sabadija, 3.11.2026).
test('Mittelstufe shows how to register for Klasse 5 and 7', async ({ page }) => {
  await page.goto('/mittelstufe')
  const section = page.locator('section#anmeldung-stufe')
  // The CMS text sits folded away under the "so geht’s" steps.
  await section.locator('[data-registration-details] summary').click()
  await expect(section.getByRole('heading', { name: 'Anmeldung für Klasse 5' })).toBeVisible()
  await expect(section).toContainText('01.02.2027 bis zum 05.02.2027')
  await expect(section.locator('li', { hasText: 'Geburtsurkunde' })).toBeVisible()
  await expect(section.getByRole('heading', { name: 'Wechsel in Klasse 7' })).toBeVisible()
  await expect(section).not.toContainText('Informationen zur Anmeldung folgen in Kürze')
})

test('Mittelstufe lists the registration week, the school tour and the meeting at the Tag der offenen Tür', async ({ page }) => {
  await page.goto('/mittelstufe')
  const section = page.locator('section#anmeldung-stufe')
  await expect(section.locator('li', { hasText: 'Anmeldewoche Klasse 5' })).toContainText('8:00 – 16:00 Uhr')
  await expect(section.locator('li', { hasText: 'Schulführung' })).toContainText('16:00 – 18:00 Uhr')
  await expect(section.locator('li', { hasText: 'Tag der offenen Tür' })).toContainText('16:30 Uhr')
})
