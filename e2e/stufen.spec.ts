import { expect, test } from '@playwright/test'

test('Vorschule page has every block and the Primarstufe registration', async ({ page }) => {
  const res = await page.goto('/vorschule')
  expect(res?.status()).toBe(200)
  await expect(page.locator('h1')).toContainText('Vorschule')
  for (const id of ['erwartet', 'alltag', 'foerderung', 'anmeldung-stufe', 'weiter'])
    await expect(page.locator(`section#${id}`)).toBeVisible()
  await expect(page.locator('section#berufsorientierung')).toHaveCount(0)
  await expect(page.locator('section#anmeldung-stufe')).toContainText('Primarstufe')
  await expect(page.locator('section#weiter a[href="/grundschule"]')).toBeVisible()
  await expect(page.locator('section#foerderung')).toContainText('beratungsdienst@stuebenhofer-weg.de')
})

for (const [path, dep, next] of [
  ['/grundschule', 'Primarstufe', '/mittelstufe'],
  ['/mittelstufe', 'Mittelstufe', '/oberstufe'],
  ['/oberstufe', 'Oberstufe', '/ganztag'],
] as const)
  test(`${path} renders with ${dep} registration`, async ({ page }) => {
    expect((await page.goto(path))?.status()).toBe(200)
    await expect(page.locator('section#anmeldung-stufe')).toContainText(dep)
    await expect(page.locator(`section#weiter a[href="${next}"]`)).toBeVisible()
  })

test('career orientation only on the Mittelstufe', async ({ page }) => {
  await page.goto('/grundschule')
  await expect(page.locator('section#berufsorientierung')).toHaveCount(0)
  await page.goto('/mittelstufe')
  await expect(page.locator('section#berufsorientierung')).toContainText('Praxislerntag')
  await page.goto('/oberstufe')
  await expect(page.locator('section#berufsorientierung')).toHaveCount(0)
})

test('Oberstufe shows requirements and its dates', async ({ page }) => {
  await page.goto('/oberstufe')
  await expect(page.locator('section#voraussetzungen')).toContainText('3,0')
  await expect(page.locator('section#anmeldung-stufe')).toContainText('Tag der offenen Tür – Winterfest')
})

test('Ganztag shows the day rhythm, the courses of the year and no registration block', async ({ page }) => {
  await page.goto('/ganztag')
  await expect(page.locator('section#tagesrhythmus')).toContainText('Vertiefungsband')
  await expect(page.locator('section#kurse')).toContainText('Schuljahr 2026/27')
  await expect(page.locator('section#betreuung')).toContainText('Text folgt')
  await expect(page.locator('section#anmeldung-stufe')).toHaveCount(0)
  await expect(page.locator('section#weiter')).toHaveCount(0)
})

test('Für Eltern links the five pages with large tiles', async ({ page }) => {
  await page.goto('/')
  const eltern = page.locator('section#eltern')
  for (const path of ['/vorschule', '/grundschule', '/mittelstufe', '/oberstufe', '/ganztag'])
    await expect(eltern.locator(`a[href="${path}"]`)).toBeVisible()
  await expect(eltern).toContainText('Konzept eine Klasse')
  await expect(eltern.locator('a[href="/anmeldung#ablauf"]')).toBeVisible()
  await expect(eltern.getByText('Gesunde Ernährung')).toHaveCount(0)
  const box = await eltern.locator('a[href="/vorschule"]').boundingBox()
  expect(box!.height).toBeGreaterThan(220)
})

