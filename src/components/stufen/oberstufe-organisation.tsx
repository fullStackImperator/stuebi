import type { LucideIcon } from 'lucide-react'
import { BookOpen, GraduationCap, UserRound } from 'lucide-react'
import type { Block } from '@/content/stufen'
import { cn } from '@/lib/utils'

type Segment = { label: string; note: string; start: 1 | 2; span: 1 | 2; tone: 'pre' | 'study' }
type Lane = { name: string; segments: Segment[]; years: 12 | 13 }

// The two routes from the content's intro: Gymnasialzweig with the Studienstufe in grades 11–12,
// Stadtteilschulzweig with the Vorstufe in 11 and the Studienstufe in 12–13.
const lanes: Lane[] = [
  { name: 'Gymnasialzweig', segments: [{ label: 'Studienstufe', note: 'Klasse 11–12', start: 1, span: 2, tone: 'study' }], years: 12 },
  {
    name: 'Stadtteilschulzweig',
    segments: [
      { label: 'Vorstufe', note: 'Klasse 11', start: 1, span: 1, tone: 'pre' },
      { label: 'Studienstufe', note: 'Klasse 12–13', start: 2, span: 2, tone: 'study' },
    ],
    years: 13,
  },
]

// Grades 11–13, then a narrow column that only holds the Abitur label, so the bars get the width.
const columns = 'grid-cols-[repeat(3,minmax(0,1fr))_4.5rem]'

// Literal class names so Tailwind picks them up.
const startClass = { 1: 'col-start-1', 2: 'col-start-2', 3: 'col-start-3', 4: 'col-start-4' } as const
const spanClass = { 1: 'col-span-1', 2: 'col-span-2' } as const
const toneClass = { pre: 'bg-golden text-on-bright', study: 'bg-primary text-primary-foreground' } as const

// One line per stage under the lanes, with a rule in its colour (from the Oberstufe content).
const captions = [
  { rule: 'bg-golden', title: 'Vorstufe', text: 'Für Jugendliche mit MSA die Brücke in die Studienstufe – überwiegend im Klassenverband.' },
  { rule: 'bg-primary dark:bg-white/60', title: 'Studienstufe', text: 'Profil „Fair Play“ oder „Mein Start-Up“, dazu das Seminarfach.' },
]

const icons: LucideIcon[] = [BookOpen, UserRound]

/** „So ist die Oberstufe organisiert“: both routes to the Abitur as lanes over grades 11–13, then the points. */
export function OberstufeOrganisation({ block, iconTile }: { block: Block; iconTile: string }) {
  return (
    <>
      {/* The lanes sit on the section itself, with the large light year numbers used on Bildungswege. */}
      <div data-oberstufe-lanes>
        <div aria-hidden="true" className={cn('mb-3 grid gap-2 sm:ml-48', columns)}>
          {[11, 12, 13].map((g) => (
            <span key={g} data-grade className="text-center font-heading text-2xl font-black leading-none tabular-nums lining-nums text-foreground/20 sm:text-3xl dark:text-white/30">
              {g}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-6 sm:gap-3">
          {lanes.map((lane) => (
            <div key={lane.name} data-abitur-path className="sm:flex sm:items-center">
              <p className="mb-2 font-heading text-lg font-extrabold text-foreground sm:mb-0 sm:w-48 sm:shrink-0">{lane.name}</p>
              <div className={cn('grid flex-1 gap-2', columns)}>
                {lane.segments.map((s) => (
                  <span
                    key={s.label}
                    className={cn(
                      'relative flex min-h-16 flex-col justify-center rounded-xl py-2 shadow-sm',
                      s.span === 1 ? 'px-2 sm:px-4' : 'px-3 sm:px-4',
                      startClass[s.start],
                      spanClass[s.span],
                      toneClass[s.tone],
                    )}
                  >
                    <span data-segment-label className={cn('font-bold leading-tight', s.span === 1 ? 'text-[13px] sm:text-base' : 'text-[15px] sm:text-base')}>
                      {s.label}
                    </span>
                    <span className="mt-0.5 text-[12px] leading-tight opacity-85 sm:text-[13px]">{s.note}</span>
                    {/* The Abitur sits on the end of the last bar, where the branch ends. */}
                    {s.start + s.span - 1 === (lane.years === 12 ? 2 : 3) && s.tone === 'study' && (
                      <span data-abitur className="absolute left-full top-1/2 z-10 flex -translate-x-[18px] -translate-y-1/2 items-center gap-1.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-4 ring-surface-sand dark:bg-white/20 dark:text-white">
                          <GraduationCap className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-black leading-tight text-primary dark:text-foreground">
                          Abitur<span className="sr-only"> nach {lane.years} Jahren</span>
                        </span>
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:ml-48 sm:grid-cols-2">
          {captions.map((c) => (
            <p key={c.title} data-caption className="text-sm leading-snug text-muted-foreground text-pretty">
              <span className={cn('mb-2.5 block h-1 w-10 rounded-full', c.rule)} aria-hidden="true" />
              <strong className="font-bold text-foreground">{c.title}:</strong> {c.text}
            </p>
          ))}
        </div>
      </div>

      {block.points && (
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {block.points.map((p, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div key={p.title} className="flex gap-4">
                <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', iconTile)}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-tight text-foreground">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-foreground/80">{p.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
