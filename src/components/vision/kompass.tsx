import { Compass } from 'lucide-react'
import type { KompassRichtung } from '@/content/vision'
import { cn } from '@/lib/utils'

// Place and colour per direction: north on top, east right, south below, west left (from lg up).
const place: Record<KompassRichtung['direction'], { cell: string; tile: string; long: string }> = {
  N: { cell: 'lg:col-start-2 lg:row-start-1', tile: 'bg-primary text-primary-foreground', long: 'Norden' },
  O: { cell: 'lg:col-start-3 lg:row-start-2', tile: 'bg-mint text-on-bright', long: 'Osten' },
  S: { cell: 'lg:col-start-2 lg:row-start-3', tile: 'bg-golden text-on-bright', long: 'Süden' },
  W: { cell: 'lg:col-start-1 lg:row-start-2', tile: 'bg-accent-strong text-white', long: 'Westen' },
}

/**
 * The Zielbild as a compass: the goal in the middle, the four things it means around it like the
 * points of a compass. On phones the goal comes first and the directions follow below it.
 */
export function Kompass({ goal, directions }: { goal: string; directions: KompassRichtung[] }) {
  return (
    <div className="relative grid gap-4 lg:grid-cols-3 lg:grid-rows-3 lg:gap-5">
      {/* Compass lines behind the tiles, from lg up. */}
      <svg aria-hidden="true" viewBox="0 0 300 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full text-border lg:block">
        <path d="M150 0V300M0 150H300" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
      </svg>

      <div data-kompass-ziel className="relative flex items-center justify-center lg:col-start-2 lg:row-start-2">
        <div className="flex aspect-square w-full max-w-[16rem] flex-col items-center justify-center rounded-full bg-surface-ink p-8 text-center text-white shadow-lg ring-8 ring-surface in-data-[tone=sand]:ring-surface-sand dark:bg-white/10">
          <Compass className="mb-3 h-9 w-9 text-golden" aria-hidden="true" />
          <p className="font-quote text-xl italic leading-snug text-pretty">{goal}</p>
        </div>
      </div>

      {directions.map((d) => {
        const p = place[d.direction]
        return (
          <div key={d.direction} data-kompass-richtung className={cn('relative flex flex-col rounded-2xl p-6', p.tile, p.cell)}>
            <span aria-label={p.long} className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-sm font-black">
              {d.direction}
            </span>
            <h3 className="text-lg font-extrabold leading-tight">{d.title}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-90 text-pretty">{d.text}</p>
          </div>
        )
      })}
    </div>
  )
}
