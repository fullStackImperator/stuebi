import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { stageHref, stages, type StageColor, type StageId } from '@/content/stufen'
import { cn } from '@/lib/utils'

const colorClass: Record<StageColor, { band: string; text: string }> = {
  golden: { band: 'bg-golden', text: 'text-on-bright' },
  mint: { band: 'bg-mint', text: 'text-on-bright' },
  accent: { band: 'bg-accent', text: 'text-white' },
  primary: { band: 'bg-primary', text: 'text-white' },
  // Dark navy would vanish on the dark-mode card, so it lightens there.
  'surface-ink': { band: 'bg-surface-ink dark:bg-white/20', text: 'text-white' },
}

// One large photo tile per stage, linking to its page. Each tile carries the stage id, so old
// bookmarks like /bildungswege#vorschule still land on it.
export function StageTiles({ ids, variant }: { ids: StageId[]; variant: 'overview' | 'landing' }) {
  return (
    <div
      className={cn(
        'grid gap-5',
        variant === 'overview' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-6',
      )}
    >
      {ids.map((id, i) => {
        const s = stages[id]
        const c = colorClass[s.color]
        // Landing: three tiles in the first row, two wider ones (the last is Ganztag) in the second.
        const span = variant === 'landing' ? (i < 3 ? 'lg:col-span-2' : 'lg:col-span-3') : ''
        return (
          <Link
            key={id}
            id={id}
            href={stageHref(id)}
            className={cn(
              'group scroll-mt-24 flex flex-col overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-md in-data-[tone=sand]:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
              span,
            )}
          >
            <div className={cn('relative w-full overflow-hidden', variant === 'landing' && i >= 3 ? 'aspect-[16/7]' : 'aspect-[4/3]')}>
              <Image
                src={s.photo.src}
                alt=""
                fill
                sizes={variant === 'landing' && i >= 3 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                style={{ objectPosition: s.photo.objectPosition }}
              />
              <span className={cn('absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm', c.band, c.text)}>
                {s.grades}
              </span>
            </div>
            <div className="flex flex-1 items-start justify-between gap-4 p-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold leading-tight text-foreground">{s.name}</h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">{s.teaser}</p>
              </div>
              <span
                aria-hidden="true"
                className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:-translate-y-0.5', c.band, c.text)}
              >
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