test('Ganztag tile mark stays visible in dark mode', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
  await page.goto('/')
  const mark = page.locator('section#eltern a[href="/ganztag"] [data-notch-arrow]')
  const ratio = await mark.evaluate((el, cardEl) => {
    // Let a canvas resolve any CSS colour (oklab, alpha …) to RGB, blending the mark over the section.
    const ctx = document.createElement('canvas').getContext('2d')!
    const rgb = (colour: string) => {
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = getComputedStyle(cardEl!).backgroundColor
      ctx.fillRect(0, 0, 1, 1)
      ctx.fillStyle = colour
      ctx.fillRect(0, 0, 1, 1)
      return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3))
    }
    const lum = ([r, g, b]: number[]) =>
      [r, g, b]
        .map((v) => v / 255)
        .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
        .reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i], 0)
    const a = lum(rgb(getComputedStyle(el).backgroundColor))
    const b = lum(rgb(getComputedStyle(cardEl!).backgroundColor))
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  }, await page.locator('section#eltern').elementHandle())
  expect(ratio).toBeGreaterThanOrEqual(1.5)
})

test('Ganztag names its coordination as a contact', async ({ page }) => {
  await page.goto('/ganztag')
  await expect(page.locator('section#koordination')).toContainText('Ganztagskoordination')
})

test('Ganztag day rhythm reads as a timetable', async ({ page }) => {
  await page.goto('/ganztag')
  const rows = page.locator('section#tagesrhythmus [data-schedule] > li')
  // 8 entries of the day plus the end of school.
  await expect(rows).toHaveCount(9)
  await expect(rows.first()).toContainText('08:00–08:20')
  await expect(rows.first()).toContainText('TUT-Zeit')
  await expect(rows.nth(7)).toContainText('14:25–15:55')
  await expect(page.locator('section#tagesrhythmus [data-schedule-break]')).toHaveCount(3)
  // The timeline ends with the end of the school day.
  const end = page.locator('section#tagesrhythmus [data-schedule-end]')
  await expect(end).toContainText('15:55')
  await expect(end).toContainText('Schulschluss')
})

test('Ganztag day rhythm has a photo beside the timeline', async ({ page }, testInfo) => {
  await page.goto('/ganztag')
  const photo = page.locator('section#tagesrhythmus [data-schedule-photo]')
  await expect(photo).toBeVisible()
  // Only one photo in the section (the block photo is not repeated under the timeline).
  await expect(page.locator('section#tagesrhythmus img')).toHaveCount(1)
  if (testInfo.project.name === 'desktop') {
    const list = await page.locator('section#tagesrhythmus [data-schedule]').boundingBox()
    const box = await photo.boundingBox()
    expect(box!.x).toBeGreaterThan(list!.x + list!.width - 1)
  }
})

test('Ganztag courses: pick the Jahrgang, see its course days with partner and room', async ({ page }) => {
  await page.goto('/ganztag')
  const kurse = page.locator('section#kurse [data-course-picker]')
  await expect(kurse.locator('[data-grade-button]')).toHaveCount(7)
  await kurse.locator('[data-grade-button]', { hasText: /^7$/ }).click()
  await expect(kurse.locator('[data-grade-button]', { hasText: /^7$/ })).toHaveAttribute('aria-pressed', 'true')
  // Jahrgang 7: Monday 4th block and Thursday 3rd block.
  await expect(kurse.locator('[data-course-week] [data-day-active]')).toHaveText([/Mo.*4\. Block/, /Do.*3\. Block/])
  const days = kurse.locator('[data-course-day]')
  await expect(days).toHaveCount(2)
  await expect(days.first()).toContainText('Montag')
  await expect(days.first()).toContainText('14:25–15:55')
  await expect(days.first().locator('[data-course]')).toHaveCount(7)
  const homeround = days.first().locator('[data-course]', { hasText: 'Homeround' })
  await expect(homeround).toContainText('Jugendzentrum')
  await expect(homeround).toContainText('Karl-Arnold-Ring 9')
  await expect(days.first().locator('[data-course]', { hasText: 'Schach' })).toContainText('SV Wilhelmsburg')
  await expect(days.nth(1)).toContainText('12:00–13:25')
})

