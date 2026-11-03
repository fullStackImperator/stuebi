import { expect, test } from '@playwright/test'

// Jahresplan 2026/27 der Mittelstufe (Jahrgänge 8–10, Termine von Konrad Sens).

test('Mittelstufe has a year plan with one tab per Jahrgang', async ({ page }) => {
  await page.goto('/mittelstufe')
  const plan = page.locator('section#jahresplan')
  const tabs = plan.getByRole('tab')
  await expect(tabs).toHaveText(['Jahrgang 8', 'Jahrgang 9', 'Jahrgang 10'])
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true')
  await expect(plan.getByRole('tabpanel')).toContainText('Zukunftswerkstatt')
})

test('switching to Jahrgang 10 shows its exams and the Entlassfeier', async ({ page }) => {
  await page.goto('/mittelstufe')
  const plan = page.locator('section#jahresplan')
  await plan.getByRole('tab', { name: 'Jahrgang 10' }).click()
  const panel = plan.getByRole('tabpanel')
  await expect(panel).toContainText('Entlassfeier')
  await expect(panel).toContainText('MSA')
  await expect(panel.locator('[data-date-row]', { hasText: 'Praktikum' }).first()).toContainText('Ausbildungsklasse')
})

test('the year plan is written for parents: no staff meetings, no open placeholders', async ({ page }) => {
  await page.goto('/mittelstufe')
  const plan = page.locator('section#jahresplan')
  for (const internal of ['Zeugniskonferenz', 'ZK', 'TBD', 'KuK', 'Datenmanagement', '!!!']) await expect(plan).not.toContainText(internal)
})
