import { expect, test } from '@playwright/test'

test('„Das erwartet Ihr Kind“ is a bento with one tile per point, no bullet list', async ({ page }) => {
  await page.goto('/grundschule')
  const erwartet = page.locator('section#erwartet')
  await expect(erwartet.locator('[data-bento] [data-bento-cell="point"]')).toHaveCount(4)
  await expect(erwartet.locator('[data-bento] [data-bento-cell="photo"] img')).toBeVisible()
  await expect(erwartet.locator('ul')).toHaveCount(0)
})

for (const path of ['/vorschule', '/grundschule', '/mittelstufe', '/oberstufe'])
  test(`Förderung & Beratung on ${path} has a photo and no card grid`, async ({ page }) => {
    await page.goto(path)
    const foerderung = page.locator('section#foerderung')
    await expect(foerderung.locator('[data-support-photo] img')).toBeVisible()
    await expect(foerderung).toContainText('Sprachförderung')
    await expect(foerderung.locator('a[href="mailto:beratungsdienst@stuebenhofer-weg.de"]')).toBeVisible()
  })

for (const [path, people, office] of [
  ['/vorschule', ['Sebastian Otto'], 'tel:+494042896660'],
  ['/grundschule', ['Sebastian Otto'], 'tel:+494042896660'],
  ['/mittelstufe', ['Konrad Sens', 'Ljubica Sabadija'], 'tel:+4940428761910'],
  ['/oberstufe', ['Reikya Behrendt'], 'tel:+4940428761910'],
] as const)
  test(`Kontakt on ${path} shows the contact photo and the Schulbüro`, async ({ page }) => {
    await page.goto(path)
    const contact = page.locator('section#anmeldung-stufe [data-stage-contact]')
    for (const name of people) await expect(contact.locator('[data-contact-person]', { hasText: name }).locator('img')).toBeVisible()
    await expect(contact.locator(`[data-school-office] a[href="${office}"]`)).toBeVisible()
    await expect(contact.locator('[data-school-office] a[href^="mailto:"]')).toBeVisible()
    await expect(contact).not.toContainText('Wird ergänzt')
  })

test('Bildungswege lists the degrees as tiles', async ({ page }) => {
  await page.goto('/bildungswege')
  await expect(page.locator('section#abschluesse [data-degree]')).toHaveCount(3)
})
