import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { LogoTile } from '@/components/landingpage/partner-logos'
import { partnersByName } from '@/content/partners'
import type { Schwerpunkt, SchwerpunktColor } from '@/content/schwerpunkte'
import { BentoGrid } from '@/components/bento/bento-grid'
import { StepList } from '@/components/sections/step-list'
import { bentoCells } from '@/lib/bento'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

// Band and quote in the section colour; navy text on the light colours. Text on pink uses the darker
// accent-strong and full white, since the brand pink with white text stays below WCAG AA.
const sectionColor: Record<SchwerpunktColor, { band: string; muted: string; dot: string; rail: string }> = {
  accent: { band: 'bg-accent-strong text-white', muted: 'text-white', dot: 'bg-accent', rail: 'bg-accent/40' },
  mint: { band: 'bg-mint text-on-bright', muted: 'text-on-bright/80', dot: 'bg-mint', rail: 'bg-mint/60' },
  golden: { band: 'bg-golden text-on-bright', muted: 'text-on-bright/80', dot: 'bg-golden', rail: 'bg-golden/70' },
}

// Fact tiles take the other site colours so they stand out from the band.
const factColors: Record<SchwerpunktColor, string[]> = {
  accent: ['bg-golden text-on-bright', 'bg-mint text-on-bright', 'bg-surface-ink text-white dark:bg-white/15'],
  mint: ['bg-golden text-on-bright', 'bg-surface-ink text-white dark:bg-white/15', 'bg-primary text-primary-foreground'],
  golden: ['bg-mint text-on-bright', 'bg-surface-ink text-white dark:bg-white/15', 'bg-primary text-primary-foreground'],
}

export function SchwerpunktFeature({ item, index, title, gallery }: { item: Schwerpunkt; index: number; title: Photo | null; gallery: Photo[] }) {
  const c = sectionColor[item.color]
  const Icon = item.icon
  const cells = bentoCells({ title, gallery, facts: item.facts, quote: item.quote })
  const logos = partnersByName(item.partnerLogos ?? [])
  // Sections alternate light and sand, like the other subpages.
  const tone = index % 2 === 0 ? 'sand' : 'light'

  return (
    <section
      id={item.id}
      aria-labelledby={`${item.id}-title`}
      data-tone={tone}
      className={cn('scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20', tone === 'sand' ? 'bg-surface-sand' : 'bg-surface')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Colour band with title and intro */}
        <div className={cn('relative mb-4 overflow-hidden rounded-3xl p-7 sm:p-10', c.band)}>
          <Icon aria-hidden="true" className="absolute -right-4 -bottom-6 h-36 w-36 opacity-15 sm:h-44 sm:w-44" />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]">Schwerpunkt {index + 1}</p>
          <h2 id={`${item.id}-title`} className="mb-4 text-3xl font-extrabold leading-tight sm:text-5xl">
            {item.title}
          </h2>
          <p className={cn('relative max-w-3xl text-lg leading-relaxed text-pretty', c.muted)}>{item.intro}</p>
        </div>

        {/* Bento: photos mixed with fact tiles and the quote */}
        <BentoGrid cells={cells} tileColors={factColors[item.color]} quoteColor={c.band} />

        {/* Details */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <ul className="flex flex-col gap-3 lg:col-span-7">
            {item.points.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-foreground/85">
                <span aria-hidden="true" className={cn('mt-[0.55em] h-2 w-2 shrink-0 rounded-full', c.dot)} />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-10 lg:col-span-5">
            {item.howItWorks && (
              <div data-how-it-works>
                <h3 className="mb-5 text-lg font-bold text-foreground">So läuft’s</h3>
                <StepList steps={item.howItWorks.map((text) => ({ text }))} marker="number" markerClass={c.band} railClass={c.rail} />
              </div>
            )}

            {logos.length > 0 ? (
              <div data-partner-logos>
                <h3 className="mb-4 text-lg font-bold text-foreground">Unsere Partner</h3>
                <ul className="grid grid-cols-3 gap-3">
                  {logos.map((partner) => (
                    <li key={partner.name} className="flex flex-col gap-2">
                      <LogoTile partner={partner} sizes="(min-width: 1024px) 12vw, 30vw" className="aspect-square" />
                      <span className="text-xs leading-snug text-muted-foreground text-pretty">{partner.name}</span>
                    </li>
                  ))}
                </ul>
                {item.partners && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Außerdem: {item.partners}</p>}
              </div>
            ) : (
              item.partners && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">Partner:</strong> {item.partners}
                </p>
              )
            )}

            {item.links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 font-semibold transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    c.band,
                  )}
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-surface-sand p-5 ring-1 ring-foreground/5 transition-shadow hover:shadow-md in-data-[tone=sand]:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span>
                    <span className="block font-bold text-foreground">{link.label}</span>
                    {link.note && <span className="mt-0.5 block text-sm text-foreground/80">{link.note}</span>}
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
