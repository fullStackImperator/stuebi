import { expect, test } from '@playwright/test'

const stagePages = ['/vorschule', '/grundschule', '/mittelstufe', '/oberstufe']

// Text on the left, the photo on the right half; the stages as one band of arrow legs at the photo's foot.
test('hero shows the stages as a band in the photo, linking to the stage pages', async ({ page, viewport }) => {
  await page.goto('/')
  const hero = page.locator('[data-hero]')
  await expect(hero.getByRole('heading', { level: 1 })).toContainText('Gemeinsam von der Vorschule bis zum Abitur.')
  const photo = (await hero.locator('[data-hero-photo]').boundingBox())!
  const legs = hero.locator('[data-hero-photo] nav a')
  await expect(legs).toHaveCount(4)
  expect(await legs.evaluateAll((els) => els.map((a) => a.getAttribute('href')))).toEqual(stagePages)

  const boxes = await Promise.all((await legs.all()).map(async (l) => (await l.boundingBox())!))
  for (const b of boxes) {
    expect(b.x).toBeGreaterThanOrEqual(photo.x - 1)
    expect(b.x + b.width).toBeLessThanOrEqual(photo.x + photo.width + 1)
    expect(b.y + b.height).toBeLessThanOrEqual(photo.y + photo.height + 1)
  }
  // No name or grade is cut off.
  const clipped = await legs.locator('span').evaluateAll((els) => els.filter((el) => el.scrollWidth > el.clientWidth + 1).length)
  expect(clipped).toBe(0)

  const rows = new Set(boxes.map((b) => Math.round(b.y))).size
  const width = viewport?.width ?? 0
  if (width >= 1024) {
    // The photo is the right half, the band one row.
    expect(photo.x).toBeGreaterThan(width * 0.45)
    expect(rows).toBe(1)
  } else {
    // Phones: below the text a narrow photo with the stages beside it as a route downwards, one leg per row.
    const h1 = (await hero.getByRole('heading', { level: 1 }).boundingBox())!
    expect(photo.y).toBeGreaterThan(h1.y + h1.height)
    expect(rows).toBe(4)
    for (let i = 1; i < boxes.length; i++) expect(boxes[i].y).toBeGreaterThan(boxes[i - 1].y)
    const img = (await hero.locator('[data-hero-photo] img').boundingBox())!
    for (const b of boxes) expect(b.x).toBeGreaterThanOrEqual(img.x + img.width)
    // Both buttons side by side.
    const [anmelden, kennenlernen] = await Promise.all(
      [hero.getByRole('link', { name: 'Kind anmelden' }), hero.getByRole('link', { name: 'Kennenlernen' })].map(async (l) => (await l.boundingBox())!),
    )
    expect(Math.abs(anmelden.y - kennenlernen.y)).toBeLessThan(1)
  }
})

// Between tablet and wide desktop the half-width photo is too narrow for one row; no leg may cut its text.
for (const width of [768, 1024, 1180, 1280]) {
  test(`hero band shows every stage name in full at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 })
    await page.goto('/')
    const spans = page.locator('[data-hero-photo] nav a span')
    await expect(spans).toHaveCount(8)
    expect(await spans.evaluateAll((els) => els.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent))).toEqual([])
  })
}

// Where the half-width photo breaks the band into two rows, the gap from one arrow's point to the next one's notch matches the gap between the rows.
for (const width of [1024]) {
  test(`hero band keeps even gaps between the arrows at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    const legs = page.locator('[data-hero-photo] nav a')
    const [a, b, c] = await Promise.all([0, 1, 2].map(async (i) => (await legs.nth(i).boundingBox())!))
    const notch = 16 // 1rem: how far the next leg's notch reaches in
    const across = b.x + notch - (a.x + a.width)
    const down = c.y - (a.y + a.height)
    expect(Math.abs(across - down)).toBeLessThanOrEqual(1)
  })
}

// Phones: the headline centred with room above it and before the buttons; from sm it stays left-aligned.
test('hero headline is centred on phones only', async ({ page, viewport }) => {
  await page.goto('/')
  const h1 = page.locator('[data-hero] h1')
  const align = await h1.evaluate((el) => getComputedStyle(el).textAlign)
  if ((viewport?.width ?? 0) < 640) {
    expect(align).toBe('center')
    const header = (await page.locator('header').first().boundingBox())!
    const title = (await h1.boundingBox())!
    const button = (await page.locator('[data-hero]').getByRole('link', { name: 'Kind anmelden' }).boundingBox())!
    expect(title.y - (header.y + header.height)).toBeGreaterThanOrEqual(54)
    expect(button.y - (title.y + title.height)).toBeGreaterThanOrEqual(36)
  } else {
    expect(align).not.toBe('center')
  }
})

test('the hero button "Kind anmelden" is in the school blue', async ({ page }) => {
  await page.goto('/')
  const button = page.locator('[data-hero]').getByRole('link', { name: 'Kind anmelden' })
  const [bg, primary] = await button.evaluate((el) => {
    const probe = document.createElement('span')
    probe.style.color = 'var(--color-primary)'
    document.body.append(probe)
    const p = getComputedStyle(probe).color
    probe.remove()
    return [getComputedStyle(el).backgroundColor, p]
  })
  expect(bg).toBe(primary)
})
