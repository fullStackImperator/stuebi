import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Backpack, GraduationCap, Lightbulb, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

// Tracks: 1 = Vorschule, 2–14 = Klasse 1–13, 15 = the Abitur marker after Klasse 13.
// Lanes: both routes share the way up to Klasse 6, then split into the two branches.
type Lane = 'shared' | 'gym' | 'sts' | 'pins'
type Item = { from: number; to: number; lane: Lane }

// From lg up the lanes run left to right (grades as columns); below that top to bottom (grades as rows).
const deskRow: Record<Lane, string> = { shared: '2 / 4', gym: '2', sts: '3', pins: '4' }
// Pins only show from lg up; on phones the degrees sit inside their bar.
const mobileCol: Record<Lane, string> = { shared: '2 / 4', gym: '2', sts: '3', pins: '3' }

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
// On phones the tall cards also carry an icon and one line about the stage, and the degrees of a
// branch sit inside its bar (from lg up they hang below it, see `pins`).
type Segment = Item & {
  label: string
  note?: string
  tone: string
  href: string
  icon?: LucideIcon
  line?: string
  degrees?: { label: string; when: string }[]
}

const segments: Segment[] = [
  { from: 1, to: 1, lane: 'shared', label: 'Vorschule', tone: 'bg-golden text-on-bright', href: '/vorschule' },
  { from: 2, to: 5, lane: 'shared', label: 'Grundschule', note: 'Klasse 1–4', tone: 'bg-mint text-on-bright', href: '/grundschule', icon: Backpack, line: 'Lernzeiten statt Hausaufgaben, ein bewegtes Klassenzimmer' },
  { from: 6, to: 7, lane: 'shared', label: 'Beobachtungsstufe', note: 'Klasse 5–6', tone: 'bg-accent-strong text-white', href: '/mittelstufe', icon: Lightbulb, line: 'Erst gemeinsam ankommen, dann in Ruhe den passenden Weg finden' },
  { from: 8, to: 11, lane: 'gym', label: 'Gymnasialzweig', note: 'Klasse 7–10', tone: 'bg-accent-strong text-white', href: '/mittelstufe', icon: Lightbulb, line: 'Zügig zum Abitur nach 12 Jahren' },
  { from: 12, to: 13, lane: 'gym', label: 'Studienstufe', note: 'Klasse 11–12', tone: 'bg-primary text-primary-foreground', href: '/oberstufe', icon: GraduationCap, line: 'Profil Fair Play oder Mein Start-Up' },
  { from: 8, to: 11, lane: 'sts', label: 'Stadtteilschulzweig',
    note: 'Klasse 7–10',
    tone: 'bg-accent-strong text-white',
    href: '/mittelstufe',
    icon: Lightbulb,
    line: 'Ein Jahr mehr Zeit',
    degrees: [
      { label: 'ESA', when: 'nach Kl. 9' },
      { label: 'MSA', when: 'nach Kl. 10' },
    ],
  },
  { from: 12, to: 12, lane: 'sts', label: 'Vorstufe', note: 'Klasse 11', tone: 'bg-golden text-on-bright', href: '/oberstufe' },
  { from: 13, to: 14, lane: 'sts', label: 'Studienstufe', note: 'Klasse 12–13', tone: 'bg-primary text-primary-foreground', href: '/oberstufe', icon: GraduationCap, line: 'Profil Fair Play oder Mein Start-Up' },
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

// From lg up the short lines sit under the chart, each below its stage, with a rule in the stage colour.
const captions: { from: number; to: number; rule: string; text: ReactNode }[] = [
  { from: 2, to: 5, rule: 'bg-mint', text: 'Lernzeiten statt Hausaufgaben, ein bewegtes Klassenzimmer' },
  { from: 6, to: 7, rule: 'bg-accent', text: 'Erst gemeinsam ankommen, dann in Ruhe den passenden Weg finden' },
  {
    from: 8,
    to: 11,
    rule: 'bg-accent',
    text: (
      <>
        <strong className="font-bold text-foreground">Gymnasialzweig:</strong> zügig zum Abitur nach 12 Jahren.{' '}
        <strong className="font-bold text-foreground">Stadtteilschulzweig:</strong> ein Jahr mehr Zeit
      </>
    ),
  },
  { from: 12, to: 15, rule: 'bg-primary dark:bg-white/60', text: 'Profil Fair Play oder Mein Start-Up' },
]

const grades = ['VS', ...Array.from({ length: 13 }, (_, i) => String(i + 1))]

/** The whole way through the school on one chart: shared up to Klasse 6, then two branches with their degrees. */
export function WegLanes() {
  return (
    <figure data-weg-lanes className="mb-14">
      <figcaption className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground text-pretty">
        Bis Klasse 6 lernen alle gemeinsam. Ab Klasse 7 führen zwei Zweige zum Abitur – ein Wechsel ist jederzeit möglich, ohne die
        Schule zu verlassen.
      </figcaption>
      <div className="grid grid-cols-[2rem_minmax(0,1fr)_minmax(0,1fr)] auto-rows-[minmax(2.75rem,auto)] gap-1.5 lg:grid-cols-[repeat(15,minmax(0,1fr))] lg:auto-rows-auto lg:gap-x-1.5 lg:gap-y-2">
        {/* Large, light numerals as a scale, like the big numbers elsewhere on the site. */}
        {grades.map((g, i) => (
          <span
            key={g}
            data-grade
            aria-hidden="true"
            style={{ '--d-col': `${i + 1}`, '--d-row': '1', '--m-row': `${i + 1}`, '--m-col': '1' } as CSSProperties}
            className={cn(
              cell,
              'self-center font-heading text-xl font-black leading-none tabular-nums lining-nums text-foreground/20 lg:self-end lg:pb-1 lg:text-center lg:text-3xl dark:text-white/30',
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
              'flex min-w-0 flex-col justify-center rounded-xl py-2 max-lg:py-3 hyphens-auto break-words shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:min-h-16',
              s.from === s.to ? 'px-3 lg:px-2 lg:hyphens-none lg:break-normal' : 'px-3',
              s.icon && 'max-lg:justify-start',
              s.tone,
            )}
          >
            {s.icon && <s.icon data-segment-icon className="mb-3 h-6 w-6 opacity-90 lg:hidden" strokeWidth={1.75} aria-hidden="true" />}
            <span data-segment-label className={cn('text-[15px] font-bold leading-tight sm:text-base', s.from === s.to ? 'lg:text-[13px]' : 'lg:text-base')}>
              {s.label}
            </span>
            {s.note && <span className={cn('mt-0.5 text-[13px] leading-tight opacity-85', s.from === s.to && 'lg:text-[11px]')}>{s.note}</span>}
            {s.line && <span className="mt-2 text-[13px] leading-snug text-pretty opacity-95 hyphens-manual lg:hidden">{s.line}</span>}
            {s.degrees && (
              <span className="mt-3 flex flex-col items-start gap-1.5 lg:hidden">
                {s.degrees.map((d) => (
                  <span key={d.label} className="rounded-full bg-golden px-2.5 py-1 text-xs leading-tight text-on-bright">
                    <span className="font-black">{d.label}</span> {d.when}
                  </span>
                ))}
              </span>
            )}
            {s.icon && <ArrowRight className="mt-auto h-4 w-4 self-end pt-0 opacity-80 lg:hidden" aria-hidden="true" />}
          </Link>
        ))}

        {pins.map((p) => (
          <span key={p.label} style={place(p)} className={cn(cell, 'hidden lg:-mt-2 lg:flex lg:items-start lg:justify-end')}>
            {/* A short stem ties the badge to the end of its school year on the bar. */}
            <span className="relative rounded-full bg-golden px-2 py-0.5 text-xs font-black text-on-bright shadow-sm before:absolute before:bottom-full before:left-1/2 before:h-2 before:w-0.5 before:bg-golden">
              {p.label}
            </span>
          </span>
        ))}

        {abitur.map((a) => (
          <span key={a.years} data-abitur style={place(a)} className={cn(cell, 'flex flex-col items-center justify-center gap-1 text-center text-primary dark:text-foreground')}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-4 ring-primary/15 dark:bg-white/20 dark:text-white dark:ring-white/10">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-black leading-tight lg:text-xs">Abitur</span>
            <span className="sr-only">nach {a.years} Jahren</span>
          </span>
        ))}

        {captions.map((c) => (
          <p
            key={c.from}
            data-caption
            style={{ '--d-col': `${c.from} / ${c.to + 1}`, '--d-row': '5' } as CSSProperties}
            className="hidden pr-3 pt-4 text-sm leading-snug text-muted-foreground text-pretty lg:block lg:[grid-column:var(--d-col)] lg:[grid-row:var(--d-row)]"
          >
            <span className={cn('mb-2.5 block h-1 w-10 rounded-full', c.rule)} aria-hidden="true" />
            {c.text}
          </p>
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
