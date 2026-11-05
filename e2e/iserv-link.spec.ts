import { expect, test } from '@playwright/test'
import { openPhoneMenu } from './helpers'

const ISERV = 'https://stuebenhofer-weg.de/iserv/'

test('the header links to the IServ login in a new tab (desktop)', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop header')
  await page.goto('/')
  const link = page.locator(`header a[href="${ISERV}"]`)
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('target', '_blank')
})

test('the footer links to the IServ login', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator(`footer a[href="${ISERV}"]`)).toHaveAttribute('target', '_blank')
})

test('the phone menu links to the IServ login', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone menu')
  await page.goto('/')
  await openPhoneMenu(page)
  const link = page.locator(`[data-slot="drawer-content"] a[href="${ISERV}"]`)
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('target', '_blank')
})
