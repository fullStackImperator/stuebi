import Image from 'next/image'
import { lastCellSpan, type BentoCell } from '@/lib/bento'
import { cn } from '@/lib/utils'

// Static class names for the stretched last tile (2 columns on phones, 4 from lg).
const phoneSpan: Record<number, string> = { 1: '', 2: 'col-span-2' }
const desktopSpan: Record<number, string> = { 1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4' }

/**
 * Mosaic of photos, fact tiles, point tiles and a quote (order from `bentoCells`).
 * Fact and point tiles take `tileColors` in turn; the quote takes `quoteColor`.
 * Rows grow with their text, and the last tile fills its row so the mosaic never ends with a gap.
 */
export function BentoGrid({ cells, tileColors, quoteColor }: { cells: BentoCell[]; tileColors: string[]; quoteColor: string }) {
  const lastSpan = cn(phoneSpan[lastCellSpan(cells, 2)], desktopSpan[lastCellSpan(cells, 4)])

  return (
    <div
      data-bento
      className="grid grid-flow-dense auto-rows-[minmax(9rem,auto)] grid-cols-2 gap-3 sm:auto-rows-[minmax(11rem,auto)] lg:grid-cols-4"
    >
      {cells.map((cell, i) => {
        const key = cell.kind === 'photo' ? cell.photo.src : `${cell.kind}-${i}`
        const span = i === cells.length - 1 ? lastSpan : undefined
        if (cell.kind === 'fact' || cell.kind === 'point') {
          const tileNo = cells.slice(0, i).filter((c) => c.kind === 'fact' || c.kind === 'point').length
          return <TextTile key={key} cell={cell} className={cn(tileColors[tileNo % tileColors.length], span)} />
        }
        if (cell.kind === 'quote')
          return (
            <figure key={key} data-bento-cell="quote" className={cn('col-span-2 flex flex-col justify-center rounded-2xl p-5 sm:p-7', quoteColor, span)}>
              <blockquote className="text-lg font-semibold italic leading-snug sm:text-2xl">{cell.quote.text}</blockquote>
              <figcaption className="mt-2 text-sm">{cell.quote.author}</figcaption>
            </figure>
          )
        const large = cell.size === 'large'
        return (
          <div key={key} data-bento-cell="photo" className={cn('relative overflow-hidden rounded-2xl bg-surface-ink', large && 'col-span-2 row-span-2', span)}>
            <Image
              src={cell.photo.src}
              alt={cell.photo.alt}
              fill
              sizes={large ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
              className="object-cover"
              style={{ objectPosition: cell.photo.objectPosition }}
            />
          </div>
        )
      })}
    </div>
  )
}

function TextTile({ cell, className }: { cell: Extract<BentoCell, { kind: 'fact' | 'point' }>; className: string }) {
  if (cell.kind === 'fact')
    return (
      <div data-bento-cell="fact" className={cn('flex flex-col justify-end rounded-2xl p-4 sm:p-5', className)}>
        <p lang="de" className="text-xl font-black leading-tight hyphens-auto sm:text-3xl">{cell.fact.value}</p>
        <p className="mt-1 text-xs leading-snug sm:text-sm">{cell.fact.label}</p>
      </div>
    )
  return (
    <div data-bento-cell="point" className={cn('col-span-2 flex flex-col justify-end rounded-2xl p-5 sm:p-6', className)}>
      <h3 lang="de" className="text-lg font-extrabold leading-tight hyphens-auto sm:text-xl">{cell.point.title}</h3>
      <p className="mt-2 text-sm leading-relaxed sm:text-base">{cell.point.text}</p>
    </div>
  )
}
