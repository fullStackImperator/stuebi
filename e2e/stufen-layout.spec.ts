import { expect, test } from '@playwright/test'

test('„Das erwartet Ihr Kind“ is a bento with one tile per point, no bullet list', async ({ page }) => {
  await page.goto('/grundschule')
  const erwartet = page.locator('section#erwartet')
  await expect(erwartet.locator('[data-bento] [data-bento-cell="point"]')).toHaveCount(4)
  await expect(erwartet.locator('[data-bento] [data-bento-cell="photo"] img')).toBeVisible()
  await expect(erwartet.locator('ul')).toHaveCount(0)
})

for (const path of ['/vorschule', '/grundschule', '/mittelstufe', '/oberstufe'])
  test(`Förderung & Beratung on ${path} has a photo and no card grid`, async ({ page }) => {
    await page.goto(path)
    const foerderung = page.locator('section#foerderung')
    await expect(foerderung.locator('[data-support-photo] img')).toBeVisible()
    await expect(foerderung).toContainText('Sprachförderung')
    await expect(foerderung.locator('a[href="mailto:beratungsdienst@stuebenhofer-weg.de"]')).toBeVisible()
    // Both contacts share one card at the end: Beratungsdienst and Förderkoordination.
    const contacts = foerderung.locator('[data-support-contacts]')
    await expect(contacts.locator('[data-beratungsdienst] a[href="tel:+4940428761942"]')).toBeVisible()
    await expect(contacts.locator('[data-foerderkoordination] [data-foerder-person]')).toHaveCount(3)
  })

for (const [path, people, office] of [
  ['/vorschule', ['Sebastian Otto'], 'tel:+494042896660'],
  ['/grundschule', ['Sebastian Otto'], 'tel:+494042896660'],
  ['/mittelstufe', ['Konrad Sens', 'Ljubica Sabadija'], 'tel:+4940428761910'],
  ['/oberstufe', ['Reikya Behrendt'], 'tel:+4940428761910'],
] as const)
  test(`Kontakt on ${path} shows the contact photo and the Schulbüro`, async ({ page }) => {
    await page.goto(path)
    const contact = page.locator('section#anmeldung-stufe [data-stage-contact]')
    for (const name of people) await expect(contact.locator('[data-contact-person]', { hasText: name }).locator('img')).toBeVisible()
    await expect(contact.locator(`[data-school-office] a[href="${office}"]`)).toBeVisible()
    await expect(contact.locator('[data-school-office] [data-mail-topic-menu] button', { hasText: 'schule-stuebenhofer-weg' })).toBeVisible()
    await expect(contact).not.toContainText('Wird ergänzt')
  })

test('Kontakt: heads as business cards in a row, beside the Schulbüro or above it', async ({ page }, info) => {
  test.skip(info.project.name === 'phone', 'side-by-side layout is desktop only')
  const box = async (path: string) => {
    await page.goto(path)
    const contact = page.locator('[data-stage-contact]')
    return {
      heads: await Promise.all((await contact.locator('[data-contact-person]').all()).map((el) => el.boundingBox())),
      office: await contact.locator('[data-school-office]').boundingBox(),
      radius: await contact.locator('[data-office-person] img').first().evaluate((img) => getComputedStyle(img.parentElement!).borderRadius),
    }
  }
  const vorschule = await box('/vorschule')
  expect(Math.abs(vorschule.heads[0]!.y - vorschule.office!.y)).toBeLessThan(2)
  expect(Math.abs(vorschule.heads[0]!.height - vorschule.office!.height)).toBeLessThan(2)
  expect(vorschule.radius).not.toBe('9999px')

  const mittelstufe = await box('/mittelstufe')
  expect(Math.abs(mittelstufe.heads[0]!.y - mittelstufe.heads[1]!.y)).toBeLessThan(2)
  expect(mittelstufe.office!.y).toBeGreaterThan(mittelstufe.heads[0]!.y + mittelstufe.heads[0]!.height)
})

test('Bildungswege lists the degrees as tiles', async ({ page }) => {
  await page.goto('/bildungswege')
  await expect(page.locator('section#abschluesse [data-degree]')).toHaveCount(3)
})

