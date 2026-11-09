import { expect, test } from '@playwright/test'

// An empty CMS band slot shows a default photo from the school instead of leaving a gap.
const defaults: [string, string][] = [
  ['/bildungswege', 'abitur-2025'],
  ['/vision', 'kollegium'],
  ['/anmeldung', 'grundschule-lehrer'],
]

for (const [path, photo] of defaults) {
  test(`${path} shows a photo band, by default ${photo}`, async ({ page }) => {
    await page.goto(path)
    const img = page.locator('[data-photo-band] img')
    await expect(img).toHaveCount(1)
    await expect(img).toHaveAttribute('src', new RegExp(photo))
    expect((await img.getAttribute('alt'))!.length).toBeGreaterThan(10)
  })
}

test('/vision shows the staff photo as "Unser Kollegium"', async ({ page }) => {
  await page.goto('/vision')
  await expect(page.locator('[data-photo-band] figcaption')).toHaveText('Unser Kollegium')
})

test('the start page shows the school building right above the Schulleitung', async ({ page }) => {
  await page.goto('/')
  const band = page.locator('[data-photo-band]:has(img[src*="campus-gebaeude"])')
  await expect(band).toHaveCount(1)
  const next = await band.evaluate((el) => el.nextElementSibling?.id)
  expect(next).toBe('schulleitung')
})

// A band with neither a CMS photo nor a default shows where the school can upload one. Breites Foto 1 on the start
// page is filled in the CMS since November 2026, so the placeholder only shows if someone empties the slot again.
test('Breites Foto 1 on the start page shows its photo, or a "Foto folgt" placeholder naming its CMS slot', async ({ page }) => {
  await page.goto('/')
  const placeholder = page.locator('[data-photo-band-placeholder]')
  if ((await placeholder.count()) === 0) {
    await expect(page.locator('[data-photo-band] img[src*="mensa-fruehstueck-raum"]')).toHaveCount(1)
    return
  }
  await expect(placeholder).toContainText('Foto folgt')
  await expect(placeholder).toContainText('Seitenbilder → Startseite → Breites Foto 1')
})
