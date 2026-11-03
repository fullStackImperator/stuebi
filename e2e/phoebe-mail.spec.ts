import { expect, test } from '@playwright/test'

// Mail von Phoebe Lorenz: IVK sichtbar machen, Durchwahlen behalten, Anliegen im Betreff.

const subject = (topic: string) => `subject=${encodeURIComponent(`[${topic}] Anfrage über die Website`)}`

test('Bildungswege has an IVK section with the three classes and both contacts', async ({ page }) => {
  await page.goto('/bildungswege#ivk')
  const ivk = page.locator('section#ivk')
  await expect(ivk.locator('[data-ivk-class]')).toHaveText([/IVK 5\/6/, /IVK 7\/8/, /IVK ESA 9\/10/])
  const contacts = ivk.locator('[data-ivk-contacts]')
  await expect(contacts).toContainText('Phoebe Lorenz')
  await expect(contacts).toContainText('IVK-Koordination')
  await expect(contacts).toContainText('Yadigar Bayrakdar')
  await expect(contacts.locator('a[href="tel:+4940428761916"]')).toBeVisible()
  await expect(contacts.locator(`a[href*="${subject('IVK')}"]`)).toBeVisible()
})

test('the menu links to the IVK', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop menu')
  await page.goto('/')
  await page.getByRole('button', { name: 'Bildungswege' }).hover()
  await expect(page.locator('a[href="/bildungswege#ivk"]:visible')).toBeVisible()
})

test('Yadi is named for the IVK in the Schulbüro team', async ({ page }) => {
  await page.goto('/anmeldung#schulbuero')
  await expect(page.locator('[data-office-team] li', { hasText: 'Yadigar Bayrakdar' })).toContainText('IVK')
})

test('the start page shows the direct phone line of each contact person', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('[data-contact-card]')
  await expect(cards).toHaveCount(4)
  await expect(cards.filter({ hasText: 'Konrad Sens' }).locator('a[href="tel:+4940428761954"]')).toBeVisible()
  await expect(cards.filter({ hasText: 'Ljubica Sabadija' }).locator('a[href="tel:+4940428761914"]')).toBeVisible()
})

test('Stufe pages show the direct lines of the Ansprechpartner', async ({ page }) => {
  await page.goto('/mittelstufe')
  const contact = page.locator('[data-stage-contact]')
  await expect(contact.locator('a[href="tel:+4940428761954"]')).toBeVisible()
  await expect(contact.locator('a[href="tel:+4940428761914"]')).toBeVisible()
  // Judith Wagener has her own line in the Schulbüro.
  await expect(contact.locator('[data-office-person]', { hasText: 'Judith Wagener' }).locator('a[href="tel:+4940428761913"]')).toBeVisible()
})

const ivkHref = `mailto:schule-stuebenhofer-weg@bsfb.hamburg.de?${subject('IVK')}`
const topics = ['Anmeldung', 'Primarstufe', 'Mittelstufe', 'Oberstufe', 'Ganztag', 'IVK', 'Sonstiges']

test('the yellow Kontakt aufnehmen button opens a topic menu', async ({ page }) => {
  await page.goto('/')
  const button = page.locator('section#kontakt').getByRole('button', { name: 'Kontakt aufnehmen' })
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await button.click()
  const menu = page.getByRole('menu', { name: 'Worum geht es?' })
  await expect(menu.getByRole('menuitem')).toHaveText(topics)
  await expect(menu.getByRole('menuitem', { name: 'IVK' })).toHaveAttribute('href', ivkHref)
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
})

test('the Schulbüro mail on a Stufe page asks for the topic', async ({ page }) => {
  await page.goto('/oberstufe')
  await page.locator('[data-school-office] [data-mail-topic-menu] button').click()
  await expect(page.getByRole('menuitem', { name: 'Oberstufe' })).toHaveAttribute('href', /subject=%5BOberstufe%5D/)
})

test('the mail card on Anmeldung asks for the topic', async ({ page }) => {
  await page.goto('/anmeldung#schulbuero')
  await page.locator('section#schulbuero [data-mail-topic-menu] button').click()
  await expect(page.getByRole('menuitem')).toHaveText(topics)
  await expect(page.getByRole('menuitem', { name: 'IVK' })).toHaveAttribute('href', ivkHref)
})

test('the floating Kontakt panel asks for the topic before mailing', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'large screens only')
  await page.goto('/')
  await page.getByRole('button', { name: 'Kontakt', exact: true }).click()
  const panel = page.locator('[data-floating-contact-panel]')
  await panel.locator('[data-mail-topic-menu] button').click()
  await expect(panel.getByRole('menuitem', { name: 'IVK' })).toHaveAttribute('href', ivkHref)
  // Escape closes the menu first, the panel stays open.
  await page.keyboard.press('Escape')
  await expect(panel.getByRole('menu')).toBeHidden()
  await expect(panel).toBeVisible()
})
