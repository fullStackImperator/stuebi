import { expect, test } from '@playwright/test'

const cases = [
  ['/abteilungen', '/anmeldung#ablauf'],
  ['/abteilungen/primarstufe', '/anmeldung#primarstufe'],
  ['/abteilungen/mittelstufe', '/anmeldung#mittelstufe'],
  ['/abteilungen/oberstufe', '/anmeldung#oberstufe'],
]
for (const [from, to] of cases) {
  test(`redirect ${from}`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 })
    expect(res.status()).toBe(308)
    expect(res.headers()['location']).toBe(to)
  })
}

test('redirected anchor heading is visible', async ({ page }) => {
  await page.goto('/abteilungen/mittelstufe')
  await expect(page).toHaveURL(/\/anmeldung#mittelstufe$/)
  const header = (await page.locator('header').first().boundingBox())!
  const heading = (await page.locator('section#mittelstufe h2').boundingBox())!
  expect(heading.y).toBeGreaterThanOrEqual(header.y + header.height)
})

test('footer and home links point to /anmeldung', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('a[href^="/abteilungen"]')).toHaveCount(0)
})
