import { expect, test } from '@playwright/test'

test('the Fristen use the date rows from Termine instead of the old calendar sheets', async ({ page }) => {
  await page.goto('/anmeldung#ablauf')
  const fristen = page.locator('#ablauf [data-deadline-row]')
  await expect(fristen).toHaveCount(3)
  await expect(page.locator('#ablauf [data-deadline-window]')).toHaveCount(0)
  // every Stufe shows its windows as date rows, a running window as banner, or "Termine folgen"
  for (const row of await fristen.all()) {
    const shown = (await row.locator('[data-date-row], [data-open-registration]').count()) + (await row.getByText('Termine folgen').count())
    expect(shown).toBeGreaterThan(0)
  }
  for (const day of await page.locator('#ablauf [data-date-row] [data-calendar-day]').all()) await expect(day).toHaveText(/^\d{1,2}$/)
})

test('a registration that runs today is a banner in its Stufe, linking to that Stufe’s steps', async ({ page }) => {
  await page.goto('/anmeldung#ablauf')
  const banners = page.locator('#ablauf [data-deadline-row] [data-open-registration]')
  for (const banner of await banners.all()) {
    const slug = await banner.locator('xpath=ancestor::*[@data-deadline-row]').getAttribute('data-slug')
    await expect(banner.getByRole('link', { name: 'So melden Sie an' })).toHaveAttribute('href', `#${slug}-schritte`)
    await expect(banner.locator('[data-days-left]')).toBeVisible()
  }
})
