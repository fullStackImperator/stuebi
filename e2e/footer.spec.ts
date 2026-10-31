import { expect, test } from '@playwright/test'

const footer = (page: import('@playwright/test').Page) => page.locator('footer').last()

test('footer content lines up with the sections above', async ({ page }) => {
  await page.goto('/')
  const section = (await page.locator('section#news > div').first().boundingBox())!
  const inner = (await footer(page).locator('> div').first().boundingBox())!
  expect(Math.abs(inner.x - section.x)).toBeLessThanOrEqual(1)
  expect(Math.abs(inner.width - section.width)).toBeLessThanOrEqual(1)
})

test('footer links Ganztag with the other stages', async ({ page }) => {
  await page.goto('/')
  await expect(footer(page).getByRole('navigation', { name: /Schulstufen/ }).locator('a[href="/ganztag"]')).toBeVisible()
})

test('footer link lists sit side by side on phones', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone layout')
  await page.goto('/')
  const navs = footer(page).getByRole('navigation')
  const a = (await navs.nth(0).boundingBox())!
  const b = (await navs.nth(1).boundingBox())!
  expect(Math.abs(a.y - b.y)).toBeLessThanOrEqual(1)
  expect(b.x).toBeGreaterThan(a.x + a.width - 1)
})
