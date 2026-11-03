import { expect, test, type Locator } from '@playwright/test'

// Number of text lines an element's content is laid out on.
const lines = (el: Locator) =>
  el.evaluate((n) => {
    const r = document.createRange()
    r.selectNodeContents(n)
    return new Set([...r.getClientRects()].map((c) => Math.round(c.top))).size
  })

for (const width of [768, 1024, 1280]) {
  test(`contact ribbon keeps the phone number on one line at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const phone = page.locator('#kontakt div.bg-surface-ink a[href^="tel:"]')
    await expect(phone).toBeVisible()
    expect(await lines(phone)).toBe(1)
    // …and is not covered by the yellow button.
    const p = (await phone.boundingBox())!
    const b = (await page.locator('#kontakt div.bg-surface-ink [data-mail-topic-menu] button', { hasText: 'Kontakt aufnehmen' }).boundingBox())!
    const overlaps = p.x < b.x + b.width && b.x < p.x + p.width && p.y < b.y + b.height && b.y < p.y + p.height
    expect(overlaps).toBe(false)
  })
}

for (const width of [360, 390]) {
  test(`Jahresplan tabs share one row at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/mittelstufe')
    const tabs = page.locator('#jahresplan [role="tab"]')
    await expect(tabs).toHaveCount(3)
    const tops = await tabs.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)))
    expect(new Set(tops).size).toBe(1)
    for (const tab of await tabs.all()) expect(await lines(tab)).toBe(1)
  })
}
