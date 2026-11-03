import { expect, test } from '@playwright/test'

// An empty CMS band slot shows a default photo from the school instead of leaving a gap.
const defaults: [string, string][] = [
  ['/bildungswege', 'abitur-2025'],
  ['/vision', 'mittelstufe-schuelerinnen'],
  ['/anmeldung', 'grundschule-lehrer'],
]

for (const [path, photo] of defaults) {
  test(`${path} shows a photo band, by default ${photo}`, async ({ page }) => {
    await page.goto(path)
    const img = page.locator('[data-photo-band] img')
    await expect(img).toHaveCount(1)
    expect((await img.getAttribute('alt'))!.length).toBeGreaterThan(10)
  })
}
