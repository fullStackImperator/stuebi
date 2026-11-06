import { expect, test } from '@playwright/test'

const TOPICS = ['Unterricht & IVK', 'Beratung', 'Förderung', 'Ganztag', 'Berufsorientierung']
const OFFICE = ['Susanne Oehlers', 'Judith Wagener', 'Anja Grube', 'Yadigar Bayrakdar', 'Iris Westphal']

test('below the department heads, /anmeldung lists further contacts by topic, without the Schulbüro', async ({ page }) => {
  await page.goto('/anmeldung')
  const block = page.locator('#ansprechpartner [data-topic-contacts]')
  await expect(block.getByRole('heading', { name: 'Weitere Ansprechpartner nach Thema' })).toBeVisible()
  await expect(block.locator('[data-topic] h4')).toHaveText(TOPICS)
  await expect(block.getByRole('link', { name: 'Mehr zur Beratung' })).toHaveAttribute('href', '/beratung')
  await expect(block.getByRole('link', { name: 'Mehr zum Ganztag' })).toHaveAttribute('href', '/ganztag#koordination')
  await expect(block).toContainText('Phoebe Lorenz')
  await expect(block.getByRole('link', { name: /marina\.merkina@/ })).toHaveAttribute('href', 'mailto:marina.merkina@stuebenhofer-weg.de')
  for (const name of OFFICE) await expect(block).not.toContainText(name)
})

test('people without a photo show their initials in a rectangle, so the missing photos are visible', async ({ page }) => {
  await page.goto('/anmeldung')
  const initials = page.locator('[data-topic-contacts] [data-initials]')
  await expect(initials).toHaveText(['FE', 'SK', 'SW', 'MR'])
  const box = await page.locator('[data-topic-contacts] [data-portrait]').first().boundingBox()
  expect(box!.height).toBeGreaterThan(box!.width)
})

test('the homepage keeps its contact block without the topics', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#kontakt')).toBeVisible()
  await expect(page.locator('[data-topic-contacts]')).toHaveCount(0)
})

test('the Schulbüro team spans the whole width, all five portraits the same size', async ({ page }) => {
  test.skip(page.viewportSize()!.width < 1024, 'one row only on desktop')
  await page.goto('/anmeldung')
  const team = page.locator('[data-office-team]')
  const teamBox = (await team.boundingBox())!
  const people = team.locator('li')
  await expect(people).toHaveCount(5)
  const boxes = await Promise.all((await people.all()).map((p) => p.boundingBox()))
  for (const b of boxes) expect(Math.abs(b!.width - boxes[0]!.width)).toBeLessThan(2)
  expect(boxes[0]!.y).toBeCloseTo(boxes[4]!.y, 0)
  expect(teamBox.x + teamBox.width - (boxes[4]!.x + boxes[4]!.width)).toBeLessThan(2)
})
