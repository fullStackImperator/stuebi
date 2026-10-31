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

test('Oberstufe shows requirements and the empty dates notice', async ({ page }) => {
  await page.goto('/oberstufe')
  await expect(page.locator('section#voraussetzungen')).toContainText('3,0')
  await expect(page.locator('section#anmeldung-stufe')).toContainText('Aktuell stehen keine Termine an')
})

test('Ganztag shows the day rhythm, example courses and no registration block', async ({ page }) => {
  await page.goto('/ganztag')
  await expect(page.locator('section#tagesrhythmus')).toContainText('Vertiefungsband')
  await expect(page.locator('section#kurse')).toContainText('Beispiele aus dem Schuljahr 2024/25')
  await expect(page.locator('section#mensa')).toContainText('Text folgt')
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
