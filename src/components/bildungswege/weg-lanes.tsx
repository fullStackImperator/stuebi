import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight, GraduationCap, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

// Tracks: 1 = Vorschule, 2–14 = Klasse 1–13, 15 = the Abitur marker after Klasse 13.
// Lanes: both routes share the way up to Klasse 6, then split into the two branches.
type Lane = 'shared' | 'gym' | 'sts' | 'pins' | 'ganztag'
type Item = { from: number; to: number; lane: Lane }

// From lg up the lanes run left to right (grades as columns); below that top to bottom (grades as rows).
const deskRow: Record<Lane, string> = { shared: '2 / 4', gym: '2', sts: '3', pins: '4', ganztag: '5' }
const mobileCol: Record<Lane, string> = { shared: '2 / 4', gym: '2', sts: '3', pins: '4', ganztag: '5' }

function place({ from, to, lane }: Item): CSSProperties {
  return {
    '--d-col': `${from} / ${to + 1}`,
    '--d-row': deskRow[lane],
    '--m-row': `${from} / ${to + 1}`,
    '--m-col': mobileCol[lane],
  } as CSSProperties
}

const cell = '[grid-column:var(--m-col)] [grid-row:var(--m-row)] lg:[grid-column:var(--d-col)] lg:[grid-row:var(--d-row)]'

// Each segment links to the page of its stage.
const segments: (Item & { label: string; note?: string; tone: string; href: string })[] = [
  { from: 1, to: 1, lane: 'shared', label: 'Vorschule', tone: 'bg-golden text-on-bright', href: '/vorschule' },
  { from: 2, to: 5, lane: 'shared', label: 'Grundschule', note: 'Klasse 1–4', tone: 'bg-mint text-on-bright', href: '/grundschule' },
  { from: 6, to: 7, lane: 'shared', label: 'Beobachtungsstufe', note: 'Klasse 5–6', tone: 'bg-accent-strong text-white', href: '/mittelstufe' },
  { from: 8, to: 11, lane: 'gym', label: 'Gymnasialzweig', note: 'Klasse 7–10', tone: 'bg-accent-strong text-white', href: '/mittelstufe' },
  { from: 12, to: 13, lane: 'gym', label: 'Studienstufe', note: 'Klasse 11–12', tone: 'bg-primary text-primary-foreground', href: '/oberstufe' },
  { from: 8, to: 11, lane: 'sts', label: 'Stadtteilschulzweig', note: 'Klasse 7–10', tone: 'bg-accent-strong text-white', href: '/mittelstufe' },
  { from: 12, to: 12, lane: 'sts', label: 'Vorstufe', note: 'Klasse 11', tone: 'bg-golden text-on-bright', href: '/oberstufe' },
  { from: 13, to: 14, lane: 'sts', label: 'Studienstufe', note: 'Klasse 12–13', tone: 'bg-primary text-primary-foreground', href: '/oberstufe' },
]

// Where a degree can be taken: after Klasse 9 and 10 on the Stadtteilschul branch, the Abitur at the end of each branch.
const pins: (Item & { label: string })[] = [
  { from: 10, to: 10, lane: 'pins', label: 'ESA' },
  { from: 11, to: 11, lane: 'pins', label: 'MSA' },
]
const abitur: (Item & { years: number })[] = [
  { from: 14, to: 14, lane: 'gym', years: 12 },
  { from: 15, to: 15, lane: 'sts', years: 13 },
]

const grades = ['VS', ...Array.from({ length: 13 }, (_, i) => String(i + 1))]

/** The whole way through the school on one chart: shared up to Klasse 6, then two branches with their degrees. */
export function WegLanes() {
  return (
    <figure data-weg-lanes className="mb-12 rounded-3xl bg-surface p-4 shadow-sm ring-1 ring-foreground/5 sm:p-8">
      <figcaption className="mb-6 max-w-2xl text-sm text-muted-foreground text-pretty">
        Bis Klasse 6 lernen alle gemeinsam. Ab Klasse 7 führen zwei Zweige zum Abitur – ein Wechsel ist jederzeit möglich, ohne die
        Schule zu verlassen.
      </figcaption>
      <div className="grid grid-cols-[2rem_minmax(0,1fr)_minmax(0,1fr)_2.5rem] auto-rows-[minmax(2.75rem,auto)] gap-1.5 lg:grid-cols-[repeat(15,minmax(0,1fr))] lg:auto-rows-auto lg:gap-x-1.5 lg:gap-y-2">
        {/* Large, light numerals as a scale, like the big numbers elsewhere on the site. */}
        {grades.map((g, i) => (
          <span
            key={g}
            data-grade
            aria-hidden="true"
            style={{ '--d-col': `${i + 1}`, '--d-row': '1', '--m-row': `${i + 1}`, '--m-col': '1' } as CSSProperties}
            className={cn(
              cell,
              'self-center font-heading text-xl font-black leading-none tabular-nums lining-nums text-foreground/20 lg:self-end lg:pb-1 lg:text-center lg:text-4xl dark:text-white/30',
            )}
          >
            {g}
          </span>
        ))}

        {segments.map((s) => (
          <Link
            key={`${s.lane}-${s.label}`}
            href={s.href}
            style={place(s)}
            className={cn(
              cell,
              'flex min-w-0 flex-col justify-center rounded-xl py-2 hyphens-auto break-words shadow-sm lg:hyphens-none lg:break-normal transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:min-h-14',
              s.from === s.to ? 'px-2' : 'px-3',
              s.tone,
            )}
          >
            <span className={cn('text-xs font-bold leading-tight sm:text-sm', s.from === s.to ? 'lg:text-[11px]' : 'lg:text-[13px]')}>{s.label}</span>
            {s.note && <span className="text-[11px] leading-tight opacity-85">{s.note}</span>}
          </Link>
        ))}

        {pins.map((p) => (
          <span key={p.label} style={place(p)} className={cn(cell, 'flex items-center justify-center lg:items-start lg:justify-end lg:-mt-2')}>
            {/* A short stem ties the badge to the end of its school year on the bar. */}
            <span className="relative rounded-full bg-golden px-2 py-0.5 text-xs font-black text-on-bright shadow-sm before:absolute before:right-full before:top-1/2 before:h-0.5 before:w-1.5 before:bg-golden lg:before:bottom-full lg:before:left-1/2 lg:before:right-auto lg:before:top-auto lg:before:h-2 lg:before:w-0.5">
              {p.label}
            </span>
          </span>
        ))}

        {abitur.map((a) => (
          <span key={a.years} style={place(a)} className={cn(cell, 'flex flex-col items-center justify-center gap-1 text-center text-primary dark:text-foreground')}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-4 ring-primary/15 dark:bg-white/20 dark:text-white dark:ring-white/10">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-black leading-tight">Abitur</span>
            <span className="sr-only">nach {a.years} Jahren</span>
          </span>
        ))}

      </div>
      {/* Ganztag as a proper tile: icon, what it is, and the way to its page. */}
      <Link
        href="/ganztag"
        className="deco-tile group mt-4 flex items-center gap-4 rounded-2xl bg-surface-ink px-4 py-3.5 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-white/15 sm:px-5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Sun className="h-5 w-5 text-golden" aria-hidden="true" />
        </span>
        <span className="text-pretty">
          <span className="block font-bold">Ganztag</span>
          <span className="block text-sm opacity-80">Unterricht, Lernzeiten, Mittagessen und Kurse – von der Vorschule bis Klasse 13</span>
        </span>
        <ArrowRight className="ml-auto h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </figure>
  )
}
