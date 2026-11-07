import { expect, test } from '@playwright/test'

test('the Impressum names the school, its representative, the authority and the person responsible for content', async ({ page }) => {
  await page.goto('/impressum')
  const main = page.locator('main')
  await expect(main.getByRole('heading', { level: 1 })).toHaveText(/Impressum/)
  await expect(main).toContainText('Stübenhofer Weg 20a')
  await expect(main).not.toContainText('Platzhalter')
  for (const heading of ['Anbieter', 'Kontakt', 'Aufsichtsbehörde', 'Verantwortlich für den Inhalt', 'Haftung für Links', 'Urheberrecht'])
    await expect(main.getByRole('heading', { name: heading })).toBeVisible()
  await expect(main).toContainText('Matthias Herpe')
  await expect(main).toContainText('Behörde für Schule, Familie und Berufsbildung')
  await expect(main.getByRole('link', { name: 'schule-stuebenhofer-weg@bsfb.hamburg.de' })).toHaveAttribute('href', 'mailto:schule-stuebenhofer-weg@bsfb.hamburg.de')
})

test('the Datenschutz page covers what the site really does, and the visitor’s rights', async ({ page }) => {
  await page.goto('/datenschutz')
  const main = page.locator('main')
  await expect(main.getByRole('heading', { level: 1 })).toHaveText(/Datenschutz/)
  await expect(main).not.toContainText('Platzhalter')
  for (const heading of ['Verantwortliche Stelle', 'Server-Protokolle', 'Keine Cookies, kein Tracking', 'Kontakt per E-Mail', 'Links und Routenplanung', 'Fotos', 'Ihre Rechte', 'Beschwerderecht'])
    await expect(main.getByRole('heading', { name: heading })).toBeVisible()
  await expect(main).toContainText('Hamburgische Beauftragte für Datenschutz und Informationsfreiheit')
})

test('the footer links both pages', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('footer')
  await expect(footer.getByRole('link', { name: 'Impressum' })).toHaveAttribute('href', '/impressum')
  await expect(footer.getByRole('link', { name: 'Datenschutz' })).toHaveAttribute('href', '/datenschutz')
})
