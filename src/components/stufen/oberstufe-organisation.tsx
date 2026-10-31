import type { LucideIcon } from 'lucide-react'
import { BookOpen, GraduationCap, UserRound } from 'lucide-react'
import type { Block } from '@/content/stufen'
import { cn } from '@/lib/utils'

type Segment = { label: string; start: 1 | 2; span: 1 | 2; tone: 'pre' | 'study' }
type Lane = { name: string; segments: Segment[]; years: 12 | 13 }

// The two routes from the content's intro: Gymnasialzweig with the Studienstufe in grades 11–12,
// Stadtteilschulzweig with the Vorstufe in 11 and the Studienstufe in 12–13.
const lanes: Lane[] = [
  { name: 'Gymnasialzweig', segments: [{ label: 'Studienstufe', start: 1, span: 2, tone: 'study' }], years: 12 },
  {
    name: 'Stadtteilschulzweig',
    segments: [
      { label: 'Vorstufe', start: 1, span: 1, tone: 'pre' },
      { label: 'Studienstufe', start: 2, span: 2, tone: 'study' },
    ],
    years: 13,
  },
]

// Literal class names so Tailwind picks them up.
const startClass = { 1: 'col-start-1', 2: 'col-start-2', 3: 'col-start-3', 4: 'col-start-4' } as const
const spanClass = { 1: 'col-span-1', 2: 'col-span-2' } as const
const toneClass = { pre: 'bg-golden text-on-bright', study: 'bg-primary text-primary-foreground' } as const

const icons: LucideIcon[] = [BookOpen, UserRound]

/** „So ist die Oberstufe organisiert“: both routes to the Abitur as lanes over grades 11–13, then the points. */
export function OberstufeOrganisation({ block, iconTile }: { block: Block; iconTile: string }) {
  return (
    <>
      <div className="rounded-3xl bg-surface p-5 shadow-sm ring-1 ring-foreground/5 sm:p-8 in-data-[tone=light]:bg-surface-sand">
        {/* Grade labels over the four columns (the fourth holds the Abitur marker). */}
        <div aria-hidden="true" className="mb-3 grid grid-cols-4 gap-2 text-xs font-semibold text-muted-foreground sm:ml-44 sm:text-sm">
          <span>Klasse 11</span>
          <span>Klasse 12</span>
          <span>Klasse 13</span>
        </div>
        <div className="flex flex-col gap-6 sm:gap-4">
          {lanes.map((lane) => (
            <div key={lane.name} data-abitur-path className="sm:flex sm:items-center">
              <p className="mb-2 font-bold text-foreground sm:mb-0 sm:w-44 sm:shrink-0">{lane.name}</p>
              <div className="grid flex-1 grid-cols-4 gap-2">
                {lane.segments.map((s) => (
                  <span
                    key={s.label}
                    className={cn(
                      'flex min-h-12 items-center rounded-2xl px-3 py-2 text-xs font-bold sm:px-4 sm:text-sm',
                      startClass[s.start],
                      spanClass[s.span],
                      toneClass[s.tone],
                    )}
                  >
                    {s.label}
                  </span>
                ))}
                <span className={cn('flex items-center gap-1.5 text-xs font-bold leading-tight text-primary sm:gap-2 sm:text-sm', startClass[lane.years === 12 ? 3 : 4])}>
                  <GraduationCap className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>
                    Abitur <span className="font-semibold text-muted-foreground">nach {lane.years} Jahren</span>
                  </span>
                </span>
              </div>
            </div>
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
