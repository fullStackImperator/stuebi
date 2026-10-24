import { expect, test } from '@playwright/test'

test.describe('phone', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, 'phone only')

  test('action bar shows four actions', async ({ page }) => {
    await page.goto('/vision')
    const bar = page.locator('[data-action-bar]')
    await expect(bar).toBeVisible()
    await expect(bar.getByRole('button', { name: 'Anrufen' })).toBeVisible()
    await expect(bar.getByRole('link', { name: 'Anmeldung' })).toHaveAttribute('href', '/anmeldung#ablauf')
    await expect(bar.getByRole('link', { name: 'Termine' })).toHaveAttribute('href', '/termine')
    await expect(bar.getByRole('link', { name: 'News' })).toHaveAttribute('href', '/news')
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

  test('Anrufen panel closes on outside tap', async ({ page }) => {
    await page.goto('/')
    await page.locator('[data-action-bar]').getByRole('button', { name: 'Anrufen' }).click()
    await page.mouse.click(195, 300)
    await expect(page.locator('[data-action-bar] a[href="tel:+494042896660"]')).toBeHidden()
  })

  test('action bar hides while menu is open', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menü öffnen' }).click()
    await expect(page.locator('[data-action-bar]')).toBeHidden()
    await page.getByRole('button', { name: 'Menü schließen' }).click()
    await expect(page.locator('[data-action-bar]')).toBeVisible()
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

const PAGES = ['/', '/bildungswege', '/anmeldung', '/vision', '/schwerpunkt', '/ganztag', '/termine', '/news']

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
    await page.getByRole('button', { name: 'Menü öffnen' }).click()
    await page.locator('header button.w-full', { hasText: 'Bildungswege' }).click()
    const heights = await page.locator('header a[href^="/bildungswege"], header button.w-full').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height))
    expect(heights.length).toBeGreaterThan(5)
    for (const h of heights) expect(h).toBeGreaterThanOrEqual(44)
  })
})
