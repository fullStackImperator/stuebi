import { expect, test } from '@playwright/test'
import { robotsFor } from '../src/app/robots'
import { isLiveSite } from '../src/lib/site'

test('only the live domain counts as the live site', () => {
  expect(isLiveSite('https://stuebi-hamburg.de')).toBe(true)
  expect(isLiveSite('http://localhost:3000')).toBe(false)
  expect(isLiveSite(undefined)).toBe(false)
})

test('robots.txt lets crawlers in only on the live site', () => {
  const live = robotsFor(true)
  expect(live.rules).toEqual({ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] })
  expect(live.sitemap).toBe('https://stuebi-hamburg.de/sitemap.xml')
  const preview = robotsFor(false)
  expect(preview.rules).toEqual({ userAgent: '*', disallow: '/' })
  expect(preview.sitemap).toBe('https://stuebi-hamburg.de/sitemap.xml')
})
