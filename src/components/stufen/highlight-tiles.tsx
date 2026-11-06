import {
  Binary,
  Blocks,
  BookOpen,
  Check,
  Croissant,
  Drama,
  GraduationCap,
  Hammer,
  Hand,
  HandHeart,
  Handshake,
  HeartHandshake,
  Medal,
  Music,
  Palette,
  Send,
  Smile,
  Trophy,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import type { Point, StageColor } from '@/content/stufen'
import type { Card, CardIcon, Step, StepIcon } from '@/content/stufen/types'
import { cn } from '@/lib/utils'

// Tiles in a light tint of the stage colour instead of white cards (like the Oberstufe), no shadow.
// Light tint of the page colour, shared with the contact cards.
export const tileTint: Record<StageColor, string> = {
  golden: 'bg-golden/25 dark:bg-golden/10',
  mint: 'bg-mint/15 dark:bg-mint/10',
  accent: 'bg-accent/10 dark:bg-accent/15',
  primary: 'bg-primary/10 dark:bg-white/8',
  'surface-ink': 'bg-foreground/5 dark:bg-white/8',
}

// Logo colours with readable text: navy on mint and golden, white on the darker pink and navy.
const blockColors = ['bg-mint text-on-bright', 'bg-golden text-on-bright', 'bg-accent-strong text-white', 'bg-primary text-primary-foreground']

/**
 * Points as tiles, each with its own eye-catcher from the content: a number („3“), a short word as
 * letter blocks („WIKI“), children's questions as speech bubbles, the point's keywords as coloured tags,
 * a short day as three stops, a number block with ticks beside it, keywords as fanned cards or a team.
 */
export function HighlightTiles({ points, color }: { points: Point[]; color: StageColor }) {
  return (
    <div className={cn('grid gap-4', points.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
      {points.map((p) => (
        // min-w-0: the fanned cards must not widen the grid column past the screen on narrow phones.
        <div
          key={p.title}
          data-highlight-tile
          className={cn('flex min-w-0 flex-col rounded-3xl p-6 sm:p-8', tileTint[color])}
        >
          {p.cards && <FannedCards cards={p.cards} />}
          {p.steps && <DaySteps steps={p.steps} />}
          {p.checks ? <Checks figure={p.figure} items={p.checks} /> : p.figure && <Figure value={p.figure} />}
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
          {p.team && <Team members={p.team} />}
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

// The stops of a day: tilted blocks in the logo colours joined by a line, label and note below.
const stepIcon: Record<StepIcon, LucideIcon> = { fruehstueck: Croissant, mittagessen: Utensils, spiel: Blocks }

function DaySteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="mb-5 flex items-start">
      {steps.map((s, i) => {
        const Icon = stepIcon[s.icon]
        return (
          <li
            key={s.label}
            data-tile-step
            className={cn(
              'relative flex flex-1 flex-col items-center text-center',
              // The line to the next stop, between the two blocks.
              i < steps.length - 1 && 'after:absolute after:top-7 after:left-[calc(50%+2rem)] after:right-[calc(-50%+2rem)] after:h-1 after:rounded-full after:bg-foreground/15',
            )}
          >
            <span className={cn('flex h-14 w-14 items-center justify-center rounded-2xl', [blockColors[1], blockColors[0], blockColors[2]][i % 3], i % 2 === 1 ? 'rotate-3' : '-rotate-2')}>
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="mt-2 text-sm font-extrabold leading-tight text-foreground">{s.label}</span>
            {s.note && <span className="text-xs text-muted-foreground"> {s.note}</span>}
          </li>
        )
      })}
    </ol>
  )
}

// A big number block (e.g. „1“ for Klasse 1) with a short list of ticks beside it.
function Checks({ figure, items }: { figure?: string; items: string[] }) {
  return (
    <div className="mb-4 flex items-center gap-4">
      {figure && (
        <span data-tile-block className="flex h-16 w-16 shrink-0 -rotate-3 items-center justify-center rounded-2xl bg-primary text-4xl font-black text-primary-foreground">
          {figure}
        </span>
      )}
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-2 font-bold text-foreground">
            <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full', i % 2 ? blockColors[1] : blockColors[0])}>
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <span data-tile-check>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// One symbol per keyword, shared by the fanned cards and the team.
const cardIcon: Record<CardIcon, LucideIcon> = {
  wunsch: HandHeart,
  grenze: Hand,
  versoehnen: Handshake,
  sport: Trophy,
  musik: Music,
  handwerk: Hammer,
  kunst: Palette,
  theater: Drama,
  olympiade: Medal,
  informatik: Binary,
  papierflieger: Send,
  lehrkraft: GraduationCap,
  sozialpaedagogik: HeartHandshake,
  erzieher: Smile,
  bibliothek: BookOpen,
}

// Tilted outward from the middle card, which sits a little higher.
const cardTilt: Record<number, string[]> = {
  3: ['-rotate-6', '-translate-y-2', 'rotate-6'],
  5: ['-rotate-6', '-translate-y-1 -rotate-2', '-translate-y-2', '-translate-y-1 rotate-2', 'rotate-6'],
}

// Keywords as a small fanned hand of cards, each with a symbol. Five cards get smaller on phones.
function FannedCards({ cards }: { cards: Card[] }) {
  const many = cards.length > 3
  const tilt = cardTilt[cards.length] ?? []
  return (
    <ul className={cn('mb-5 flex justify-center pt-2', many ? 'gap-1 sm:gap-2' : 'gap-2')}>
      {cards.map((c, i) => {
        const Icon = cardIcon[c.icon]
        return (
          <li
            key={c.label}
            className={cn(
              'flex min-w-0 max-w-28 flex-1 flex-col items-center gap-2 rounded-2xl text-center shadow-[0_4px_0_rgb(20_33_44/0.15)]',
              many ? 'px-1 py-2.5 sm:px-2 sm:py-3' : 'px-2 py-3',
              blockColors[i % blockColors.length],
              tilt[i],
            )}
          >
            <Icon className={many ? 'h-6 w-6 sm:h-8 sm:w-8' : 'h-8 w-8'} aria-hidden="true" />
            <span data-tile-card className={cn('font-extrabold leading-tight', many ? 'text-[11px] sm:text-sm' : 'text-sm')}>
              {c.label}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

// The professions of a team, each with a round symbol, like a row of people.
function Team({ members }: { members: Card[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
      {members.map((m, i) => {
        const Icon = cardIcon[m.icon]
        return (
          <li key={m.label} className="flex items-center gap-2">
            <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', blockColors[i % blockColors.length])}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span data-tile-member className="text-sm font-extrabold leading-tight text-foreground">
              {m.label}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
