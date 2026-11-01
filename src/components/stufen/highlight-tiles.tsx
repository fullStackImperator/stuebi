import type { Point } from '@/content/stufen'
import { cn } from '@/lib/utils'

// Logo colours with readable text: navy on mint and golden, white on the darker pink and navy.
const blockColors = ['bg-mint text-on-bright', 'bg-golden text-on-bright', 'bg-accent-strong text-white', 'bg-primary text-primary-foreground']

/**
 * Points as tiles, each with its own eye-catcher from the content: a number („3“), a short word as
 * letter blocks („WIKI“), children's questions as speech bubbles or the point's keywords as coloured tags.
 */
export function HighlightTiles({ points }: { points: Point[] }) {
  return (
    <div className={cn('grid gap-4', points.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
      {points.map((p) => (
        <div
          key={p.title}
          data-highlight-tile
          className="flex flex-col rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-foreground/5 sm:p-8 in-data-[tone=light]:bg-surface-sand"
        >
          {p.figure && <Figure value={p.figure} />}
          <h3 className="text-xl font-extrabold leading-tight text-foreground">{p.title}</h3>
          {p.questions && (
            // Speech bubbles with a corner pointing to the speaker, alternating sides.
            <ul className="mt-4 flex flex-col gap-2">
              {p.questions.map((q, i) => (
                <li
                  key={q}
                  data-tile-question
                  className={cn(
                    'w-fit max-w-full rounded-2xl px-4 py-2 text-sm font-semibold',
                    i % 2 === 0 ? 'rounded-bl-sm bg-golden text-on-bright' : 'self-end rounded-br-sm bg-mint text-on-bright',
                  )}
                >
                  {q}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 leading-relaxed text-foreground/80">{p.text}</p>
          {p.tags && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((tag, i) => (
                <li key={tag} data-tile-tag className={cn('rounded-full px-3 py-1 text-sm font-bold', blockColors[i % blockColors.length])}>
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

// Numbers stand large on their own; words become letter blocks, like children's alphabet blocks.
function Figure({ value }: { value: string }) {
  if (/^\d+$/.test(value))
    return (
      <p data-tile-figure className="mb-2 text-7xl font-black leading-none text-accent-strong dark:text-accent">
        {value}
      </p>
    )
  return (
    <p data-tile-letters aria-label={value} className="mb-4 flex gap-1.5">
      {[...value].map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn('flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-black', blockColors[i % blockColors.length], i % 2 === 1 ? 'rotate-3' : '-rotate-2')}
        >
          {letter}
        </span>
      ))}
    </p>
  )
}
