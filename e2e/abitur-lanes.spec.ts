import { expect, test } from '@playwright/test'

// The three route charts (Bildungswege, Mittelstufe, Oberstufe) end each branch with the Abitur badge on the
// end of its last bar, so the Gymnasialzweig badge sits after Klasse 12 and not in the Klasse 13 column.
const charts: [string, string][] = [
  ['/bildungswege', '[data-weg-lanes]'],
  ['/mittelstufe', '[data-zweige-map]'],
  ['/oberstufe', '[data-oberstufe-lanes]'],
]

for (const [path, chart] of charts) {
  test(`${path}: the chart sits on the section and each Abitur badge sits on the end of its bar`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'desktop layout')
    await page.goto(path)
    const el = page.locator(chart)
    expect(await el.evaluate((e) => getComputedStyle(e).backgroundColor)).toBe('rgba(0, 0, 0, 0)')
    const offsets = await el.locator('[data-abitur]').evaluateAll((badges) =>
      badges.map((b) => {
        const circle = b.firstElementChild!.getBoundingClientRect()
        const bar = b.parentElement!.getBoundingClientRect()
        return Math.abs(circle.left + circle.width / 2 - bar.right)
      }),
    )
    expect(offsets).toHaveLength(2)
    for (const o of offsets) expect(o).toBeLessThan(3)
  })
}

test('the Oberstufe lanes show the years 11 to 13 and the Abitur at each end', async ({ page }) => {
  await page.goto('/oberstufe')
  const lanes = page.locator('[data-oberstufe-lanes]')
  await expect(lanes.locator('[data-grade]')).toHaveText(['11', '12', '13'])
  await expect(lanes.locator('[data-abitur]')).toHaveText([/Abitur\s*nach 12 Jahren/, /Abitur\s*nach 13 Jahren/])
})
