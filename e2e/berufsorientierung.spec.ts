import { expect, test } from '@playwright/test'

test('Berufsorientierung shows the path from Klasse 8 to 10', async ({ page }) => {
  await page.goto('/mittelstufe')
  const section = page.locator('section#berufsorientierung')
  await expect(section.locator('[data-phase]')).toHaveCount(3)
  await expect(section.locator('[data-phase]').first()).toContainText('Klasse 8')
  await expect(section.locator('[data-phase]').last()).toContainText('Klasse 10')
  await expect(section).toContainText('Praxislerntag')
})

test('Berufsorientierung names both special classes next to a photo', async ({ page }) => {
  await page.goto('/mittelstufe')
  const tracks = page.locator('section#berufsorientierung [data-career-tracks]')
  await expect(tracks).toContainText('Ausbildungsklasse')
  await expect(tracks).toContainText('Fokusklasse')
  await expect(tracks.locator('img')).toBeVisible()
})

test('Berufsorientierung lists six student companies with photos, without Formel 1', async ({ page }) => {
  await page.goto('/mittelstufe')
  const companies = page.locator('section#berufsorientierung [data-company]')
  await expect(companies).toHaveCount(6)
  for (const name of ['Barista', 'Medien-Stübi', 'Holzwerkstatt', 'SUO Design', 'Stübi-Manager', 'Kazumi'])
    await expect(companies.filter({ hasText: name })).toHaveCount(1)
  await expect(companies.locator('img')).toHaveCount(6)
  await expect(page.locator('section#berufsorientierung')).not.toContainText('Formel 1')
})

test('Berufsorientierung contacts have portraits and tappable emails', async ({ page }) => {
  await page.goto('/mittelstufe')
  const section = page.locator('section#berufsorientierung')
  await expect(section.locator('[data-contact-person]')).toHaveCount(4)
  for (const mail of ['konrad.sens', 'heike.lammerding', 'sabine.henkel', 'sabine.nieden'])
    await expect(section.locator(`a[href="mailto:${mail}@stuebenhofer-weg.de"]`)).toBeVisible()
  await expect(section).toContainText('Mi und Do, 8:20–13:20 Uhr')
})
