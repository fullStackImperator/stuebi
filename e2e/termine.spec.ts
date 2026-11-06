import { expect, test } from '@playwright/test'

// Uses the dates currently maintained in the CMS (Abteilungen → Termine).
test('Termine come from the CMS and sit in the merged sections', async ({ page }) => {
  await page.goto('/termine')
  const neu = page.locator('section#neue-familien')
  // A registration window names its start and its deadline, like the Vorschule's own label.
  await expect(neu.locator('[data-date-row]', { hasText: 'Anmeldung 1. Klasse' })).toContainText('ab 4. Jan. bis 22.01.2027')
  await expect(neu.locator('[data-date-row]', { hasText: 'Marktplatz der Grundschulen' })).toBeVisible()
  await expect(neu.locator('a[href="/anmeldung"]')).toBeVisible()
  // Ordered by the date on the leaf: the Marktplatz (19.11.) before the registration deadlines in January.
  const titles = await neu.locator('[data-date-row] h3').allTextContents()
  expect(titles.indexOf('Marktplatz der Grundschulen')).toBeLessThan(titles.indexOf('Anmeldung Vorschule'))
  // The Winterfest is the Tag der offenen Tür, entered for all three departments and listed once.
  const fest = page.locator('section#feste [data-date-row]', { hasText: 'Tag der offenen Tür – Winterfest' })
  await expect(fest).toHaveCount(1)
  await expect(fest).toContainText('Primarstufe, Mittelstufe & Oberstufe')
})

test('Termine has four sections, with the Tag der offenen Tür first among the Feste', async ({ page }) => {
  await page.goto('/termine')
  const ids = await page.locator('main section[id]').evaluateAll((els) => els.map((el) => el.id))
  expect(ids).toEqual(['feste', 'neue-familien', 'jahreslauf', 'schulkalender'])
  await expect(page.locator('section#feste [data-date-row]').first()).toContainText('Tag der offenen Tür')
})

test('old Termine anchors still land in the merged sections', async ({ page }) => {
  await page.goto('/termine')
  for (const [old, section] of [
    ['offene-tuer', 'feste'],
    ['veranstaltungen', 'feste'],
    ['anmeldezeitraeume', 'neue-familien'],
    ['infoabende', 'neue-familien'],
  ])
    await expect(page.locator(`section#${section} #${old}`)).toHaveCount(1)
})

test('the Termine menu links the four sections', async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) < 1024, 'desktop menu')
  await page.goto('/')
  await page.locator('header').getByRole('button', { name: 'Termine' }).click()
  for (const href of ['/termine#feste', '/termine#neue-familien', '/termine#jahreslauf', '/termine#schulkalender'])
    await expect(page.locator(`a[href="${href}"]:visible`)).toHaveCount(1)
})

test('Termine rows show a calendar leaf with the day', async ({ page }) => {
  await page.goto('/termine')
  const row = page.locator('section#feste [data-date-row]', { hasText: 'Winterfest' })
  await expect(row.locator('[data-calendar-day]')).toHaveText('3')
})

test('Termine shows every upcoming entry of the public IServ calendar', async ({ page }) => {
  await page.goto('/termine')
  const kalender = page.locator('section#schulkalender')
  await expect(kalender).toBeVisible()
  // The Winterfest (3.12.2026) is in IServ, so the school calendar lists it with its IServ time.
  const fest = kalender.locator('[data-date-row]', { hasText: 'Winterfest' })
  await expect(fest).toBeVisible()
  await expect(fest).toContainText('15:00 – 18:00 Uhr')
})

test('„Ein Jahr an der Stübi“ walks through the school year, September to July', async ({ page }) => {
  await page.goto('/termine')
  const jahr = page.locator('section#jahreslauf')
  const months = jahr.locator('[data-year-month]')
  await expect(months).toHaveCount(11)
  await expect(months.first()).toContainText('September')
  await expect(months.last()).toContainText('Juli')
  // The Tag der offenen Tür stands out; the Stübicup is more than football.
  await expect(jahr.locator('[data-year-event][data-highlight]')).toContainText('Winterfest')
  await expect(months.filter({ hasText: 'Januar' }).locator('[data-year-event]', { hasText: 'Stübicup' })).toContainText('mehreren Sportarten')
  await expect(months.filter({ hasText: 'November' }).locator('[data-year-event]', { hasText: 'Marktplatz der Grundschulen' })).toBeVisible()
  // Only what families see: no internal conferences, no unexplained cups.
  for (const word of ['OSW', 'Konferenz', 'ZK-Woche', 'Präsenz']) await expect(jahr).not.toContainText(word)
  await expect(jahr.locator('a[href="#schulkalender"]')).toBeVisible()
  // Every source loaded, so no section stands in with the error notice.
  await expect(page.locator('[data-dates-unavailable]')).toHaveCount(0)
})
