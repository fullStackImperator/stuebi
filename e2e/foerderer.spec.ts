import { expect, test } from '@playwright/test'

test('„Bildungspartner werden“ opens an email to the school with a subject', async ({ page }) => {
  await page.goto('/')
  const button = page.locator('#foerderer').getByRole('link', { name: 'Bildungspartner werden' })
  const href = await button.getAttribute('href')
  expect(href).toMatch(/^mailto:stuebi@stuebenhofer-weg\.de\?subject=/)
  expect(decodeURIComponent(href!.split('subject=')[1])).toBe('Bildungspartnerschaft mit der Schule Stübenhofer Weg')
})
