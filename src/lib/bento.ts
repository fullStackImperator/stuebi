import type { Fact } from '@/content/schwerpunkte'
import type { Photo } from '@/lib/photo'

type Quote = { text: string; author: string }
type Point = { title: string; text: string }

export type BentoCell =
  | { kind: 'photo'; photo: Photo; size: 'large' | 'small' }
  | { kind: 'fact'; fact: Fact }
  | { kind: 'quote'; quote: Quote }
  | { kind: 'point'; point: Point }

const MAX_GALLERY = 6

/**
 * Tile order for a Schwerpunkt mosaic: the title photo (or the first gallery photo) as the large
 * tile, then facts and the quote alternating with the smaller photos. Leftovers go at the end, so
 * a section with few photos is filled by facts instead of empty boxes. Points (title + text) are wide
 * tiles that follow the photos.
 */
export function bentoCells({
  title,
  gallery,
  facts,
  quote,
  points = [],
}: {
  title: Photo | null
  gallery: Photo[]
  facts: Fact[]
  quote?: Quote
  points?: Point[]
}): BentoCell[] {
  // The title photo may also have been added to the gallery; show it once.
  const rest = gallery.filter((p) => p.src !== title?.src).slice(0, MAX_GALLERY)
  const photos = title ? [title, ...rest] : rest

  const fillers: BentoCell[] = facts.map((fact) => ({ kind: 'fact', fact }))
  if (quote) fillers.splice(Math.min(1, fillers.length), 0, { kind: 'quote', quote })

  const cells: BentoCell[] = []
  photos.forEach((photo, i) => {
    if (i === 0) return cells.push({ kind: 'photo', photo, size: 'large' })
    const filler = fillers.shift()
    if (filler) cells.push(filler)
    cells.push({ kind: 'photo', photo, size: 'small' })
  })
  return [...cells, ...fillers, ...points.map((point): BentoCell => ({ kind: 'point', point }))]
}

const area = (cell: BentoCell) => (cell.kind === 'photo' ? (cell.size === 'large' ? 4 : 1) : cell.kind === 'fact' ? 1 : 2)
const width = (cell: BentoCell) => (cell.kind === 'quote' || cell.kind === 'point' || (cell.kind === 'photo' && cell.size === 'large') ? 2 : 1)

/** Column span for the last tile so it fills the rest of the last row in a grid with `columns` columns. */
export function lastCellSpan(cells: BentoCell[], columns: 2 | 4): number {
  const last = cells.at(-1)
  if (!last) return 1
  const rest = cells.reduce((sum, c) => sum + area(c), 0) % columns
  return Math.min(columns, width(last) + (rest === 0 ? 0 : columns - rest))
}
