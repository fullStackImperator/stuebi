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
  await page.goto('/bildungswege')
  const color = await page.locator('main .bg-golden svg').first().evaluate((el) => getComputedStyle(el).color)
  expect(color).toBe('rgb(26, 46, 61)') // #1a2e3d
})