test('Ganztag courses name institutions, not the people leading them', async ({ page }) => {
  await page.goto('/ganztag')
  const kurse = page.locator('section#kurse')
  for (const g of ['4', '6', '7', '8', '9', '10']) {
    await kurse.locator('[data-grade-button]', { hasText: new RegExp(`^${g}$`) }).click()
    for (const name of ['Dolovac', 'Klassen', 'Schöbel', 'Maschmann', 'Bredendiek', 'Kindsvater', 'Celik', 'Bulut', 'Mangelsen'])
      await expect(kurse).not.toContainText(new RegExp(`\\b${name}\\b`))
  }
})

test('Ganztag courses: Thursday afternoon is the § 45 Förderung, also in the day rhythm', async ({ page }) => {
  await page.goto('/ganztag')
  await page.locator('section#kurse [data-grade-button]', { hasText: /^4$/ }).click()
  await expect(page.locator('section#kurse [data-course-week]')).toContainText('§ 45')
  await expect(page.locator('section#kurse [data-course-day]')).toHaveCount(1)
  await expect(page.locator('section#tagesrhythmus')).toContainText('§ 45')
})

test('Ganztag library marks its key facts', async ({ page }) => {
  await page.goto('/ganztag')
  const marks = page.locator('section#bibliothek mark')
  await expect(marks).toHaveText(['Kinderbibliothek', 'Jugendbibliothek'])
})

test('Ganztag lunch points to Abgekocht and ordering', async ({ page }) => {
  await page.goto('/ganztag')
  const mensa = page.locator('section#mensa')
  await expect(mensa.locator('a[href="/schwerpunkt#abgekocht"]')).toBeVisible()
  await expect(mensa.locator('a[href="https://mensahaus.de"]')).toBeVisible()
  await expect(mensa.locator('img')).toBeVisible()
  await expect(mensa).not.toContainText('Text folgt')
})

test('Ganztag shows the library photo and both coordinators', async ({ page }) => {
  await page.goto('/ganztag')
  await expect(page.locator('section#bibliothek img').first()).toBeVisible()
  const koordination = page.locator('section#koordination')
  await expect(koordination.locator('[data-contact-person]')).toHaveCount(2)
  await expect(koordination.locator('a[href="mailto:ganztag-sekundarstufe@stuebenhofer-weg.de"]')).toBeVisible()
  await expect(koordination.locator('a[href="mailto:ganztag-primarstufe@stuebenhofer-weg.de"]')).toBeVisible()
  await expect(koordination).toContainText('MR')
  await expect(koordination).not.toContainText('Text folgt')
})

test('Beratungsdienst email and phone can be tapped', async ({ page }) => {
  await page.goto('/grundschule')
  const box = page.locator('section#foerderung')
  await expect(box.locator('a[href="mailto:beratungsdienst@stuebenhofer-weg.de"]')).toBeVisible()
  await expect(box.locator('a[href="tel:+4940428761942"]')).toBeVisible()
})

test('Für Eltern tile photos keep one shape below large screens', async ({ page }) => {
  await page.setViewportSize({ width: 700, height: 900 })
  await page.goto('/')
  const ratios = await page
    .locator('section#eltern a[href^="/"] > div:first-child')
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect()).map((r) => +(r.width / r.height).toFixed(2)))
  expect(ratios.length).toBe(5)
  for (const r of ratios) expect(r).toBeCloseTo(4 / 3, 1)
})

test('Bildungswege: Oberstufe and Ganztag share the full width like on the landing page', async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) < 1024, 'desktop only')
  await page.goto('/bildungswege')
  const box = async (id: string) => (await page.locator(`a#${id}`).boundingBox())!
  const [vorschule, mittelstufe, oberstufe, ganztag] = await Promise.all(['vorschule', 'mittelstufe', 'oberstufe', 'ganztag'].map(box))
  expect(oberstufe.y).toBe(ganztag.y)
  expect(Math.abs(oberstufe.x - vorschule.x)).toBeLessThan(1)
  expect(Math.abs(ganztag.x + ganztag.width - (mittelstufe.x + mittelstufe.width))).toBeLessThan(1)
})
