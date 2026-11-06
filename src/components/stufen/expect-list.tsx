import {
  BookOpen,
  Compass,
  Eye,
  House,
  Languages,
  Microscope,
  Milestone,
  NotebookPen,
  Palette,
  PersonStanding,
  Rabbit,
  Sparkles,
  Target,
  Users,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import { StagePhoto } from '@/components/photos/stage-photo'
import type { Point } from '@/content/stufen'
import type { ExpectIcon } from '@/content/stufen/types'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

const icons: Record<ExpectIcon, LucideIcon> = {
  miteinander: Users,
  kreativ: Palette,
  tiere: Rabbit,
  buch: BookOpen,
  lernzeit: NotebookPen,
  bewegung: PersonStanding,
  foerderung: Target,
  auswahl: Sparkles,
  beobachten: Eye,
  kompass: Compass,
  zuhause: House,
  bruecke: Milestone,
  sprachen: Languages,
  forschen: Microscope,
  essen: Utensils,
}

/**
 * „Das erwartet Ihr Kind“: the heading and a tall photo on the left, the points on the right as a numbered
 * list, each with a tilted symbol block in the page's tile colours. On phones photo first, then the list.
 */
export function ExpectList({ points, photo, colors }: { points: Point[]; photo: Photo | null; colors: string[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[5fr_6fr] lg:gap-12">
      <div>
        <h2 className="mb-8 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">Das erwartet Ihr Kind</h2>
        <div data-expect-photo>
          <StagePhoto photo={photo} className="lg:aspect-[4/5]" eager />
        </div>
      </div>
      <ol className="space-y-6 lg:pt-20">
        {points.map((p, i) => {
          const Icon = p.icon ? icons[p.icon] : Sparkles
          return (
            <li key={p.title} data-expect-point className={cn('flex gap-4 sm:gap-5', i > 0 && 'border-t border-border pt-6')}>
              <span
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-16 sm:w-16',
                  colors[i % colors.length],
                  i % 2 === 1 ? 'rotate-3' : '-rotate-2',
                )}
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p data-expect-no aria-hidden="true" className="text-xs font-black tracking-widest text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 lang="de" className="mt-0.5 text-lg font-extrabold leading-tight text-foreground hyphens-auto sm:text-xl">
                  {p.title}
                </h3>
                <p className="mt-2 leading-relaxed text-foreground/80">{p.text}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
