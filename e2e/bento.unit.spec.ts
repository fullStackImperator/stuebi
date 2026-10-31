import { expect, test } from '@playwright/test'
import { bentoCells } from '../src/lib/bento'
import type { Photo } from '../src/lib/photo'

const photo = (name: string): Photo => ({ src: `/${name}.jpg`, alt: name, width: 800, height: 600, objectPosition: '50% 50%' })
const facts = [
  { value: '1', label: 'eins' },
  { value: '2', label: 'zwei' },
  { value: '3', label: 'drei' },
]
const quote = { text: '„Zitat“', author: 'Jemand' }

const kinds = (cells: ReturnType<typeof bentoCells>) => cells.map((c) => (c.kind === 'photo' ? `photo:${c.size}` : c.kind))

test('without photos only facts and the quote remain', () => {
  const cells = bentoCells({ title: null, gallery: [], facts, quote })
  expect(cells.filter((c) => c.kind === 'photo')).toHaveLength(0)
  expect(cells.filter((c) => c.kind === 'fact')).toHaveLength(3)
  expect(cells.filter((c) => c.kind === 'quote')).toHaveLength(1)
})

test('the title photo becomes the large first tile', () => {
  const cells = bentoCells({ title: photo('titel'), gallery: [], facts, quote })
  expect(cells[0]).toEqual({ kind: 'photo', photo: photo('titel'), size: 'large' })
})

test('without a title photo the first gallery photo is large', () => {
  const cells = bentoCells({ title: null, gallery: [photo('a'), photo('b')], facts: [], quote: undefined })
  expect(cells).toEqual([
    { kind: 'photo', photo: photo('a'), size: 'large' },
    { kind: 'photo', photo: photo('b'), size: 'small' },
  ])
})

test('a title photo that is also in the gallery appears once', () => {
  const cells = bentoCells({ title: photo('a'), gallery: [photo('a'), photo('b'), photo('c'), photo('d')], facts: [], quote: undefined })
  const srcs = cells.flatMap((c) => (c.kind === 'photo' ? [c.photo.src] : []))
  expect(srcs).toEqual(['/a.jpg', '/b.jpg', '/c.jpg', '/d.jpg'])
})

test('facts and the quote are spread between the small photos', () => {
  const cells = bentoCells({ title: photo('t'), gallery: [photo('a'), photo('b'), photo('c'), photo('d')], facts, quote })
  expect(kinds(cells)).toEqual(['photo:large', 'fact', 'photo:small', 'quote', 'photo:small', 'fact', 'photo:small', 'fact', 'photo:small'])
})

test('the gallery is capped at six photos', () => {
  const gallery = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(photo)
  const cells = bentoCells({ title: photo('t'), gallery, facts: [], quote: undefined })
  expect(cells.filter((c) => c.kind === 'photo')).toHaveLength(7)
})

test('the last tile stretches so the last row has no gap', async () => {
  const { lastCellSpan } = await import('../src/lib/bento')
  // Large photo (2×2) + fact + quote (2 wide) + fact + fact = 9 cells
  const cells = bentoCells({ title: photo('t'), gallery: [], facts, quote })
  expect(lastCellSpan(cells, 4)).toBe(4)
  expect(lastCellSpan(cells, 2)).toBe(2)
})

test('a full last row keeps the tile at its own width', async () => {
  const { lastCellSpan } = await import('../src/lib/bento')
  // Large photo (4 cells) + 4 small photos = 8 cells
  const cells = bentoCells({ title: photo('t'), gallery: ['a', 'b', 'c', 'd'].map(photo), facts: [], quote: undefined })
  expect(lastCellSpan(cells, 4)).toBe(1)
  expect(lastCellSpan(cells, 2)).toBe(1)
  expect(lastCellSpan([], 4)).toBe(1)
})

const points = [
  { title: 'Eins', text: 'Erster Punkt' },
  { title: 'Zwei', text: 'Zweiter Punkt' },
  { title: 'Drei', text: 'Dritter Punkt' },
  { title: 'Vier', text: 'Vierter Punkt' },
]

test('points become wide tiles after the photos', () => {
  const cells = bentoCells({ title: photo('t'), gallery: [], facts: [], points })
  expect(kinds(cells)).toEqual(['photo:large', 'point', 'point', 'point', 'point'])
  expect(cells[1]).toEqual({ kind: 'point', point: points[0] })
})

test('a photo and four points fill the grid without a gap', async () => {
  const { lastCellSpan } = await import('../src/lib/bento')
  const cells = bentoCells({ title: photo('t'), gallery: [], facts: [], points })
  expect(lastCellSpan(cells, 4)).toBe(2)
  expect(lastCellSpan(cells, 2)).toBe(2)
})
