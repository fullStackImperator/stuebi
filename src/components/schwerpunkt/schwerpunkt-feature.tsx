import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Award, Check } from 'lucide-react'
import { LogoTile } from '@/components/landingpage/partner-logos'
import { partnersByName } from '@/content/partners'
import type { Schwerpunkt, SchwerpunktColor } from '@/content/schwerpunkte'
import { BentoGrid } from '@/components/bento/bento-grid'
import { StepList } from '@/components/sections/step-list'
import { PhotoPlaceholder } from '@/components/sections/page-parts'
import { bentoCells } from '@/lib/bento'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

// Band and quote in the section colour; navy text on the light colours. Text on pink uses the darker
// accent-strong and full white, since the brand pink with white text stays below WCAG AA.
const sectionColor: Record<SchwerpunktColor, { band: string; muted: string; check: string; rail: string }> = {
  accent: { band: 'bg-accent-strong text-white', muted: 'text-white', check: 'bg-accent-strong text-white', rail: 'bg-accent/40' },
  mint: { band: 'bg-mint text-on-bright', muted: 'text-on-bright/80', check: 'bg-mint text-on-bright', rail: 'bg-mint/60' },
  golden: { band: 'bg-golden text-on-bright', muted: 'text-on-bright/80', check: 'bg-golden text-on-bright', rail: 'bg-golden/70' },
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
          {item.badge && (
            <p data-badge className="relative mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold">
              <Award className="h-4 w-4" aria-hidden="true" />
              {item.badge}
            </p>
          )}
          <p className={cn('relative max-w-3xl text-lg leading-relaxed text-pretty', c.muted)}>{item.intro}</p>
        </div>

        {/* Bento: photos mixed with fact tiles and the quote */}
        <BentoGrid cells={cells} tileColors={factColors[item.color]} quoteColor={c.band} />

        {/* Details */}
        {/* Three columns from lg up: the groups fill the first two, partners and links sit in the third of the
            first row; a small bento after an odd last group takes the rest of its row. */}
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {item.groups.map((g) => (
              <div key={g.title} data-point-group>
                <h3 className="mb-4 text-lg font-bold text-foreground">{g.title}</h3>
                <ul className="flex flex-col gap-3">
                  {g.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-foreground/85">
                      <span aria-hidden="true" className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', c.check)}>
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* An odd last group would sit alone; a small bento of a photo and a tile fills the cell beside it. */}
            {item.groupAside && (
              // A mosaic of three columns and two rows: the photo and the first placeholder two rows tall.
              <div data-group-aside className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-3 sm:grid-rows-2">
                <div className="relative min-h-44 overflow-hidden rounded-2xl sm:row-span-2">
                  <Image
                    src={item.groupAside.photo.src}
                    alt={item.groupAside.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 15vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: item.groupAside.photo.objectPosition }}
                  />
                </div>
                <div className={cn('deco-tile flex flex-col rounded-2xl p-5', factColors[item.color][0])}>
                  {item.groupAside.fact.icon && <item.groupAside.fact.icon className="mb-auto h-7 w-7 self-end opacity-80" strokeWidth={1.75} aria-hidden="true" />}
                  <p className="mt-6 whitespace-nowrap text-xl font-black leading-tight">{item.groupAside.fact.value}</p>
                  <p className="mt-2 text-sm font-semibold leading-snug">{item.groupAside.fact.label}</p>
                </div>
                {item.groupAside.missing?.map((m, i) => (
                  <PhotoPlaceholder key={m} className={cn('min-h-44', i === 0 && 'sm:col-start-3 sm:row-span-2 sm:row-start-1')}>
                    {m}
                  </PhotoPlaceholder>
                ))}
              </div>
            )}

          <div className="flex flex-col gap-10 sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1">
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

        {/* One topic per year, as a row of small tiles. */}
        {item.themes && (
          <div data-themes className="mt-14">
            <h3 className="mb-5 text-lg font-bold text-foreground">Jedes Jahr ein Thema</h3>
            <ol className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-3 sm:grid-cols-4">
              {item.themes.map((t) => (
                <li key={t.grade} data-jahrgangsthema className="rounded-2xl bg-surface p-4 shadow-sm in-data-[tone=light]:bg-surface-sand">
                  <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-black', c.check)}>{t.grade}</span>
                  <p className="mt-3 font-bold leading-snug text-foreground text-pretty hyphens-auto break-words">{t.topic}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  )
}
