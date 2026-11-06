import { ArrowDown, DoorOpen, Lightbulb, PartyPopper, Trophy, type LucideIcon } from 'lucide-react'
import type { YearEventKind, YearMonth } from '@/content/jahreslauf'
import { cn } from '@/lib/utils'

// Colour and symbol per kind: Sport pink, Feste golden, Lernen mint, neue Familien navy.
const kinds: Record<YearEventKind, { label: string; icon: LucideIcon; tile: string; tint: string; dot: string }> = {
  sport: { label: 'Sport', icon: Trophy, tile: 'bg-accent text-white', tint: 'bg-accent/10', dot: 'bg-accent' },
  fest: { label: 'Feste', icon: PartyPopper, tile: 'bg-golden text-on-bright', tint: 'bg-golden/25 dark:bg-golden/15', dot: 'bg-golden' },
  lernen: { label: 'Lernen und Projekte', icon: Lightbulb, tile: 'bg-mint text-on-bright', tint: 'bg-mint/15', dot: 'bg-mint' },
  neu: { label: 'Für neue Familien', icon: DoorOpen, tile: 'bg-primary text-white', tint: 'bg-primary/10 dark:bg-white/8', dot: 'bg-primary dark:bg-white/60' },
}

/**
 * Das Schuljahr als Zeitstrahl: je Monat eine Marke und die Ereignisse, die jedes Jahr wiederkommen.
 * Auf großen Bildschirmen steht die Legende links und bleibt beim Scrollen stehen.
 */
export function YearRound({ months }: { months: YearMonth[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
      <aside className="self-start lg:sticky lg:top-28">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground lg:flex-col">
          {Object.values(kinds).map((k) => (
            <li key={k.label} className="flex items-center gap-2">
              <span className={cn('h-2.5 w-2.5 rounded-full', k.dot)} aria-hidden="true" />
              {k.label}
            </li>
          ))}
        </ul>
        <a
          href="#schulkalender"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline dark:text-foreground"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
          Die genauen Tage stehen im Schulkalender
        </a>
      </aside>

      <ol className="relative before:absolute before:inset-y-2 before:left-[21px] before:w-0.5 before:bg-border sm:before:left-[27px]">
        {months.map((m) => (
          <li key={m.month} data-year-month className="relative pb-8 pl-16 last:pb-0 sm:pl-20">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-ink text-xs font-black text-white sm:h-14 sm:w-14 sm:text-sm dark:bg-white/10"
            >
              {m.month.slice(0, 3)}
            </span>
            <h3 className="pt-2.5 text-lg font-extrabold text-foreground sm:pt-3.5 sm:text-xl">{m.month}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {m.events.map((e) => {
                const k = kinds[e.kind]
                const Icon = k.icon
                return (
                  <li
                    key={e.name}
                    data-year-event
                    {...(e.highlight ? { 'data-highlight': '' } : {})}
                    className={cn('flex gap-3 rounded-2xl p-3', e.highlight ? 'bg-primary text-white sm:col-span-2' : cn(k.tint, 'text-foreground'))}
                  >
                    <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', e.highlight ? 'bg-white/20' : k.tile)}>
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-extrabold leading-tight">{e.name}</span>
                      <span className={cn('mt-0.5 block text-sm', e.highlight ? 'text-white/85' : 'text-muted-foreground')}>{e.text}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
