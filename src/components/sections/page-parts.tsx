import Link from 'next/link'
import { ArrowRight, PencilLine } from 'lucide-react'
import { cn } from '@/lib/utils'

// Bausteine für die Unterseiten der Hauptnavigation (gleiche Optik wie die Startseite).

export function PageIntro({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead: React.ReactNode
}) {
  return (
    <section className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-golden" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-golden" />
          <span className="text-golden text-xs font-bold tracking-[0.2em] uppercase">{eyebrow}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-5 max-w-3xl">
          {title}
        </h1>
        <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-2xl text-pretty">{lead}</p>
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
}: {
  title: string
  children: React.ReactNode
  accent?: string
  id?: string
}) {
  return (
    <div id={id} className="scroll-mt-24 rounded-3xl bg-surface-sand in-data-[tone=sand]:bg-surface p-6 shadow-sm">
      <span className={cn('block w-10 h-1.5 rounded-full mb-4', accent)} />
      <h3 className="font-bold text-lg text-foreground mb-2 leading-snug">{title}</h3>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </div>
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
