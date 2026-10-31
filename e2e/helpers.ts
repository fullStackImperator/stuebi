import type { Page } from '@playwright/test'

export const PAGES = ['/', '/bildungswege', '/vorschule', '/grundschule', '/mittelstufe', '/oberstufe', '/anmeldung', '/vision', '/schwerpunkt', '/ganztag', '/termine', '/news']

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

/** Hides the Next.js dev badge; in `next dev` it sits on top of the action bar's corner tabs. */
export async function hideDevBadge(page: Page) {
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const style = document.createElement('style')
      style.textContent = 'nextjs-portal { display: none !important; }'
      document.head.append(style)
    })
  })
}

/** Opens the phone menu drawer from the action bar. */
export async function openPhoneMenu(page: Page) {
  await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' })
  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  await page.locator('[data-slot="drawer-popup"]').waitFor()
}

/** Opens a main-menu section: its tile in the phone menu drawer, or the dropdown on desktop. */
export async function openMenuSection(page: Page, label: string) {
  const menuButton = page.getByRole('button', { name: 'Menü öffnen' })
  if (await menuButton.isVisible()) {
    await openPhoneMenu(page)
    await page.locator('[data-slot="drawer-content"] button', { hasText: label }).click()
  } else {
    await page.locator('header nav').getByRole('button', { name: label, exact: true }).hover()
  }
}
