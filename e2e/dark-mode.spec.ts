import { expect, test } from '@playwright/test'
import { lightBackgroundsIn, PAGES, setTheme } from './helpers'

for (const path of PAGES) {
  test(`no light backgrounds in dark mode: ${path}`, async ({ page }) => {
    await setTheme(page, 'dark')
    await page.goto(path)
    expect(await lightBackgroundsIn(page)).toEqual([])
  })
}

test('system dark preference applies', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/vision')
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(await lightBackgroundsIn(page)).toEqual([])
})

test('text on golden stays dark in dark mode', async ({ page }) => {
  await setTheme(page, 'dark')
  await page.goto('/')
  // every icon on a golden or mint tile, including the decorative hero badges
  const colors = await page.locator('main :is(.bg-golden, .bg-mint) > svg').evaluateAll((els) => els.map((el) => getComputedStyle(el).color))
  expect(colors.length).toBeGreaterThan(0)
  expect(new Set(colors)).toEqual(new Set(['rgb(26, 46, 61)'])) // #1a2e3d
})
