import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { legShape } from '@/components/stufen/route-strip'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'
import { HighlightBar } from '@/components/ui/highlight-bar'

// The four stages in the site's stage colours (darker pink so the white text stays readable).
const stages = [
  { name: 'Vorschule', years: 'ab 5 Jahren', href: '/vorschule', tile: 'bg-golden text-on-bright' },
  { name: 'Grundschule', years: 'Klasse 1–4', href: '/grundschule', tile: 'bg-mint text-on-bright' },
  { name: 'Mittelstufe', years: 'Klasse 5–10', href: '/mittelstufe', tile: 'bg-accent-strong text-white' },
  { name: 'Oberstufe', years: 'Klasse 11–13', href: '/oberstufe', tile: 'bg-primary text-white' },
]

const fallback: Photo = {
  src: '/images/fotos/treppe-lesen.jpg',
  alt: 'Kinder lesen und unterhalten sich auf der Sitztreppe im Schulhaus',
  width: 1041,
  height: 1196,
  objectPosition: '50% 35%',
}

// Text on the left, the photo on the right half from the menu bar down (below the text on phones).
// The stages run along the photo's foot as one band of arrow legs, like the route on /vorschule;
// where the photo is narrow (phones, and the half-width photo below xl) the band breaks into two rows.
export function Hero({ photo }: { photo?: Photo | null }) {
  const p = photo ?? fallback
  return (
    <section data-hero className="relative overflow-hidden bg-surface pt-16 md:pt-20 lg:min-h-[86vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div className="lg:w-[52%] lg:pr-10">
          <h1 className="text-[2.6rem] sm:text-7xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.02] tracking-tight text-balance mb-6 sm:mb-8">
            Gemeinsam von der <HighlightBar tone="mint">Vorschule</HighlightBar> bis zum{' '}
            <HighlightBar tone="golden">Abitur.</HighlightBar>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl text-pretty">
            Eine Schule, die mit Ihrem Kind mitwächst: von den ersten Schritten in der Vorschule bis zum Abschluss – an
            einem Ort und mit vertrauten Menschen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/anmeldung"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Kind anmelden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/termine"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground/15 px-7 py-3.5 font-semibold text-foreground transition-colors hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Schule kennenlernen
            </Link>
          </div>
        </div>
      </div>

      <div data-hero-photo className="relative h-[24rem] sm:h-[34rem] lg:absolute lg:inset-y-0 lg:right-0 lg:top-20 lg:h-auto lg:w-[46%]">
        <Image
          src={p.src}
          alt={p.alt}
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
          style={{ objectPosition: p.objectPosition }}
        />
        {/* Light shade only; the solid legs carry their own contrast. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0f1f2e]/80 to-transparent" />
        <nav aria-label="Schulstufen" className="absolute inset-x-0 bottom-0 p-3 sm:p-6">
          <ol className="grid grid-cols-2 gap-y-1 sm:flex lg:grid xl:flex">
            {stages.map((s, i) => {
              const first = i === 0
              const last = i === stages.length - 1
              return (
                <li key={s.name} className={cn('min-w-0 sm:flex-1', !first && 'sm:-ml-3 lg:ml-0 xl:-ml-3')} style={{ zIndex: stages.length - i }}>
                  <Link
                    href={s.href}
                    className={cn(
                      'flex min-h-16 flex-col justify-center py-2.5 pr-5 leading-tight transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white',
                      first ? 'rounded-l-2xl pl-4' : 'pl-6',
                      last && 'rounded-r-2xl',
                      s.tile,
                    )}
                    style={{ clipPath: legShape(first, last) }}
                  >
                    <span className="block truncate text-[15px] font-extrabold xl:text-base">{s.name}</span>
                    <span className="block truncate text-xs opacity-80 sm:text-sm">{s.years}</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </section>
  )
}
