import { NotchCard } from '@/components/ui/notch-card'
import { stageHref, stages, type StageColor, type StageId } from '@/content/stufen'
import { cn } from '@/lib/utils'

const colorClass: Record<StageColor, string> = {
  golden: 'bg-golden text-on-bright',
  mint: 'bg-mint text-on-bright',
  accent: 'bg-accent text-white',
  primary: 'bg-primary text-white',
  // Dark navy would vanish on the dark-mode page, so it lightens there.
  'surface-ink': 'bg-surface-ink text-white dark:bg-white/20',
}

// The badge sits on the photo, so navy needs no dark-mode lightening there.
const badgeClass = (color: StageColor) => (color === 'surface-ink' ? 'bg-surface-ink text-white' : colorClass[color])

// One large photo tile per stage, linking to its page. Each tile carries the stage id, so old
// bookmarks like /bildungswege#vorschule still land on it.
export function StageTiles({ ids, variant }: { ids: StageId[]; variant: 'overview' | 'landing' }) {
  return (
    <div
      className={cn(
        'grid gap-x-5 gap-y-8',
        variant === 'overview' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-6',
      )}
    >
      {ids.map((id, i) => {
        const s = stages[id]
        // Landing: three tiles in the first row, two wider ones (the last is Ganztag) in the second.
        const wide = variant === 'landing' && i >= 3
        return (
          <NotchCard
            key={id}
            id={id}
            href={stageHref(id)}
            title={s.name}
            image={{ src: s.photo.src, alt: '', position: s.photo.objectPosition }}
            sizes={wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            aspect={wide ? 'aspect-[4/3] lg:aspect-[16/7]' : 'aspect-[4/3]'}
            tone={colorClass[s.color]}
            className={variant === 'landing' ? (i < 3 ? 'lg:col-span-2' : 'lg:col-span-3') : undefined}
            badge={
              <span className={cn('absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm', badgeClass(s.color))}>
                {s.grades}
              </span>
            }
          >
            {s.teaser}
          </NotchCard>
        )
      })}
    </div>
  )
}
