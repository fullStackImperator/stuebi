import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Step = { title?: string; text: string }

/**
 * Items on a rail in the section colour; the line stops at the last item. Numbers for a real
 * sequence (e.g. „So läuft’s“), check marks for requirements that all have to be met.
 */
export function StepList({
  steps,
  marker,
  markerClass,
  railClass,
}: {
  steps: Step[]
  marker: 'number' | 'check'
  /** Background and text colour of the round markers. */
  markerClass: string
  /** Colour of the connecting line. */
  railClass: string
}) {
  const List = marker === 'number' ? 'ol' : 'ul'
  return (
    <List data-step-list className="flex flex-col gap-6">
      {steps.map((step, i) => (
        <li key={step.title ?? step.text} className="relative flex gap-4">
          {i < steps.length - 1 && (
            <span aria-hidden="true" className={cn('absolute top-10 -bottom-5 left-[1.0625rem] w-0.5 rounded-full', railClass)} />
          )}
          <span
            aria-hidden="true"
            data-step-marker={marker}
            className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold', markerClass)}
          >
            {marker === 'number' ? i + 1 : <Check className="h-5 w-5" strokeWidth={3} />}
          </span>
          <div className="pt-1.5">
            {step.title && <h3 className="text-lg font-bold leading-snug text-foreground">{step.title}</h3>}
            <p className={cn('leading-relaxed text-foreground/85', step.title && 'mt-1')}>{step.text}</p>
          </div>
        </li>
      ))}
    </List>
  )
}
