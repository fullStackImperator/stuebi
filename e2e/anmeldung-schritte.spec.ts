import { expect, test } from '@playwright/test'

// Every stage page leads with "so geht’s" steps; the full CMS text stays, folded away below them.
const pages: [string, string, number, string][] = [
  ['/vorschule', 'In die Vorschule: so geht’s', 2, 'Burgweide'],
  ['/grundschule', 'In die 1. Klasse: so geht’s', 3, 'Erstwunschschule'],
  ['/mittelstufe', 'In die 5. Klasse: so geht’s', 3, 'Passfoto'],
]

for (const [path, title, count, cmsWord] of pages) {
  test(`${path} shows the registration as ${count} steps, the CMS text folded away`, async ({ page }) => {
    await page.goto(path)
    const section = page.locator('section#anmeldung-stufe')
    await expect(section.getByRole('heading', { name: title })).toBeVisible()
    await expect(section.locator('[data-registration-steps] > li')).toHaveCount(count)
    const details = section.locator('[data-registration-details]')
    await expect(details).not.toHaveAttribute('open')
    await expect(details.getByText(cmsWord, { exact: false })).toBeHidden()
    await details.locator('summary').click()
    await expect(details.getByText(cmsWord, { exact: false }).first()).toBeVisible()
  })
}

test('the Mittelstufe steps end with the change into Klasse 7', async ({ page }) => {
  await page.goto('/mittelstufe')
  await expect(page.locator('section#anmeldung-stufe')).toContainText('Wechsel in Klasse 7')
})

test('the Oberstufe keeps its three steps', async ({ page }) => {
  await page.goto('/oberstufe')
  const section = page.locator('section#anmeldung-stufe')
  await expect(section.getByRole('heading', { name: 'In die Vorstufe: so geht’s' })).toBeVisible()
  await expect(section.locator('[data-registration-steps] > li')).toHaveCount(3)
})
