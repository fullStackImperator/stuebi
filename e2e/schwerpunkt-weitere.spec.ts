import { expect, test } from '@playwright/test'

// The old site's "Schwerpunkte" menu had six entries; the three smaller ones get compact sections.
test('MINTprax, Zweite Fremdsprache and Projektlernen follow the three large Schwerpunkte', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const ids = await page.locator('main section[id]').evaluateAll((els) => els.map((e) => e.id))
  const order = ['sport', 'makerspace', 'abgekocht', 'mintprax', 'fremdsprachen', 'projektlernen']
  expect(ids.filter((id) => order.includes(id))).toEqual(order)
})

test('MINTprax names its school projects and its partners', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const mint = page.locator('section#mintprax')
  await expect(mint.locator('h2')).toHaveText('MINTprax')
  await expect(mint.locator('[data-mint-projekt]')).toHaveCount(2)
  await expect(mint).toContainText('TUHH')
  await expect(mint).toContainText('Aurubis')
})

test('Zweite Fremdsprache shows the three languages, the grades and the Abitur rule', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const sprachen = page.locator('section#fremdsprachen')
  await expect(sprachen.locator('[data-sprache] h3')).toHaveText(['Spanisch', 'Französisch', 'Türkisch'])
  await expect(sprachen).toContainText('Klasse 7')
  await expect(sprachen).toContainText('Oberstufe')
})

test('Projektlernen explains the subject, the Stübi-Assistenten and the radio play award', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const projekt = page.locator('section#projektlernen')
  for (const text of ['Projekt', 'Stübi-Assistenten', 'Reisender']) await expect(projekt).toContainText(text)
})

test('Abgekocht lists a topic for every year', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const themes = page.locator('section#abgekocht [data-jahrgangsthema]')
  await expect(themes).toHaveCount(8)
  await expect(themes.first()).toContainText('Saisonale und regionale Ernährung')
})

test('the Schwerpunkt menu has the three large Schwerpunkte and one entry for the rest', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop menu')
  await page.goto('/')
  await page.getByRole('button', { name: 'Schwerpunkt' }).hover()
  for (const [title, id] of [
    ['Sportbetonte Schule', 'sport'],
    ['Stübi-Makerspace', 'makerspace'],
    ['Projekt Abgekocht!', 'abgekocht'],
    ['Und noch mehr', 'mintprax'],
  ]) {
    await expect(page.getByRole('link', { name: new RegExp(`^${title.replace('!', '\\!')}`) }).first(), title).toHaveAttribute('href', `/schwerpunkt#${id}`)
  }
})

test('the Schwerpunkt menu stays at four entries', async () => {
  const { mainNav } = await import('../src/lib/site-navigation')
  const schwerpunkt = mainNav.find((n) => n.href === '/schwerpunkt')!
  expect(schwerpunkt.children?.map((c) => c.title)).toEqual(['Sportbetonte Schule', 'Stübi-Makerspace', 'Projekt Abgekocht!', 'Und noch mehr …'])
})

test('next to the lone third Sport group sits a small bento: a photo and the Stübi-Cup tile', async ({ page }, testInfo) => {
  await page.goto('/schwerpunkt')
  const aside = page.locator('section#sport [data-group-aside]')
  await expect(aside.locator('img')).toBeVisible()
  await expect(aside).toContainText('Stübi-Cup')
  if (testInfo.project.name === 'desktop') {
    const wettkaempfe = (await page.locator('section#sport [data-point-group]').nth(2).boundingBox())!
    const box = (await aside.boundingBox())!
    expect(Math.abs(box.y - wettkaempfe.y)).toBeLessThan(4)
    expect(box.x).toBeGreaterThan(wettkaempfe.x + wettkaempfe.width)
    // The bento spans both remaining columns, out to the right edge of the partner column.
    const partners = (await page.locator('section#sport [data-partner-logos]').boundingBox())!
    expect(Math.abs(box.x + box.width - (partners.x + partners.width))).toBeLessThan(4)
  }
})

test('the Sport bento shows two photo placeholders, so the school sees which photos are missing', async ({ page }) => {
  await page.goto('/schwerpunkt')
  const placeholders = page.locator('section#sport [data-group-aside] [data-photo-placeholder]')
  await expect(placeholders).toHaveCount(2)
  await expect(placeholders.first()).toContainText('Foto folgt')
})
