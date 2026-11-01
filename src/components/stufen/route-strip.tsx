import { ChevronRight } from 'lucide-react'
import type { RouteStation } from '@/content/stufen'
import { cn } from '@/lib/utils'

/** A short route above a section, e.g. Kita → Vorschule → Klasse 1, with the page's own stage highlighted. */
export function RouteStrip({ stations, currentClass }: { stations: RouteStation[]; currentClass: string }) {
  return (
    <ol className="mb-8 flex flex-wrap items-center gap-1 sm:gap-3">
      {stations.map((s, i) => (
        <li key={s.label} className="flex items-center gap-1 sm:gap-3">
          <span
            data-route-station
            aria-current={s.current ? 'step' : undefined}
            className={cn(
              'flex flex-col rounded-2xl px-2.5 py-2 leading-tight sm:px-4',
              s.current ? cn(currentClass, 'shadow-sm') : 'bg-surface text-foreground ring-1 ring-foreground/10 in-data-[tone=light]:bg-surface-sand',
            )}
          >
            <span className="text-sm font-extrabold sm:text-base">{s.label}</span>
            {s.note && <span className={cn('text-[11px] sm:text-xs', !s.current && 'text-muted-foreground')}>{s.note}</span>}
          </span>
          {i < stations.length - 1 && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground sm:h-5 sm:w-5" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  )
}
