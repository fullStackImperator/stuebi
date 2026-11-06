import { expect, test } from '@playwright/test'

// The dates next to the registration: big day numbers, an open registration as a banner on top that jumps to the steps.
for (const path of ['/vorschule', '/grundschule', '/mittelstufe', '/oberstufe']) {
  test(`${path} lists its dates with big day numbers, an open registration only as the banner`, async ({ page }) => {
    await page.goto(path)
    const section = page.locator('section#anmeldung-stufe')
    const entries = section.locator('[data-date-row]')
    const banners = section.locator('[data-open-registration]')
    expect((await entries.count()) + (await banners.count())).toBeGreaterThan(0)

    for (const entry of await entries.all()) {
      await expect(entry.locator('[data-calendar-day]')).toHaveText(/^\d{1,2}$/)
    }
    for (const banner of await banners.all()) {
      await expect(banner.locator('[data-days-left]')).toHaveText(/Noch \d+ Tage?|letzte Tag/)
      // The window sits in the banner, not again in the list.
      const title = (await banner.locator('h4').textContent())!
      await expect(entries.filter({ has: page.getByRole('heading', { name: title, exact: true }) })).toHaveCount(0)
      const link = banner.getByRole('link', { name: 'So melden Sie an' })
      await expect(link).toHaveAttribute('href', '#anmeldung-schritte')
      await link.click()
      await expect(section.locator('#anmeldung-schritte')).toBeInViewport()
    }
  })
}

test('/anmeldung points each open registration at its own department’s steps', async ({ page }) => {
  await page.goto('/anmeldung')
  for (const banner of await page.locator('[data-open-registration]').all()) {
    const href = (await banner.getByRole('link', { name: 'So melden Sie an' }).getAttribute('href'))!
    await expect(page.locator(href)).toHaveCount(1)
  }
})
