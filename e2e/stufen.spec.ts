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

for (const [path, dep, next] of [
  ['/grundschule', 'Primarstufe', '/mittelstufe'],
  ['/mittelstufe', 'Mittelstufe', '/oberstufe'],
  ['/oberstufe', 'Oberstufe', '/ganztag'],
] as const)
  test(`${path} renders with ${dep} registration`, async ({ page }) => {
    expect((await page.goto(path))?.status()).toBe(200)
    await expect(page.locator('section#anmeldung-stufe')).toContainText(dep)
    await expect(page.locator(`section#weiter a[href="${next}"]`)).toBeVisible()
  })

test('career orientation only on Mittel- and Oberstufe', async ({ page }) => {
  await page.goto('/grundschule')
  await expect(page.locator('section#berufsorientierung')).toHaveCount(0)
  await page.goto('/mittelstufe')
  await expect(page.locator('section#berufsorientierung')).toContainText('Praxislerntag')
})

test('Oberstufe shows requirements and the empty dates notice', async ({ page }) => {
  await page.goto('/oberstufe')
  await expect(page.locator('section#voraussetzungen')).toContainText('3,0')
  await expect(page.locator('section#anmeldung-stufe')).toContainText('Aktuell stehen keine Termine an')
})
