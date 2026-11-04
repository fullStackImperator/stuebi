import { expect, test } from '@playwright/test'
import type { Department, Media } from '../src/payload-types'
import { profileFlyers } from '../src/lib/profile-flyers'

const media = (id: number, url: string, mimeType: string) => ({ id, url, mimeType, alt: '' }) as unknown as Media

test('without CMS flyers nothing is overridden', () => {
  expect(profileFlyers(null)).toEqual({})
  expect(profileFlyers({ profileFlyers: {} } as unknown as Department)).toEqual({})
})

test('a CMS flyer replaces the file, with its preview or without one', () => {
  const dep = {
    profileFlyers: {
      fairPlay: { file: media(1, '/api/media/file/fair.pdf', 'application/pdf'), preview: media(2, '/api/media/file/fair.png', 'image/png') },
      startUp: { file: media(3, '/api/media/file/start.pdf', 'application/pdf'), preview: null },
    },
  } as unknown as Department
  const f = profileFlyers(dep)
  expect(f.fairPlay).toEqual({ href: expect.stringMatching(/\/api\/media\/file\/fair\.pdf$/), preview: expect.stringMatching(/fair\.png$/) })
  expect(f.startUp).toEqual({ href: expect.stringMatching(/start\.pdf$/), preview: null })
})

test('a preview without a PDF is ignored', () => {
  const dep = { profileFlyers: { fairPlay: { file: null, preview: media(2, '/x.png', 'image/png') } } } as unknown as Department
  expect(profileFlyers(dep)).toEqual({})
})
