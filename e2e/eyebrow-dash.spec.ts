import { expect, test } from '@playwright/test'
import { setTheme } from './helpers'

// On the red page headers the eyebrow dash is white like the eyebrow text, in both themes.
for (const theme of ['light', 'dark'] as const) {
  for (const path of ['/anmeldung', '/mittelstufe']) {
    test(`${path} eyebrow dash is white (${theme})`, async ({ page }) => {
      await setTheme(page, theme)
      await page.goto(path)
      await expect(page.locator('main [data-eyebrow-dash]').first()).toHaveCSS('border-top-color', 'rgb(255, 255, 255)')
    })
  }
}
