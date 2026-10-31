import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Schwerpunkt, SchwerpunktColor } from '@/content/schwerpunkte'
import { bentoCells, lastCellSpan, type BentoCell } from '@/lib/bento'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

// Band and quote in the section colour; navy text on the light colours, as in the page headers.
const sectionColor: Record<SchwerpunktColor, { band: string; muted: string; dot: string; border: string }> = {
  accent: { band: 'bg-accent text-white', muted: 'text-white/90', dot: 'bg-accent', border: 'border-accent' },
  mint: { band: 'bg-mint text-on-bright', muted: 'text-on-bright/80', dot: 'bg-mint', border: 'border-mint' },
  golden: { band: 'bg-golden text-on-bright', muted: 'text-on-bright/80', dot: 'bg-golden', border: 'border-golden' },
}

// Static class names for the stretched last tile (2 columns on phones, 4 from lg).
const phoneSpan: Record<number, string> = { 1: '', 2: 'col-span-2' }
const desktopSpan: Record<number, string> = { 1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4' }

// Fact tiles take the other site colours so they stand out from the band.
const factColors: Record<SchwerpunktColor, string[]> = {
  accent: ['bg-golden text-on-bright', 'bg-mint text-on-bright', 'bg-surface-ink text-white dark:bg-white/15'],
  mint: ['bg-golden text-on-bright', 'bg-surface-ink text-white dark:bg-white/15', 'bg-primary text-primary-foreground'],
  golden: ['bg-mint text-on-bright', 'bg-surface-ink text-white dark:bg-white/15', 'bg-accent text-white'],
}

export function SchwerpunktFeature({ item, index, title, gallery }: { item: Schwerpunkt; index: number; title: Photo | null; gallery: Photo[] }) {
  const c = sectionColor[item.color]
  const Icon = item.icon
  const cells = bentoCells({ title, gallery, facts: item.facts, quote: item.quote })
  // Sections alternate light and sand, like the other subpages.
  const tone = index % 2 === 1 ? 'sand' : 'light'
  // The last tile fills the rest of its row, so the mosaic never ends with a gap.
  const lastSpan = cn(phoneSpan[lastCellSpan(cells, 2)], desktopSpan[lastCellSpan(cells, 4)])

  return (
    <section
      id={item.id}
      aria-labelledby={`${item.id}-title`}
      data-tone={tone}
      className={cn('scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20', tone === 'sand' ? 'bg-surface-sand' : 'bg-surface')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Colour band with title and intro */}
        <div className={cn('relative mb-4 overflow-hidden rounded-3xl p-7 sm:p-10', c.band)}>
          <Icon aria-hidden="true" className="absolute -right-4 -bottom-6 h-36 w-36 opacity-15 sm:h-44 sm:w-44" />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]">Schwerpunkt {index + 1}</p>
          <h2 id={`${item.id}-title`} className="mb-4 text-3xl font-extrabold leading-tight sm:text-5xl">
            {item.title}
          </h2>
          <p className={cn('relative max-w-3xl text-lg leading-relaxed text-pretty', c.muted)}>{item.intro}</p>
        </div>

        {/* Bento: photos mixed with fact tiles and the quote */}
        <div data-bento className="grid grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] lg:grid-cols-4">
          {cells.map((cell, i) => {
            const key = cell.kind === 'photo' ? cell.photo.src : `${cell.kind}-${i}`
            const span = i === cells.length - 1 ? lastSpan : undefined
            if (cell.kind === 'fact') {
              const factNo = cells.slice(0, i).filter((c) => c.kind === 'fact').length
              return <FactTile key={key} cell={cell} color={cn(factColors[item.color][factNo % 3], span)} />
            }
            return <BentoTile key={key} cell={cell} band={c.band} className={span} />
          })}
        </div>

        {/* Details */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <ul className="flex flex-col gap-3 lg:col-span-7">
            {item.points.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-foreground/85">
                <span aria-hidden="true" className={cn('mt-[0.55em] h-2 w-2 shrink-0 rounded-full', c.dot)} />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {item.howItWorks && (
              <div className={cn('rounded-3xl border-l-4 bg-surface-sand p-6 shadow-sm in-data-[tone=sand]:bg-surface', c.border)}>
                <h3 className="mb-3 text-lg font-bold text-foreground">So läuft’s</h3>
                <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.howItWorks.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
            {item.partners && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="font-semibold text-foreground">Partner:</strong> {item.partners}
              </p>
            )}
            {item.links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 font-semibold transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    c.band,
                  )}
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FactTile({ cell, color }: { cell: Extract<BentoCell, { kind: 'fact' }>; color: string }) {
  return (
    <div data-bento-cell="fact" className={cn('flex flex-col justify-end rounded-2xl p-4 sm:p-5', color)}>
      <p lang="de" className="text-xl font-black leading-tight hyphens-auto sm:text-3xl">{cell.fact.value}</p>
      <p className="mt-1 text-xs leading-snug opacity-85 sm:text-sm">{cell.fact.label}</p>
    </div>
  )
}

function BentoTile({ cell, band, className }: { cell: Exclude<BentoCell, { kind: 'fact' }>; band: string; className?: string }) {
  if (cell.kind === 'quote')
    return (
      <figure data-bento-cell="quote" className={cn('col-span-2 flex flex-col justify-center rounded-2xl p-5 sm:p-7', band, className)}>
        <blockquote className="text-lg font-semibold italic leading-snug sm:text-2xl">{cell.quote.text}</blockquote>
        <figcaption className="mt-2 text-sm opacity-80">{cell.quote.author}</figcaption>
      </figure>
    )
  const large = cell.size === 'large'
  return (
    <div data-bento-cell="photo" className={cn('relative overflow-hidden rounded-2xl bg-surface-ink', large && 'col-span-2 row-span-2', className)}>
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
}
