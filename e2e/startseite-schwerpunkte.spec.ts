import { expect, test } from '@playwright/test'
import { hideDevBadge } from './helpers'

test('start page shows one card per Schwerpunkt linking to its section', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#schulleben')
  for (const [id, title] of [['sport', 'Sportteams'], ['makerspace', 'Makerspace'], ['abgekocht', 'Abgekocht']]) {
    const card = section.locator(`a[href="/schwerpunkt#${id}"]`)
    await expect(card).toBeVisible()
    await expect(card).toContainText(title)
  }
})

test('the details moved to the Schwerpunkt page', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#schulleben')
  await expect(section.locator('ul li')).toHaveCount(0)
  await expect(section).not.toContainText('Dirk Nowitzki')
})

test('a card lands on its section below the fixed header', async ({ page }) => {
  await hideDevBadge(page)
  await page.goto('/')
  await page.locator('#schulleben a[href="/schwerpunkt#sport"]').click()
  await expect(page).toHaveURL(/\/schwerpunkt#sport$/)
  const header = (await page.locator('header').boundingBox())!
  await expect.poll(async () => (await page.locator('section#sport').boundingBox())!.y, { timeout: 5000 }).toBeGreaterThanOrEqual(header.y + header.height - 1)
})
