import { expect, test } from '@playwright/test'
import { existsSync, readFileSync } from 'fs'

// Checks the last production build: pages with CMS photo slots or dates must refresh, not stay frozen.
const manifest = '.next/prerender-manifest.json'

test('photo pages revalidate in the production build', () => {
  test.skip(!existsSync(manifest), 'run `npm run build` first')
  const routes = JSON.parse(readFileSync(manifest, 'utf8')).routes as Record<string, { initialRevalidateSeconds: number | false }>
  for (const path of ['/', '/bildungswege', '/vision', '/ganztag', '/schwerpunkt', '/vorschule', '/grundschule', '/mittelstufe', '/oberstufe', '/termine']) {
    const route = routes[path]
    // dynamic routes do not appear in the manifest; prerendered ones must have a revalidate time
    if (route) expect(route.initialRevalidateSeconds, path).toBe(60)
  }
})
