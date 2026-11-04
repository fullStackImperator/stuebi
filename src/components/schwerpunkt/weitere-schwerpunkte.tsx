import type { LucideIcon } from 'lucide-react'
import { Atom, CalendarDays, Check, HandHeart, Languages, Lightbulb, Search, Trophy } from 'lucide-react'
import { StagePhoto } from '@/components/photos/stage-photo'
import { fremdsprachen, mintprax, projektlernen } from '@/content/weitere-schwerpunkte'
import { cn } from '@/lib/utils'

// The three smaller Schwerpunkte: the same colour band as the large ones, then a compact body without bento.
function Compact({
  id,
  number,
  title,
  intro,
  icon: Icon,
  band,
  tone,
  children,
}: {
  id: string
  number: number
  title: string
  intro: string
  icon: LucideIcon
  band: string
  tone: 'sand' | 'light'
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-tone={tone}
      className={cn('scroll-mt-20 py-16 sm:py-20 md:scroll-mt-24', tone === 'sand' ? 'bg-surface-sand' : 'bg-surface')}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn('relative mb-10 overflow-hidden rounded-3xl p-7 sm:p-10', band)}>
          <Icon aria-hidden="true" className="absolute -bottom-6 -right-4 h-36 w-36 opacity-15 sm:h-44 sm:w-44" />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]">Schwerpunkt {number}</p>
          <h2 id={`${id}-title`} className="mb-4 text-3xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="relative max-w-3xl text-lg leading-relaxed text-pretty">{intro}</p>
        </div>
        {children}
      </div>
    </section>
  )
}

function Checks({ points, check }: { points: string[]; check: string }) {
  return (
    <ul className="flex flex-col gap-3">
      {points.map((p) => (
        <li key={p} className="flex gap-3 leading-relaxed text-foreground/85">
          <span aria-hidden="true" className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', check)}>
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className="text-pretty">{p}</span>
        </li>
      ))}
    </ul>
  )
}

const mintFactTiles = ['bg-golden text-on-bright', 'bg-mint text-on-bright', 'bg-accent-strong text-white']
const mintProjectTiles = ['bg-primary text-primary-foreground', 'bg-surface-ink text-white dark:bg-white/15']

export function Mintprax() {
  return (
    <Compact id="mintprax" number={4} title="MINTprax" intro={mintprax.intro} icon={Atom} band="bg-primary text-primary-foreground" tone="light">
      <ul className="mb-8 grid gap-3 sm:grid-cols-3">
        {mintprax.facts.map((f, i) => (
          <li key={f.value} className={cn('deco-tile rounded-2xl p-6', mintFactTiles[i])}>
            <p className="font-heading text-3xl font-black leading-none lining-nums">{f.value}</p>
            <p className="mt-2 text-sm font-semibold leading-snug">{f.label}</p>
          </li>
        ))}
      </ul>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Checks points={mintprax.points} check="bg-primary text-primary-foreground dark:bg-white/20" />
          <h3 className="mb-4 mt-10 text-lg font-bold text-foreground">MINT-Projekte mit Partnern</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {mintprax.projects.map((p, i) => (
              <div key={p.title} data-mint-projekt className={cn('deco-tile rounded-2xl p-6', mintProjectTiles[i])}>
                <p className="text-lg font-extrabold leading-tight">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed opacity-90 text-pretty">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-5">
          {mintprax.photos.map((p) => (
            <StagePhoto key={p.src} photo={p} className="aspect-[3/4]" />
          ))}
        </div>
      </div>
    </Compact>
  )
}

export function Fremdsprachen() {
  return (
    <Compact
      id="fremdsprachen"
      number={5}
      title="Zweite Fremdsprache"
      intro={fremdsprachen.intro}
      icon={Languages}
      band="bg-accent-strong text-white"
      tone="sand"
    >
      <ul className="mb-10 grid gap-3 sm:grid-cols-3">
        {fremdsprachen.languages.map((l) => (
          <li key={l.name} data-sprache className={cn('deco-tile flex min-h-44 flex-col rounded-3xl p-7', l.tile)}>
            <p lang={l.name === 'Spanisch' ? 'es' : l.name === 'Französisch' ? 'fr' : 'tr'} className="font-quote text-4xl italic leading-none">
              {l.greeting}
            </p>
            <h3 className="mt-auto pt-8 text-2xl font-extrabold leading-tight">{l.name}</h3>
            <p className="mt-1 text-sm font-semibold opacity-90">{l.note}</p>
          </li>
        ))}
      </ul>
      <div className="max-w-3xl">
        <Checks points={fremdsprachen.points} check="bg-accent-strong text-white" />
      </div>
    </Compact>
  )
}

const projektIcons: LucideIcon[] = [Search, CalendarDays, HandHeart]

export function Projektlernen() {
  return (
    <Compact id="projektlernen" number={6} title="Projektlernen" intro={projektlernen.intro} icon={Lightbulb} band="bg-mint text-on-bright" tone="light">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <ul className="flex flex-col gap-8 lg:col-span-7">
          {projektlernen.points.map((p, i) => {
            const Icon = projektIcons[i]
            return (
              <li key={p.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mint text-on-bright">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-tight text-foreground">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground text-pretty">{p.text}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="flex flex-col gap-3 lg:col-span-5">
          <StagePhoto photo={projektlernen.photo} />
          {/* A highlight from the old "Wettbewerbe" page. */}
          <div data-award className="deco-tile rounded-2xl bg-golden p-6 text-on-bright">
            <Trophy className="mb-4 h-8 w-8" strokeWidth={1.75} aria-hidden="true" />
            <p className="text-lg font-extrabold leading-tight">{projektlernen.award.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-pretty">{projektlernen.award.text}</p>
          </div>
        </div>
      </div>
    </Compact>
  )
}