test('Oberstufe requirements are a checklist on a rail, not cards', async ({ page }) => {
  await page.goto('/oberstufe')
  const section = page.locator('section#voraussetzungen')
  const items = section.locator('[data-step-list] > li')
  await expect(items).toHaveCount(3)
  await expect(items.first().locator('[data-step-marker="check"]')).toBeVisible()
  await expect(items.first()).toContainText('Mittlerer Schulabschluss')
  await expect(section.locator('[data-info-card]')).toHaveCount(0)
})

test('Schwerpunkt „So läuft’s“ keeps numbered steps', async ({ page }) => {
  await page.goto('/schwerpunkt')
  await expect(page.locator('section#makerspace [data-step-list] [data-step-marker="number"]').first()).toHaveText('1')
})

test('Oberstufe requirements show the Abitur photo next to the checklist', async ({ page }) => {
  await page.goto('/oberstufe')
  const img = page.locator('section#voraussetzungen [data-requirements-photo] img')
  await expect(img).toBeVisible()
  await expect(img).toHaveAttribute('alt', /Abitur/)
})

test('Oberstufe shows both routes to the Abitur as lanes, not cards', async ({ page }) => {
  await page.goto('/oberstufe')
  const section = page.locator('section#alltag')
  const lanes = section.locator('[data-abitur-path]')
  await expect(lanes).toHaveCount(2)
  await expect(lanes.nth(0)).toContainText('Gymnasialzweig')
  await expect(lanes.nth(0)).toContainText('nach 12 Jahren')
  await expect(lanes.nth(1)).toContainText('Stadtteilschulzweig')
  await expect(lanes.nth(1)).toContainText('Vorstufe')
  await expect(lanes.nth(1)).toContainText('nach 13 Jahren')
  await expect(section.locator('[data-info-card]')).toHaveCount(0)
  await expect(section).toContainText('Fächer in der Vorstufe')
})

test('Mittelstufe Schulalltag is a path through three phases with highlight tags', async ({ page }) => {
  await page.goto('/mittelstufe')
  const section = page.locator('section#alltag')
  const phases = section.locator('[data-phase]')
  await expect(phases).toHaveCount(3)
  await expect(phases.nth(0)).toContainText('Klasse 5 und 6')
  await expect(phases.nth(1)).toContainText('Klasse 7 und 8')
  await expect(phases.nth(2)).toContainText('Klasse 9 und 10')
  await expect(phases.nth(0).locator('[data-phase-tag]', { hasText: 'Starterwoche' })).toBeVisible()
  await expect(phases.nth(2).locator('[data-phase-tag]', { hasText: 'Zeugnisübergabe' })).toBeVisible()
  await expect(section.locator('[data-info-card]')).toHaveCount(0)
})

test('Grundschule Schulalltag tiles each show their own highlight', async ({ page }) => {
  await page.goto('/grundschule')
  const section = page.locator('section#alltag')
  await expect(section.locator('[data-highlight-tile]')).toHaveCount(6)
  await expect(section.locator('[data-tile-figure]', { hasText: '3' })).toBeVisible()
  await expect(section.locator('[data-highlight-tile]', { hasText: 'Wissen für Kinder' }).locator('[data-tile-letters] span')).toHaveText(['W', 'I', 'K', 'I'])
  await expect(section.locator('[data-highlight-tile]', { hasText: 'Mehr Deutsch und Mathe' }).locator('[data-tile-letters] span')).toHaveText(['A', '+', '1'])
  await expect(section.locator('[data-highlight-tile]', { hasText: 'Ganztag' }).locator('[data-tile-card]')).toHaveText(['Sport', 'Musik', 'Handwerk', 'Kunst', 'Theater'])
  await expect(section.locator('[data-highlight-tile]', { hasText: 'Jahrgangsteam' }).locator('[data-tile-member]')).toHaveText([
    'Lehrkräfte',
    'Sozialpädagogik',
    'Erzieherinnen und Erzieher',
    'Schulbibliothek',
  ])
  // No tile is left with plain tags: every one has its own eye-catcher.
  await expect(section.locator('[data-tile-tag]')).toHaveCount(0)
  await expect(section.locator('[data-highlight-tile]', { hasText: 'Forschen und Denken' }).locator('[data-tile-card]')).toHaveText([
    'Mathematik-Olympiade',
    'Informatik-Biber',
    'Papierflieger-Wettbewerb',
  ])
  await expect(section.locator('[data-highlight-tile]', { hasText: 'Mehr Deutsch und Mathe' })).toContainText('digital')
  await expect(section.locator('[data-info-card]')).toHaveCount(0)
})

