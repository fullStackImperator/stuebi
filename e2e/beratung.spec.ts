import { expect, test } from '@playwright/test'
import { openMenuSection } from './helpers'

// Inhalte nach der alten Seite „Beratungsdienst / BOB-Team“, Teamfoto 2025.
const team = [
  'Friederike Krinke', 'Brajan Michalski', 'Eric Tété',
  'Jenny Zerbin', 'Rita Rónai', 'Kristina Franke', 'Helena Cvijanovic',
  'Arlinda Ibraimi', 'Zehra Tuna', 'Laili Zargapur', 'Muhammed Ali Kurnaz',
]

test('Beratung shows the team photo with every name below it', async ({ page }) => {
  await page.goto('/beratung')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Wir sind für Sie da')
  const figure = page.locator('section#team figure')
  await expect(figure.locator('img')).toHaveAttribute('src', /beratungsteam/)
  for (const name of team) await expect(figure.locator('figcaption')).toContainText(name)
})

test('Beratung lists the offers in three groups and the confidential counselling teacher', async ({ page }) => {
  await page.goto('/beratung')
  const offers = page.locator('section#angebot [data-offer-group]')
  await expect(offers).toHaveCount(3)
  await expect(offers.nth(2)).toContainText('No Blame Approach')
  const teacher = page.locator('section#beratungslehrerin')
  await expect(teacher).toContainText('Marina Merkina')
  await expect(teacher).toContainText('vertraulich')
  await expect(teacher).not.toContainText('Schulschließung')
})

test('Beratung gives the contacts as tappable links', async ({ page }) => {
  await page.goto('/beratung')
  const contact = page.locator('section#kontakt-beratung')
  for (const mail of ['beratungsdienst', 'jenny.zerbin', 'marina.merkina'])
    await expect(contact.locator(`a[href="mailto:${mail}@stuebenhofer-weg.de"]`)).toBeVisible()
  await expect(contact.locator('a[href="tel:+4940428761942"]')).toBeVisible()
})

test('the stage pages link the Beratungsdienst to its own page', async ({ page }) => {
  await page.goto('/mittelstufe')
  await page.locator('[data-beratungsdienst] a[href="/beratung"]').click()
  await expect(page).toHaveURL(/\/beratung$/)
})

test('the menu lists Beratung under Anmeldung & Kontakt', async ({ page }) => {
  await page.goto('/')
  await openMenuSection(page, 'Anmeldung & Kontakt')
  await expect(page.locator('a[href="/beratung"]').filter({ visible: true }).first()).toBeVisible()
})

test('Beratung shows the portraits of Jenny Zerbin and Marina Merkina', async ({ page }) => {
  await page.goto('/beratung')
  const contact = page.locator('section#kontakt-beratung')
  await expect(contact.getByRole('img', { name: /Jenny Zerbin/ })).toBeVisible()
  await expect(contact.getByRole('img', { name: /Marina Merkina/ })).toBeVisible()
  // Her portrait also stands beside the counselling teacher section.
  await expect(page.locator('section#beratungslehrerin').getByRole('img', { name: /Marina Merkina/ })).toBeVisible()
})
