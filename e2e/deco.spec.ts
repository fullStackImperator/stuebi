import { expect, test } from '@playwright/test'

// Every page header carries its own line-art motif on the grid paper.
const motifs: [string, string][] = [
  ['/vision', 'kompass'],
  ['/bildungswege', 'weg'],
  ['/vorschule', 'drachen'],
  ['/grundschule', 'ranzen'],
  ['/mittelstufe', 'idee'],
  ['/oberstufe', 'abitur'],
  ['/ganztag', 'tag'],
  ['/schwerpunkt', 'flieger'],
  ['/termine', 'kalender'],
  ['/anmeldung', 'brief'],
]

for (const [path, motif] of motifs) {
  test(`${path} header shows the ${motif} motif`, async ({ page }) => {
    await page.goto(path)
    const header = page.locator('section[data-intro-color]')
    await expect(header).toHaveAttribute('data-motif', motif)
    const mask = await header.evaluate((el) => getComputedStyle(el, '::after').maskImage)
    expect(mask).toContain(`/deco/${motif === 'flieger' ? 'doodle' : motif}.svg`)
  })
}

test('on phones the motif stays above the heading', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone layout only')
  for (const [path] of motifs) {
    await page.goto(path)
    const header = page.locator('section[data-intro-color]')
    const { bottom, headingTop } = await header.evaluate((el) => {
      const after = getComputedStyle(el, '::after')
      // First mask layer is the motif: "<width>px auto" at "<x> <y>px" (x may be a calc); motifs are 320×220.
      const width = parseFloat(after.maskSize.split(',')[0])
      const top = parseFloat(after.maskPosition.split(',')[0].match(/(-?[\d.]+)px\s*$/)![1])
      const box = el.getBoundingClientRect()
      return { bottom: top + (width * 220) / 320, headingTop: el.querySelector('h1')!.getBoundingClientRect().top - box.top }
    })
    expect(bottom, path).toBeLessThan(headingTop)
  }
})
