import { expect, test } from '@playwright/test'
import { toPhoto } from '../src/lib/photo'
import type { Media } from '../src/payload-types'

test('toPhoto returns null for missing or unpopulated media', () => {
  expect(toPhoto(null)).toBeNull()
  expect(toPhoto(undefined)).toBeNull()
  expect(toPhoto(12)).toBeNull()
})

test('toPhoto prefers the large size and uses the focal point', () => {
  const p = toPhoto({
    id: 1,
    alt: 'Kinder im Makerspace',
    url: '/api/media/file/a.jpg',
    width: 4000,
    height: 3000,
    focalX: 30,
    focalY: 20,
    sizes: { large: { url: '/api/media/file/a-1920x1440.webp', width: 1920, height: 1440 } },
  } as Media)
  expect(p).toEqual({ src: '/api/media/file/a-1920x1440.webp', alt: 'Kinder im Makerspace', width: 1920, height: 1440, objectPosition: '30% 20%' })
})

test('toPhoto centers when no focal point', () => {
  expect(toPhoto({ id: 2, alt: 'x', url: '/a.jpg', width: 800, height: 600 } as Media)!.objectPosition).toBe('50% 50%')
})

test('toPhoto returns null when the file has no url', () => {
  expect(toPhoto({ id: 3, alt: 'x', url: null } as Media)).toBeNull()
})

test('toPhoto turns absolute media URLs into relative paths', () => {
  const p = toPhoto({ id: 4, alt: 'x', url: 'http://localhost:3000/api/media/file/a.jpg', width: 800, height: 600 } as Media)
  expect(p!.src).toBe('/api/media/file/a.jpg')
})
