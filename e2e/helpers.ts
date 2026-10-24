import type { Page } from '@playwright/test'

export const PAGES = ['/', '/bildungswege', '/anmeldung', '/vision', '/schwerpunkt', '/ganztag', '/termine', '/news']

/** Stores the next-themes preference before the page loads. */
export async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.addInitScript((t) => localStorage.setItem('theme', t), theme)
}

const LIGHT = ['rgb(255, 255, 255)', 'rgb(245, 240, 232)']

/** Elements inside `selector` whose own background is plain white or the light sand colour. */
export async function lightBackgroundsIn(page: Page, selector = 'main') {
  return page.locator(selector).evaluateAll(
    (roots, light) =>
      roots.flatMap((root) =>
        [root, ...root.querySelectorAll('*')]
          .filter((el) => light.includes(getComputedStyle(el).backgroundColor))
          .map((el) => `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}.${String(el.className).slice(0, 60)}`),
      ),
    LIGHT,
  )
}

/** Opens a main-menu section: the accordion in the phone menu, or the dropdown on desktop. */
export async function openMenuSection(page: Page, label: string) {
  const menuButton = page.getByRole('button', { name: 'Menü öffnen' })
  if (await menuButton.isVisible()) {
    await menuButton.click()
    await page.locator('header button.w-full', { hasText: label }).click()
  } else {
    await page.locator('header nav').getByRole('button', { name: label, exact: true }).hover()
  }
}
