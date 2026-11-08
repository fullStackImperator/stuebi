import { expect, test } from '@playwright/test'

test('sitemap lists the static pages and published news', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  for (const path of ['/', '/mittelstufe', '/beratung', '/termine']) expect(xml).toContain(`<loc>https://stuebi-hamburg.de${path === '/' ? '' : path}</loc>`)
  expect(xml).toContain('https://stuebi-hamburg.de/news/wir-sind-1-klasse')
  expect(xml).not.toContain('/news/erferfe')
  expect(xml).not.toContain('/admin')
})

test('robots.txt blocks everything off the live domain', async ({ request }) => {
  const txt = await (await request.get('/robots.txt')).text()
  expect(txt).toMatch(/Disallow: \/\s*$/m)
  expect(txt).toContain('Sitemap: https://stuebi-hamburg.de/sitemap.xml')
})
