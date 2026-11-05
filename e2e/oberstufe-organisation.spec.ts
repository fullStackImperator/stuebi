import { expect, test } from '@playwright/test'

// „So ist die Oberstufe organisiert“: Wege-Balken, die zwei Profile groß, Fächer der Vorstufe und Begleitung.

test('the Oberstufe highlights both Studienstufe profiles right under the routes', async ({ page }) => {
  await page.goto('/oberstufe')
  const profiles = page.locator('section#alltag [data-oberstufe-profile] [data-profile]')
  await expect(profiles).toHaveCount(2)
  await expect(profiles.nth(0)).toContainText('Fair Play')
  await expect(profiles.nth(0)).toContainText('Sport, Gesundheit & Management')
  await expect(profiles.nth(1)).toContainText('Mein Start-Up')
})

test('each Oberstufe profile lists its subjects with hours and level', async ({ page }) => {
  await page.goto('/oberstufe')
  const fairPlay = page.locator('section#alltag [data-profile]', { hasText: 'Fair Play' }).locator('[data-profile-subject]')
  await expect(fairPlay.filter({ hasText: 'Sport' })).toContainText('4 Std · eA')
  await expect(fairPlay.filter({ hasText: 'Biologie' })).toContainText('2 Std · gA')
  const startUp = page.locator('section#alltag [data-profile]', { hasText: 'Mein Start-Up' }).locator('[data-profile-subject]')
  await expect(startUp.filter({ hasText: 'Wirtschaft' })).toContainText('4 Std · eA')
  await expect(startUp.filter({ hasText: 'Chemie' })).toContainText('2 Std · gA')
})

test('the core subjects for all profiles sit above the profiles', async ({ page }) => {
  await page.goto('/oberstufe')
  const kern = page.locator('section#alltag [data-oberstufe-profile] [data-kernfaecher]')
  await expect(kern).toContainText('12')
  await expect(kern.locator('[data-kernfach]')).toHaveCount(3)
  await expect(kern.locator('[data-kernfach]').first()).toContainText('Deutsch')
  await expect(kern).toContainText('erhöhtem Niveau')
})

test('Bildungswege and Oberstufe show the same profile texts', async ({ page }) => {
  await page.goto('/bildungswege')
  const there = await page.locator('section#abschluesse [data-profile] [data-profile-intro]').allTextContents()
  await expect(page.locator('section#abschluesse [data-profile-subject]')).toHaveCount(0)
  await page.goto('/oberstufe')
  const here = await page.locator('section#alltag [data-profile] [data-profile-intro]').allTextContents()
  expect(here).toEqual(there)
})

test('the Vorstufe subjects come in tiers with hours, the second language last', async ({ page }) => {
  await page.goto('/oberstufe')
  const tiers = page.locator('section#alltag [data-vorstufe-faecher] [data-subject-tier]')
  await expect(tiers).toHaveCount(4)
  await expect(tiers.nth(0)).toContainText('4 Wochenstunden')
  await expect(tiers.nth(0).locator('li')).toHaveText(['Deutsch', 'Mathematik', 'Englisch'])
  await expect(tiers.nth(1)).toContainText('Informatik')
  await expect(tiers.nth(2)).toContainText('Darstellendes Spiel')
  await expect(tiers.nth(3)).toContainText('2. Fremdsprache')
  await expect(tiers.nth(3).locator('li', { hasText: 'Türkisch' })).toContainText('3 Std')
})

test('the requirements follow right after the organisation', async ({ page }) => {
  await page.goto('/oberstufe')
  const ids = await page.locator('main section[id]').evaluateAll((s) => s.map((x) => x.id))
  expect(ids.indexOf('voraussetzungen')).toBe(ids.indexOf('alltag') + 1)
})

test('the Oberstufe registration shows three steps instead of „folgen in Kürze“', async ({ page }) => {
  await page.goto('/oberstufe')
  const section = page.locator('section#anmeldung-stufe')
  const steps = section.locator('[data-registration-steps] > li')
  await expect(steps).toHaveCount(3)
  await expect(steps.nth(0)).toContainText('Februar')
  await expect(steps.nth(2)).toContainText('MSA')
  await expect(section).not.toContainText('Informationen zur Anmeldung folgen in Kürze')
})

test('personal support names the three destinations', async ({ page }) => {
  await page.goto('/oberstufe')
  await expect(page.locator('section#alltag [data-begleitung] [data-destination]')).toHaveText([
    'Studium',
    'Duale Ausbildung',
    'Ausbildung im höheren Dienst',
  ])
})

test('„Das erwartet Ihr Kind“ leaves the profiles to the section below', async ({ page }) => {
  await page.goto('/oberstufe')
  const erwartet = page.locator('section#erwartet')
  await expect(erwartet).not.toContainText('Fair Play')
  await expect(erwartet).toContainText('Fächerbreite & Sprachen')
  await expect(erwartet).toContainText('Vertrautes Umfeld')
})

test('the section follows the students: Vorstufe, then Studienstufe, then support', async ({ page }) => {
  await page.goto('/oberstufe')
  const steps = page.locator('section#alltag [data-stage-step]')
  await expect(steps).toHaveText([/Vorstufe/, /Studienstufe/])
  await expect(steps.nth(0)).toContainText('Klasse 11')
  await expect(steps.nth(1)).toContainText('Gymnasialzweig 11–12')
  const order = await page.locator('section#alltag').evaluate((el) =>
    ['[data-vorstufe-faecher]', '[data-oberstufe-profile]', '[data-begleitung]'].map((sel) => el.querySelector(sel)!.getBoundingClientRect().top),
  )
  expect(order[0]).toBeLessThan(order[1])
  expect(order[1]).toBeLessThan(order[2])
})

test('both profile heads are equally tall', async ({ page }, info) => {
  test.skip(info.project.name === 'phone', 'tiles stack on phones')
  await page.goto('/oberstufe')
  const heads = page.locator('section#alltag [data-profile] [data-profile-head]')
  const [a, b] = await Promise.all([heads.nth(0).boundingBox(), heads.nth(1).boundingBox()])
  expect(Math.abs(a!.height - b!.height)).toBeLessThan(2)
})

test('each Oberstufe profile links its flyer with a preview', async ({ page, request }) => {
  await page.goto('/oberstufe')
  for (const [name, file] of [['Fair Play', 'flyer-fair-play.pdf'], ['Mein Start-Up', 'flyer-mein-start-up.pdf']]) {
    const link = page.locator('section#alltag [data-profile]', { hasText: name }).locator('[data-profile-flyer]')
    await expect(link).toHaveAttribute('href', `/downloads/oberstufe/${file}`)
    await expect(link.locator('img')).toBeVisible()
    expect((await request.get(`/downloads/oberstufe/${file}`)).headers()['content-type']).toContain('pdf')
  }
  await page.goto('/bildungswege')
  await expect(page.locator('[data-profile-flyer]')).toHaveCount(0)
})

test('"Fächer in der Vorstufe" stands as a plain heading, without an icon', async ({ page }) => {
  await page.goto('/oberstufe')
  const box = page.locator('[data-vorstufe-faecher]')
  await expect(box.locator('h4')).toHaveText('Fächer in der Vorstufe')
  await expect(box.locator('h4').locator('xpath=preceding-sibling::*')).toHaveCount(0)
})
