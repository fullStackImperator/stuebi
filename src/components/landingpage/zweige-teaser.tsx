import Link from 'next/link'
import { ArrowLeftRight, ArrowRight, ArrowUpDown } from 'lucide-react'
import { stages } from '@/content/stufen'
import { cn } from '@/lib/utils'

// The two branches from the Mittelstufe content, so the start page and /mittelstufe say the same.
const branches = stages.mittelstufe.everyday?.find((b) => b.id === 'zweige')?.points ?? []

// Navy and golden, as in the route map on /mittelstufe.
const tile = ['bg-primary text-primary-foreground', 'bg-golden text-on-bright']

/** Both routes to the Abitur at a glance: the years as large numbers, the switch between them in the middle. */
export function ZweigeTeaser() {
  return (
    <div data-zweige-teaser>
      <div className="relative grid gap-4 md:grid-cols-2">
        {branches.map((b, i) => (
          <div key={b.title} data-zweig-teaser className={cn('deco-tile rounded-3xl p-7 sm:p-9', tile[i])}>
            <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">{b.title}</h3>
            <p className="mt-5 flex items-baseline gap-3">
              <span data-years className="font-heading text-8xl font-black leading-[0.8] lining-nums sm:text-9xl">
                {b.figure?.match(/(\d+) Jahren/)?.[1]}
              </span>
              <span className="text-lg font-bold">Jahre</span>
            </p>
            <p className="mt-5 text-lg font-bold">{b.figure}</p>
            <p className="mt-1 leading-relaxed opacity-90 text-pretty">{b.text}</p>
          </div>
        ))}
        {/* The switch between both branches, in the gap between the tiles. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-surface bg-accent-strong text-white"
        >
          <ArrowLeftRight className="hidden h-5 w-5 md:block" />
          <ArrowUpDown className="h-5 w-5 md:hidden" />
        </span>
      </div>
      <div className="mt-6 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-lg text-muted-foreground text-pretty">
          Gemeinsam bis Klasse 6 – ein Wechsel ist jederzeit möglich,{' '}
          <strong className="text-foreground">ohne die Schule zu verlassen.</strong>
        </p>
        <Link
          href="/mittelstufe#zweige"
          className="group inline-flex shrink-0 items-center gap-2 font-semibold text-primary hover:underline dark:text-foreground"
        >
          Mehr zu den Bildungswegen
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
