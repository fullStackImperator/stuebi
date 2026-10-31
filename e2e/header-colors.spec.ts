import { expect, test } from '@playwright/test'

// The desktop menu uses the same section colours as the phone drawer instead of light blue.
test.describe('desktop menu colours', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, 'desktop only')

  for (const [label, colour] of [
    ['Unsere Vision', 'rgb(38, 84, 124)'],
    ['Bildungswege', 'rgb(255, 209, 102)'],
    ['Schwerpunkt', 'rgb(6, 214, 160)'],
    ['Anmeldung & Kontakt', 'rgb(239, 71, 111)'],
  ] as const) {
    test(`${label} trigger and overview link take the section colour`, async ({ page }) => {
      await page.goto('/')
      const trigger = page.locator('header').getByRole('button', { name: label })
      await trigger.click()
      await expect(trigger).toHaveCSS('background-color', colour)
      await expect(page.locator('[data-nav-overview]').filter({ visible: true })).toHaveCSS('background-color', colour)
    })
  }
})
