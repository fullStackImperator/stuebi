import { HeartHandshake, School, Users, UsersRound, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// One brand colour and one line icon per fact, in the order of the facts in src/content/vision.ts.
const look: { tile: string; icon: LucideIcon }[] = [
  { tile: 'bg-primary text-primary-foreground', icon: School },
  { tile: 'bg-mint text-on-bright', icon: Users },
  { tile: 'bg-golden text-on-bright', icon: UsersRound },
  { tile: 'bg-accent-strong text-white', icon: HeartHandshake },
]

/** The school in numbers as colour tiles on grid paper, each with a line icon. */
export function VisionFacts({ facts }: { facts: { value: string; label: string }[] }) {
  return (
    <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {facts.map((f, i) => {
        const { tile, icon: Icon } = look[i % look.length]
        return (
          // Label below the value visually, but first for screen readers.
          <div key={f.label} data-vision-fact className={cn('deco-tile flex min-h-40 flex-col-reverse justify-start rounded-2xl p-5 sm:p-6', tile)}>
            <dt className="mt-1 text-sm font-medium leading-snug opacity-90">{f.label}</dt>
            <dd className="text-3xl font-black leading-tight sm:text-4xl">{f.value}</dd>
            <Icon className="mb-auto h-8 w-8 self-end opacity-80" strokeWidth={1.75} aria-hidden="true" />
          </div>
        )
      })}
    </dl>
  )
}
