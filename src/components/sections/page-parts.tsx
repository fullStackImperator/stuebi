import Link from 'next/link'
import { ArrowRight, PencilLine } from 'lucide-react'
import { cn } from '@/lib/utils'

// Bausteine für die Unterseiten der Hauptnavigation (gleiche Optik wie die Startseite).

export type IntroColor = 'primary' | 'golden' | 'mint' | 'accent' | 'surface-ink' | 'secondary'

// Header colour per page, the same as its tile in the phone menu. Text and the golden accent
// switch to navy (or pink, white) where golden would be hard to read.
// The eyebrow dash is a border, not a background, so a white dash doesn't count as a light surface in dark mode.
const introColor: Record<IntroColor, { bg: string; text: string; lead: string; accent: string; eyebrow: string; dash: string }> = {
  // Dark mode lightens primary to sky blue with navy text, where golden gets too faint.
  primary: {
    bg: 'bg-primary',
    text: 'text-primary-foreground',
    lead: 'text-primary-foreground/80',
    accent: 'bg-golden dark:bg-primary-foreground',
    eyebrow: 'text-golden dark:text-primary-foreground',
    dash: 'border-golden dark:border-primary-foreground',
  },
  golden: { bg: 'bg-golden', text: 'text-on-bright', lead: 'text-on-bright/80', accent: 'bg-on-bright', eyebrow: 'text-on-bright', dash: 'border-on-bright' },
  mint: { bg: 'bg-mint', text: 'text-on-bright', lead: 'text-on-bright/80', accent: 'bg-on-bright', eyebrow: 'text-on-bright', dash: 'border-on-bright' },
  // Golden is too faint on pink: white eyebrow and dash, navy side bar (a white bar would read as a light surface in dark mode).
  accent: { bg: 'bg-accent', text: 'text-white', lead: 'text-white/90', accent: 'bg-on-bright', eyebrow: 'text-white', dash: 'border-white' },
  // Dark navy would merge with the dark-mode page, so it lightens there.
  'surface-ink': { bg: 'bg-surface-ink dark:bg-white/10', text: 'text-white', lead: 'text-white/80', accent: 'bg-golden', eyebrow: 'text-golden', dash: 'border-golden' },
  secondary: { bg: 'bg-secondary', text: 'text-secondary-foreground', lead: 'text-foreground/75', accent: 'bg-accent', eyebrow: 'text-accent', dash: 'border-accent' },
}

export function PageIntro({
  eyebrow,
  title,
  lead,
  color = 'primary',
}: {
  eyebrow: string
  title: string
  lead: React.ReactNode
  color?: IntroColor
}) {
  const c = introColor[color]
  return (
    <section className={cn('relative overflow-hidden', c.bg, c.text)}>
      <div className={cn('absolute left-0 top-0 bottom-0 w-1.5', c.accent)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="inline-flex items-center gap-3 mb-5">
          <span data-eyebrow-dash className={cn('w-8 border-t', c.dash)} />
          <span className={cn('text-xs font-bold tracking-[0.2em] uppercase', c.eyebrow)}>{eyebrow}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-5 max-w-3xl">
          {title}
        </h1>
        <p className={cn('text-lg leading-relaxed max-w-2xl text-pretty', c.lead)}>{lead}</p>
      </div>
    </section>
  )
}

export function PageSection({
  id,
  eyebrow,
  title,
  intro,
  tone = 'light',
  children,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: React.ReactNode
  tone?: 'light' | 'sand'
  children?: React.ReactNode
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn('scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20', tone === 'sand' ? 'bg-surface-sand' : 'bg-surface')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">{eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">{title}</h2>
          {intro && <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export function InfoCard({
  title,
  children,
  accent = 'bg-primary',
  id,
  photo,
}: {
  title: string
  children: React.ReactNode
  accent?: string
  id?: string
  photo?: React.ReactNode
}) {
  return (
    <div id={id} data-info-card className="scroll-mt-24 rounded-3xl bg-surface-sand in-data-[tone=sand]:bg-surface p-6 shadow-sm">
      {photo && <div className="-mx-2 -mt-2 mb-5">{photo}</div>}
      <span className={cn('block w-10 h-1.5 rounded-full mb-4', accent)} />
      <h3 className="font-bold text-lg text-foreground mb-2 leading-snug">{title}</h3>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

// Aufzählung mit fettem Stichwort vorne, wie in der Schulbroschüre.
export function PointList({ items }: { items: { title: string; text: React.ReactNode }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-accent" />
          <span>
            <strong className="font-semibold text-foreground">{item.title}:</strong> {item.text}
          </span>
        </li>
      ))}
    </ul>
  )
}

// Markiert Stellen, für die die Schule noch Texte liefert.
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-golden bg-golden/10 p-5 text-sm text-foreground">
      <PencilLine className="h-4 w-4 mt-0.5 shrink-0" />
      <p>
        <strong>Text folgt:</strong> {children}
      </p>
    </div>
  )
}

export function NextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}
