import { expect, test } from '@playwright/test'
import { withCmsPhotos } from '../src/lib/cms-block-photos'
import type { Block } from '../src/content/stufen'

const own = { src: '/images/fotos/eigen.jpg', alt: 'Eigenes Foto der Schule', width: 800, height: 600, objectPosition: '50% 50%' }
const blocks: Block[] = [
  { id: 'tagesrhythmus', heading: 'Der Tagesrhythmus', photo: own, cmsPhoto: 'nachmittag' },
  { id: 'mensa', heading: 'Mittagessen', photo: own, cmsPhoto: 'mensa' },
  { id: 'kurse', heading: 'Kurse' },
]

test('a block uses the photo from its CMS slot when one is set', () => {
  const uploaded = { id: 1, url: '/api/media/file/mensa.jpg', alt: 'Die Mensa', width: 1600, height: 1200, focalX: 50, focalY: 30 }
  const result = withCmsPhotos(blocks, { mensa: uploaded } as never)
  expect(result[1].photo?.src).toBe('/api/media/file/mensa.jpg')
  expect(result[1].photo?.alt).toBe('Die Mensa')
})

test('an empty CMS slot keeps the school photo, blocks without a slot stay as they are', () => {
  const result = withCmsPhotos(blocks, {} as never)
  expect(result[0].photo).toEqual(own)
  expect(result[1].photo).toEqual(own)
  expect(result[2]).toEqual(blocks[2])
})
