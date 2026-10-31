import { GraduationCap } from 'lucide-react'
import type { Phase } from '@/content/stufen'
import { cn } from '@/lib/utils'

// The path's colour grows from mint through golden to the Mittelstufe pink (darker pink for white text).
const phaseColor = ['bg-mint text-on-bright', 'bg-golden text-on-bright', 'bg-accent-strong text-white']

// From md the segments are arrows pointing to the next phase; the first has a flat start.
const arrow = 'md:[clip-path:polygon(0_0,calc(100%-18px)_0,100%_50%,calc(100%-18px)_100%,0_100%,18px_50%)]'
const firstArrow = 'md:[clip-path:polygon(0_0,calc(100%-18px)_0,100%_50%,calc(100%-18px)_100%,0_100%)]'

/** Phases of a stage as one path through the grades, each with its highlights as tags. */
export function PhasePath({ phases }: { phases: Phase[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-3 md:gap-1">
      {phases.map((phase, i) => {
        const last = i === phases.length - 1
        return (
          <li key={phase.grades} data-phase className="flex flex-col">
            <p className="mb-2 text-sm font-semibold text-muted-foreground md:pl-6">{phase.grades}</p>
            <div
              className={cn(
                'flex min-h-20 items-center justify-between gap-3 rounded-2xl px-5 py-4 md:rounded-none md:pl-8 md:pr-10',
                phaseColor[i % phaseColor.length],
                i === 0 ? cn(firstArrow, 'md:rounded-l-2xl md:pl-5') : arrow,
              )}
            >
              <h3 className="text-lg font-extrabold leading-tight sm:text-xl">{phase.title}</h3>
              {last && <GraduationCap className="h-7 w-7 shrink-0" aria-label="Abschluss" />}
            </div>
            <div className="mt-4 md:pl-6 md:pr-4">
              <p className="leading-relaxed text-foreground/85">{phase.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Höhepunkte ${phase.grades}`}>
                {phase.tags.map((tag) => (
                  <li
                    key={tag}
                    data-phase-tag
                    className="rounded-full bg-surface px-3 py-1 text-sm font-semibold text-foreground ring-1 ring-foreground/10 in-data-[tone=light]:bg-surface-sand"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
