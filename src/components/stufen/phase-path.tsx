import { Check, GraduationCap } from 'lucide-react'
import type { Phase } from '@/content/stufen'
import { cn } from '@/lib/utils'

// The path's colour grows from mint through golden to the Mittelstufe pink (darker pink for white text).
const phaseColor = ['bg-mint text-on-bright', 'bg-golden text-on-bright', 'bg-accent-strong text-white']
// Grade number above the arrow and the checks in the list, in the same colour.
const numberColor = ['text-mint', 'text-golden', 'text-accent-strong dark:text-accent']
const checkColor = ['bg-mint/30 text-foreground', 'bg-golden/45 text-foreground', 'bg-accent/20 text-accent-strong dark:text-accent']

// „Klasse 5 und 6“ → „5–6“, „Klasse 8“ → „8“.
const gradeNumber = (grades: string) => grades.replace(/^Klassen?\s*/, '').replace(/\s*(und|bis|–|-)\s*/, '–')

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
            {/* Reads as "Klasse 5–6": the word small, the grades large in the phase colour. */}
            <p className="mb-3 flex items-end gap-2 md:pl-6">
              <span className="sr-only">{phase.grades}</span>
              <span aria-hidden="true" className="pb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Klasse
              </span>
              <span aria-hidden="true" className={cn('font-heading text-5xl font-black leading-[0.85] lining-nums', numberColor[i % numberColor.length])}>
                {gradeNumber(phase.grades)}
              </span>
            </p>
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
              <ul className="mt-5 space-y-2.5 border-t border-foreground/10 pt-5" aria-label={`Höhepunkte ${phase.grades}`}>
                {phase.tags.map((tag) => (
                  <li key={tag} data-phase-tag className="flex items-start gap-2.5 font-semibold leading-snug text-foreground">
                    <span className={cn('mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full', checkColor[i % checkColor.length])}>
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
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
