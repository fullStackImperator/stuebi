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

test('Oberstufe requirements are a checklist on a rail, not cards', async ({ page }) => {
  await page.goto('/oberstufe')
  const section = page.locator('section#voraussetzungen')
  const items = section.locator('[data-step-list] > li')
  await expect(items).toHaveCount(3)
  await expect(items.first().locator('[data-step-marker="check"]')).toBeVisible()
  await expect(items.first()).toContainText('Mittlerer Schulabschluss')
  await expect(section.locator('[data-info-card]')).toHaveCount(0)
})

test('Schwerpunkt „So läuft’s“ keeps numbered steps', async ({ page }) => {
  await page.goto('/schwerpunkt')
  await expect(page.locator('section#makerspace [data-step-list] [data-step-marker="number"]').first()).toHaveText('1')
})

test('Oberstufe requirements show the Abitur photo next to the checklist', async ({ page }) => {
  await page.goto('/oberstufe')
  const img = page.locator('section#voraussetzungen [data-requirements-photo] img')
  await expect(img).toBeVisible()
  await expect(img).toHaveAttribute('alt', /Abitur/)
})

test('Oberstufe shows both routes to the Abitur as lanes, not cards', async ({ page }) => {
  await page.goto('/oberstufe')
  const section = page.locator('section#alltag')
  const lanes = section.locator('[data-abitur-path]')
  await expect(lanes).toHaveCount(2)
  await expect(lanes.nth(0)).toContainText('Gymnasialzweig')
  await expect(lanes.nth(0)).toContainText('nach 12 Jahren')
  await expect(lanes.nth(1)).toContainText('Stadtteilschulzweig')
  await expect(lanes.nth(1)).toContainText('Vorstufe')
  await expect(lanes.nth(1)).toContainText('nach 13 Jahren')
  await expect(section.locator('[data-info-card]')).toHaveCount(0)
  await expect(section).toContainText('Fächer in der Vorstufe')
})

test('Mittelstufe Schulalltag is a path through three phases with highlight tags', async ({ page }) => {
  await page.goto('/mittelstufe')
  const section = page.locator('section#alltag')
  const phases = section.locator('[data-phase]')
  await expect(phases).toHaveCount(3)
  await expect(phases.nth(0)).toContainText('Klasse 5 und 6')
  await expect(phases.nth(1)).toContainText('Klasse 7 und 8')
  await expect(phases.nth(2)).toContainText('Klasse 9 und 10')
  await expect(phases.nth(0).locator('[data-phase-tag]', { hasText: 'Starterwoche' })).toBeVisible()
  await expect(phases.nth(2).locator('[data-phase-tag]', { hasText: 'Zeugnisübergabe' })).toBeVisible()
  await expect(section.locator('[data-info-card]')).toHaveCount(0)
})
