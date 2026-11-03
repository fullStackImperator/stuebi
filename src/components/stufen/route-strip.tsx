import type { RouteStation } from '@/content/stufen'
import { cn } from '@/lib/utils'

// Arrow-shaped legs: a point on the right, a notch on the left where the previous leg points in.
// Also used by the stage band in the landing page hero.
const ARROW = '1rem'
export const legShape = (first: boolean, last: boolean) =>
  `polygon(0 0, ${last ? '100%' : `calc(100% - ${ARROW})`} 0, 100% 50%, ${last ? '100%' : `calc(100% - ${ARROW})`} 100%, 0 100%${first ? '' : `, ${ARROW} 50%`})`

/**
 * A short route above a section, e.g. Kita → Vorschule → Klasse 1, as one band of arrow-shaped legs
 * across the full width: the page's own stage in its colour, the stage after it in that stage's colour.
 */
export function RouteStrip({ stations, currentClass, nextClass }: { stations: RouteStation[]; currentClass: string; nextClass: string }) {
  const current = stations.findIndex((s) => s.current)
  return (
    <ol data-route className="mb-10 flex">
      {stations.map((s, i) => {
        const first = i === 0
        const last = i === stations.length - 1
        return (
          <li
            key={s.label}
            data-route-station
            aria-current={s.current ? 'step' : undefined}
            className={cn(
              'flex min-h-20 min-w-0 flex-1 flex-col justify-center py-3 pr-6 leading-tight',
              first ? 'rounded-l-2xl pl-4 sm:pl-6' : '-ml-4 pl-8 sm:pl-10',
              last && 'rounded-r-2xl',
              s.current && 'grow-[1.4]',
              i < current ? 'bg-background text-foreground' : s.current ? currentClass : nextClass,
            )}
            style={{ clipPath: legShape(first, last), zIndex: stations.length - i }}
          >
            <span className={cn('font-extrabold', s.current ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl')}>{s.label}</span>
            {s.note && <span className="text-xs opacity-80 sm:text-sm">{s.note}</span>}
          </li>
        )
      })}
    </ol>
  )
}
