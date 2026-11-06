import { expect, test } from '@playwright/test'

// Wünsche aus der Mail von Eike Hübenthal (stellv. Schulleiter).

test('the Schulbüro shows its team with photos and the opening hours', async ({ page }) => {
  await page.goto('/anmeldung')
  const buero = page.locator('section#schulbuero')
  await expect(buero.locator('[data-contact-person]')).toHaveCount(5)
  for (const name of ['Susanne Oehlers', 'Judith Wagener', 'Anja Grube', 'Yadigar Bayrakdar', 'Iris Westphal'])
    await expect(buero).toContainText(name)
  await expect(buero).toContainText('Mo–Do 7:30–16:00 Uhr')
  for (const img of await buero.locator('[data-contact-person] img').all()) await expect(img).toBeVisible()
})

test('a floating contact button opens both Schulbüros on large screens', async ({ page, viewport }) => {
  await page.goto('/ganztag')
  const button = page.getByRole('button', { name: 'Kontakt', exact: true })
  if ((viewport?.width ?? 0) < 1024) {
    // Phones and tablets have the action bar with „Anrufen“ instead.
    await expect(button).toBeHidden()
    return
  }
  await page.mouse.wheel(0, 2000)
  await expect(button).toBeVisible()
  await button.click()
  const panel = page.locator('[data-floating-contact-panel]')
  await expect(panel.locator('a[href="tel:+4940428761910"]')).toBeVisible()
  await expect(panel.locator('a[href="tel:+494042896660"]')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
})

test('Förderung names the Förderkoordination on the Stufen pages', async ({ page }) => {
  for (const path of ['/grundschule', '/mittelstufe']) {
    await page.goto(path)
    const foerderung = page.locator('section#foerderung')
    const people = foerderung.locator('[data-foerderkoordination] [data-foerder-person]')
    await expect(people).toHaveCount(3)
    for (const [name, mail] of [
      ['Florian Elpel', 'florian.elpel'],
      ['Sonja Kronenberg', 'sonja.kronenberg'],
      ['Sandra Woitschig', 'sandra.woitschig'],
    ]) {
      const row = people.filter({ hasText: name })
      await expect(row.locator(`a[href="mailto:${mail}@stuebenhofer-weg.de"]`)).toBeVisible()
    }
    await expect(foerderung.locator('[data-foerderkoordination]')).toContainText('Förderkoordination')
  }
})

test('Termine calls the IServ section allgemeine & schulöffentliche Termine', async ({ page }) => {
  await page.goto('/termine')
  await expect(page.locator('section#schulkalender h2')).toContainText('schulöffentliche Termine')
})

test('each Stufe page shows the faces of its own Schulbüro', async ({ page }) => {
  for (const [path, names] of [
    ['/vorschule', ['Iris Westphal']],
    ['/grundschule', ['Iris Westphal']],
    ['/mittelstufe', ['Judith Wagener', 'Anja Grube']],
    ['/oberstufe', ['Yadigar Bayrakdar']],
  ] as const) {
    await page.goto(path)
    const office = page.locator('[data-stage-contact]')
    for (const name of names) await expect(office).toContainText(name)
    await expect(page.locator('[data-stage-contact] [data-office-person] img')).toHaveCount(names.length)
  }
})

// Gabriela Bajohr no longer works at the school (Nov 2026): her name and photo are gone everywhere.
test('Gabriela Bajohr no longer appears on the site', async ({ page }) => {
  for (const path of ['/vorschule', '/grundschule', '/anmeldung']) {
    await page.goto(path)
    await expect(page.locator('body'), path).not.toContainText('Bajohr')
    await expect(page.locator('img[src*="bajohr"]'), path).toHaveCount(0)
  }
})
