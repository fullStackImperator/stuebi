import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { schwerpunktOrder, schwerpunkte, type Schwerpunkt, type SchwerpunktColor, type SchwerpunktId } from '@/content/schwerpunkte'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'
import { HighlightBar } from '@/components/ui/highlight-bar'

// Card colour per Schwerpunkt; navy text on the light colours, darker pink so white text stays readable.
const cardColor: Record<SchwerpunktColor, string> = {
  accent: 'bg-accent-strong text-white',
  mint: 'bg-mint text-on-bright',
  golden: 'bg-golden text-on-bright',
}

export type SchoolLifePhotos = Partial<Record<SchwerpunktId, Photo | null>>

// Short teasers only; the details live on /schwerpunkt.
export function SchoolLifeSection({ photos = {} }: { photos?: SchoolLifePhotos }) {
  return (
    <section id="schulleben" aria-labelledby="schulleben-title" className="py-24 bg-surface-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Unsere Besonderheiten
            </span>
            <span className="w-6 h-px bg-accent" />
          </div>

          <h2 id="schulleben-title" className="text-4xl sm:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Das macht Stübi{' '}
            <HighlightBar tone="accent">besonders</HighlightBar>
            .
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Drei Angebote, die es in dieser Form an keiner anderen Hamburger Schule gibt.
          </p>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:gap-8">
          {schwerpunktOrder.map((id, i) => (
            <FeatureCard key={id} item={schwerpunkte[id]} photo={photos[id] ?? null} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/schwerpunkt"
            className="inline-flex items-center gap-2 rounded-full bg-surface-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Alle Schwerpunkte ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ item, photo, index }: { item: Schwerpunkt; photo: Photo | null; index: number }) {
  const Icon = item.icon
  const flip = index % 2 === 1
  return (
    // One wide card in the feature colour; the whole card links to its section on /schwerpunkt.
    <Link
      href={`/schwerpunkt#${item.id}`}
      aria-labelledby={`schulleben-${item.id}`}
      className={cn(
        'group grid overflow-hidden rounded-3xl shadow-sm transition-shadow hover:shadow-lg md:grid-cols-2',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
        cardColor[item.color],
      )}
    >
      <div className={cn('relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-80', flip && 'md:order-2')}>
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            style={{ objectPosition: photo.objectPosition }}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-surface-ink">
            <Icon className="h-14 w-14 text-white/80" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <span aria-hidden="true" className="absolute right-6 top-4 text-7xl font-black leading-none opacity-20 sm:text-8xl">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Icon className="mb-4 h-8 w-8" aria-hidden="true" />
        <h3 id={`schulleben-${item.id}`} className="mb-3 text-3xl font-extrabold leading-tight sm:text-4xl">
          {item.title}
        </h3>
        <p className="mb-6 max-w-[46ch] text-lg leading-relaxed text-pretty">{item.teaser}</p>
        <span className="inline-flex items-center gap-2 font-bold">
          Mehr erfahren
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
