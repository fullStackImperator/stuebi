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
