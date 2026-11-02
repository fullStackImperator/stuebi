import { expect, test } from '@playwright/test'

test('start page shows the deputy head next to the head', async ({ page }) => {
  await page.goto('/')
  const leitung = page.locator('section#schulleitung')
  await expect(leitung.locator('[data-leitung-person]')).toHaveCount(2)
  await expect(leitung).toContainText('Matthias Herpe')
  await expect(leitung).toContainText('Eike Hübenthal')
  await expect(leitung).toContainText('Stellv. Schulleiter')
  for (const img of await leitung.locator('img').all()) await expect(img).toBeVisible()
})

test('Vision names the didactic lead in the Kompass section', async ({ page }) => {
  await page.goto('/vision')
  const kompass = page.locator('section#kompass')
  await expect(kompass.locator('[data-contact-person]')).toContainText('Phoebe Lorenz')
  await expect(kompass).toContainText('Didaktische Leitung')
  await expect(kompass.locator('a[href="mailto:phoebe.lorenz@stuebenhofer-weg.de"]')).toBeVisible()
})
