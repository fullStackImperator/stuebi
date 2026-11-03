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
    // Phones: the photo below the text, the band in two rows.
    const h1 = (await hero.getByRole('heading', { level: 1 }).boundingBox())!
    expect(photo.y).toBeGreaterThan(h1.y + h1.height)
    expect(rows).toBe(2)
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
