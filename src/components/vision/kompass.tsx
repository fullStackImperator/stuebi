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

// A faint compass rose in the header-motif style: rings through the empty corners, ticks, the
// cardinal lines and short diagonals, with a star and a dotted arc as companions.
function Rose({ className }: { className?: string }) {
  return (
    <svg
      data-kompass-rose
      aria-hidden="true"
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('pointer-events-none absolute text-primary/15 dark:text-white/15', className)}
    >
      <circle cx="200" cy="200" r="188" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="150" strokeWidth="1" strokeDasharray="2 7" />
      <path d="M200.0 12.0L200.0 24.0 M248.7 18.4L247.1 24.2 M294.0 37.2L291.0 42.4 M332.9 67.1L324.5 75.5 M362.8 106.0L357.6 109.0 M381.6 151.3L375.8 152.9 M388.0 200.0L376.0 200.0 M381.6 248.7L375.8 247.1 M362.8 294.0L357.6 291.0 M332.9 332.9L324.5 324.5 M294.0 362.8L291.0 357.6 M248.7 381.6L247.1 375.8 M200.0 388.0L200.0 376.0 M151.3 381.6L152.9 375.8 M106.0 362.8L109.0 357.6 M67.1 332.9L75.5 324.5 M37.2 294.0L42.4 291.0 M18.4 248.7L24.2 247.1 M12.0 200.0L24.0 200.0 M18.4 151.3L24.2 152.9 M37.2 106.0L42.4 109.0 M67.1 67.1L75.5 75.5 M106.0 37.2L109.0 42.4 M151.3 18.4L152.9 24.2" strokeWidth="1.5" />
      <path d="M200 6V394M6 200H394" strokeWidth="1" />
      <path d="M200 200L262 138M200 200L138 138M200 200L262 262M200 200L138 262" strokeWidth="1" strokeDasharray="2 6" />
      <path d="M200 30 L214 200 L200 370 L186 200 Z M30 200 L200 186 L370 200 L200 214 Z" strokeWidth="1.5" />
      <path d="M344 34 l4 9 10 1 -8 6 2 10 -8 -5 -8 5 2 -10 -8 -6 10 -1 z" strokeWidth="1.5" />
      <path d="M318 62 C 300 70, 290 82, 284 98" strokeWidth="1.5" strokeDasharray="1 6" />
    </svg>
  )
}

/**
 * The Zielbild as a compass: the goal in the middle, the four things it means around it like the
 * points of a compass. On phones the goal comes first and the directions follow below it.
 */
export function Kompass({ goal, directions }: { goal: string; directions: KompassRichtung[] }) {
  return (
    <div className="relative grid gap-4 lg:grid-cols-3 lg:grid-rows-3 lg:gap-5">
      {/* The rose fills the corners around the cross of tiles (lg up); on phones it sits behind the goal. */}
      <Rose className="left-1/2 top-1/2 hidden h-[110%] -translate-x-1/2 -translate-y-1/2 lg:block" />
      <div data-kompass-ziel className="relative flex items-center justify-center py-6 lg:col-start-2 lg:row-start-2 lg:py-0">
        <Rose className="left-1/2 top-1/2 h-[125%] -translate-x-1/2 -translate-y-1/2 lg:hidden" />
        {/* Light centre with a golden bezel, like the face of a compass. */}
        <div className="relative flex aspect-square w-full max-w-[16rem] flex-col items-center justify-center rounded-full border-2 border-dashed border-golden bg-surface p-8 text-center text-primary shadow-md ring-4 ring-golden ring-offset-4 ring-offset-surface in-data-[tone=sand]:ring-offset-surface-sand dark:text-foreground">
          <Compass className="mb-3 h-9 w-9 text-accent-strong dark:text-accent" aria-hidden="true" />
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
