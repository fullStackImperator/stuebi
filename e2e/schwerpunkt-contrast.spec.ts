import { expect, test, type Page } from '@playwright/test'
import { setTheme } from './helpers'

/**
 * Text on the coloured Schwerpunkt surfaces must meet WCAG AA: 4.5:1, or 3:1 for large text
 * (≥ 24px, or ≥ 18.66px bold). Opacity on the text or its parents is blended in.
 */
async function lowContrastTexts(page: Page, selector: string) {
  return page.locator(selector).evaluateAll((roots) => {
    // Any CSS colour (rgb, oklab, color(srgb …)) → [r, g, b, a] with r/g/b 0–255 and a 0–1.
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!
    const parse = (c: string) => {
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = c
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
      return [r, g, b, a / 255]
    }
    const lum = ([r, g, b]: number[]) => {
      const ch = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
      return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
    }
    const bad: string[] = []
    for (const root of roots)
      for (const el of root.querySelectorAll('p, h2, h3, blockquote, figcaption, span')) {
        const own = [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent!.trim())
        const style = getComputedStyle(el)
        if (!own || style.position === 'absolute' || el.closest('[aria-hidden="true"]')) continue
        let opacity = 1
        let bgEl: Element | null = el
        while (bgEl && parse(getComputedStyle(bgEl).backgroundColor)[3] < 1) {
          opacity *= Number(getComputedStyle(bgEl).opacity)
          bgEl = bgEl.parentElement
        }
        if (!bgEl) continue
        opacity *= bgEl === el ? 1 : Number(getComputedStyle(bgEl).opacity)
        const bg = parse(getComputedStyle(bgEl).backgroundColor)
        const [r, g, b, a = 1] = parse(style.color)
        const alpha = a * opacity
        const fg = [r, g, b].map((v, i) => v * alpha + bg[i] * (1 - alpha))
        const [l1, l2] = [lum(fg), lum(bg)].sort((x, y) => y - x)
        const ratio = (l1 + 0.05) / (l2 + 0.05)
        const size = parseFloat(style.fontSize)
        const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700)
        if (ratio < (large ? 3 : 4.5)) bad.push(`${el.tagName.toLowerCase()} "${el.textContent!.trim().slice(0, 30)}" ${ratio.toFixed(2)}`)
      }
    return bad
  }, undefined)
}

for (const theme of ['light', 'dark'] as const)
  test(`Schwerpunkt colour surfaces have readable text (${theme})`, async ({ page }) => {
    await setTheme(page, theme)
    await page.goto('/schwerpunkt')
    expect(await lowContrastTexts(page, 'section#sport, section#makerspace, section#abgekocht')).toEqual([])
    await page.goto('/')
    expect(await lowContrastTexts(page, '#schulleben a[href^="/schwerpunkt#"]')).toEqual([])
  })
