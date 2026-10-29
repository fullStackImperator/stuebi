import { expect, test } from '@playwright/test'

test('Vorschule page has every block and the Primarstufe registration', async ({ page }) => {
  const res = await page.goto('/vorschule')
  expect(res?.status()).toBe(200)
  await expect(page.locator('h1')).toContainText('Vorschule')
  for (const id of ['erwartet', 'alltag', 'foerderung', 'anmeldung-stufe', 'weiter'])
    await expect(page.locator(`section#${id}`)).toBeVisible()
  await expect(page.locator('section#berufsorientierung')).toHaveCount(0)
  await expect(page.locator('section#anmeldung-stufe')).toContainText('Primarstufe')
  await expect(page.locator('section#weiter a[href="/grundschule"]')).toBeVisible()
  await expect(page.locator('section#foerderung')).toContainText('beratungsdienst@stuebenhofer-weg.de')
})
