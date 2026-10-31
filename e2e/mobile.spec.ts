import { expect, test } from '@playwright/test'
import { hideDevBadge, openMenuSection, openPhoneMenu } from './helpers'

test.describe('phone', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, 'phone only')
  test.beforeEach(({ page }) => hideDevBadge(page))

  test('action bar shows its quick actions and the menu tab', async ({ page }) => {
    await page.goto('/vision')
    const bar = page.locator('[data-action-bar]')
    await expect(bar).toBeVisible()
    await expect(bar.getByRole('button', { name: 'Anrufen' })).toBeVisible()
    await expect(bar.getByRole('link', { name: 'Anmeldung' })).toHaveAttribute('href', '/anmeldung#ablauf')
    await expect(bar.getByRole('link', { name: 'Termine' })).toHaveAttribute('href', '/termine')
    await expect(bar.getByRole('link', { name: 'News' })).toHaveAttribute('href', '/news')
    await expect(bar.getByRole('button', { name: 'Menü öffnen' })).toBeVisible()
    for (const box of await bar.locator('a, button').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height)))
      expect(box).toBeGreaterThanOrEqual(44)
  })

  test('Anrufen offers both offices and closes on Escape', async ({ page }) => {
    await page.goto('/')
    const call = page.locator('[data-action-bar]').getByRole('button', { name: 'Anrufen' })
    await call.click()
    await expect(call).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('[data-action-bar] a[href="tel:+4940428761910"]')).toBeVisible()
    await expect(page.locator('[data-action-bar] a[href="tel:+494042896660"]')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('[data-action-bar] a[href="tel:+494042896660"]')).toBeHidden()
    await expect(call).toHaveAttribute('aria-expanded', 'false')
  })

  test('Anrufen panel is reachable with Tab', async ({ page }) => {
    await page.goto('/')
    await page.locator('[data-action-bar]').getByRole('button', { name: 'Anrufen' }).click()
    await page.keyboard.press('Tab')
    expect(await page.evaluate(() => document.activeElement?.getAttribute('href'))).toBe('tel:+4940428761910')
  })

  test('Anrufen panel closes on outside tap', async ({ page }) => {
    await page.goto('/')
    await page.locator('[data-action-bar]').getByRole('button', { name: 'Anrufen' }).click()
    await page.mouse.click(195, 300)
    await expect(page.locator('[data-action-bar] a[href="tel:+494042896660"]')).toBeHidden()
  })

  test('action bar stays visible and closes the menu', async ({ page }) => {
    await page.goto('/')
    await openPhoneMenu(page)
    await expect(page.locator('[data-action-bar]')).toBeVisible()
    // The open drawer hides the bar from the accessibility tree, so find the tab by its label.
    await page.locator('button[aria-label="Menü schließen"]').click()
    await expect(page.locator('[data-slot="drawer-popup"]')).toHaveCount(0)
  })

  test('tapping a drawer link navigates and closes the menu', async ({ page }) => {
    await page.goto('/')
    await openMenuSection(page, 'Ganztag')
    await page.locator('[data-slot="drawer-content"] a[href="/ganztag#mensa"]').click()
    await expect(page).toHaveURL(/\/ganztag#mensa$/)
    await expect(page.locator('[data-slot="drawer-popup"]')).toHaveCount(0)
  })

  test('action bar does not cover footer', async ({ page }) => {
    await page.goto('/ganztag')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    const bar = (await page.locator('[data-action-bar]').boundingBox())!
    const last = (await page.locator('footer a').last().boundingBox())!
    expect(last.y + last.height).toBeLessThanOrEqual(bar.y)
  })
})

test('action bar hidden on desktop', async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) < 1024, 'desktop only')
  await page.goto('/')
  await expect(page.locator('[data-action-bar]')).toBeHidden()
})

const PAGES = ['/', '/bildungswege', '/vorschule', '/grundschule', '/mittelstufe', '/oberstufe', '/anmeldung', '/vision', '/schwerpunkt', '/ganztag', '/termine', '/news']

test.describe('narrow phones', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, 'phone only')

  for (const path of PAGES)
    test(`no horizontal scroll at 360px: ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 780 })
      await page.goto(path)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360)
    })

  // Ruling: the hero keeps its photo on phones, so news starts just below the first screen.
  test('news starts within about 1.25 screens on phones', async ({ page }) => {
    await page.goto('/')
    const news = (await page.locator('#news').boundingBox())!
    expect(news.y).toBeLessThan(844 * 1.25)
  })

  test('next dates follow the news on the home page', async ({ page }) => {
    await page.goto('/')
    const strip = page.locator('section#naechste-termine')
    await expect(strip).toBeVisible()
    await expect(strip.locator('a[href="/termine"]').first()).toBeVisible()
    const news = (await page.locator('#news').boundingBox())!
    const box = (await strip.boundingBox())!
    expect(box.y).toBeGreaterThan(news.y)
  })

  test('mobile menu items are at least 44px high', async ({ page }) => {
    await page.goto('/')
    await openMenuSection(page, 'Bildungswege')
    const heights = await page.locator('[data-slot="drawer-content"] a, [data-slot="drawer-content"] button').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height))
    expect(heights.length).toBeGreaterThan(5)
    for (const h of heights) expect(h).toBeGreaterThanOrEqual(44)
  })
})