test('Vorschule Alltag shows the bridge from Kita to Klasse 1 and tiles with speech bubbles', async ({ page }) => {
  await page.goto('/vorschule')
  const section = page.locator('section#alltag')
  await expect(section.locator('[data-route-station]')).toHaveText([/Kita/, /Vorschule/, /Klasse 1/])
  await expect(section.locator('[data-route-station][aria-current="step"]')).toContainText('Vorschule')
  await expect(section.locator('[data-highlight-tile]')).toHaveCount(4)
  await expect(section.locator('[data-highlight-tile]', { hasText: 'Gemeinsam frühstücken' })).toContainText('kostenlosen Frühstück')
  await expect(section.locator('[data-tile-question]')).toHaveCount(3)
  await expect(section.locator('[data-highlight-tile]', { hasText: 'Sprechen lernen' }).locator('[data-tile-card]')).toHaveText([
    'Wünsche äußern',
    'Grenzen setzen',
    'Konflikte ruhig lösen',
  ])
  // Every tile has its own eye-catcher: the day as three stops, Klasse 1 as a block with ticks.
  await expect(section.locator('[data-highlight-tile]', { hasText: 'Gemeinsam frühstücken' }).locator('[data-tile-step]')).toHaveText([
    /Frühstück.*kostenlos/,
    /Mittagessen/,
    /Spiel und Spaß.*ganztägig/,
  ])
  const klasse1 = section.locator('[data-highlight-tile]', { hasText: 'Gut vorbereitet auf Klasse 1' })
  await expect(klasse1.locator('[data-tile-block]')).toHaveText('1')
  await expect(klasse1.locator('[data-tile-check]')).toHaveText(['Am selben Ort', 'Vertraute Menschen'])
})

test('Vorschule route is one band across the tiles, coloured by stage', async ({ page }) => {
  await page.goto('/vorschule')
  const section = page.locator('section#alltag')
  const route = (await section.locator('[data-route]').boundingBox())!
  const tiles = section.locator('[data-highlight-tile]')
  const first = (await tiles.first().boundingBox())!
  const last = (await tiles.last().boundingBox())!
  expect(Math.abs(route.x - first.x)).toBeLessThan(1)
  expect(Math.abs(route.x + route.width - Math.max(first.x + first.width, last.x + last.width))).toBeLessThan(1)
  const stations = section.locator('[data-route-station]')
  const tops = await stations.evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)))
  expect(new Set(tops).size).toBe(1)
  const bg = (i: number) => stations.nth(i).evaluate((e) => getComputedStyle(e).backgroundColor)
  expect(await bg(1)).toBe(await page.evaluate(() => { const d = document.createElement('div'); d.className = 'bg-golden'; document.body.append(d); return getComputedStyle(d).backgroundColor }))
  expect(await bg(2)).toBe(await page.evaluate(() => { const d = document.createElement('div'); d.className = 'bg-mint'; document.body.append(d); return getComputedStyle(d).backgroundColor }))
})

test('Vorschule „Das erwartet Ihr Kind“ names research and language from the start', async ({ page }) => {
  await page.goto('/vorschule')
  const erwartet = page.locator('section#erwartet')
  await expect(erwartet).toContainText('Forschen und Staunen')
  await expect(erwartet).toContainText('Haus der kleinen Forscher')
  await expect(erwartet).toContainText('Sprache von Anfang an')
  await expect(erwartet).toContainText('MITsprache')
})

test('Mittelstufe Klasse 5–6 lists the subject days, sports days and Girls’ and Boys’ Day', async ({ page }) => {
  await page.goto('/mittelstufe')
  const first = page.locator('section#alltag [data-phase]').first()
  for (const tag of ['Lese-, Mathe- und Kunsttage', 'Sport- und Lauftage', 'Girls’ und Boys’ Day'])
    await expect(first.locator('[data-phase-tag]', { hasText: tag })).toBeVisible()
})
