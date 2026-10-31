import { existsSync } from 'node:fs'
import path from 'node:path'
import { expect, test } from '@playwright/test'
import { schwerpunktGalleryFallbacks } from '../src/lib/fallback-photos'
import { schwerpunktOrder } from '../src/content/schwerpunkte'

test('every Schwerpunkt has brochure photos for an empty CMS gallery', () => {
  for (const id of schwerpunktOrder) {
    const photos = schwerpunktGalleryFallbacks[id]
    expect(photos.length, id).toBeGreaterThanOrEqual(3)
    expect(photos.length, id).toBeLessThanOrEqual(6)
    for (const p of photos) {
      expect(p.src, id).toMatch(/^\/images\/fotos\//)
      expect(existsSync(path.join('public', p.src)), p.src).toBe(true)
      expect(p.alt.length, p.src).toBeGreaterThan(10)
    }
  }
})
