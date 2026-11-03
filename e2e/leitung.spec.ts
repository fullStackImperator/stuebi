import { expect, test } from '@playwright/test'

test('start page shows the head big, with deputy and didactic lead smaller beside him', async ({ page, viewport }) => {
  await page.goto('/')
  const leitung = page.locator('section#schulleitung')
  const people = leitung.locator('[data-leitung-person]')
  await expect(people).toHaveCount(3)
  await expect(people.nth(0)).toContainText('Matthias Herpe')
  await expect(people.nth(1)).toContainText('Stellv. Schulleiter')
  await expect(people.nth(2)).toContainText('Phoebe Lorenz')
  await expect(people.nth(2)).toContainText('Didaktische Leitung')
  for (const img of await leitung.locator('img').all()) await expect(img).toBeVisible()
  const [head, deputy, didactic] = await Promise.all([0, 1, 2].map(async (i) => (await people.nth(i).boundingBox())!))
  // The head is the big portrait; the other two share one size.
  expect(head.height).toBeGreaterThan(deputy.height * 1.5)
  expect(Math.abs(deputy.width - didactic.width)).toBeLessThan(1)
  if ((viewport?.width ?? 0) >= 1024) {
    // Stacked beside him, together as tall as his portrait.
    expect(deputy.x).toBeGreaterThan(head.x + head.width)
    expect(didactic.y).toBeGreaterThan(deputy.y + deputy.height - 1)
    expect(Math.abs(didactic.y + didactic.height - (head.y + head.height))).toBeLessThan(2)
  } else {
    // Below him, side by side.
    expect(deputy.y).toBeGreaterThan(head.y + head.height - 1)
    expect(Math.abs(deputy.y - didactic.y)).toBeLessThan(1)
  }
  await expect(leitung.locator('figcaption')).toContainText('Matthias Herpe')
})

test('Vision band shows no faces: the shelf of 3D printers while the CMS slot is empty', async ({ page }) => {
  await page.goto('/vision')
  await expect(page.locator('[data-photo-band] img')).toHaveAttribute('src', /makerspace-3d-regal/)
})

test('Vision names the didactic lead in the principles section', async ({ page }) => {
  await page.goto('/vision')
  const kompass = page.locator('section#prinzipien')
  await expect(kompass.locator('[data-contact-person]')).toContainText('Phoebe Lorenz')
  await expect(kompass).toContainText('Didaktische Leitung')
  await expect(kompass.locator('a[href="mailto:phoebe.lorenz@stuebenhofer-weg.de"]')).toBeVisible()
})
