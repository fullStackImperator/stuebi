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

// Downward legs for the phone route: a point at the bottom, a notch at the top where the leg above points in.
const downShape = (first: boolean, last: boolean) =>
  `polygon(0 0${first ? '' : ', 50% 0.75rem'}, 100% 0, 100% ${last ? '100%' : 'calc(100% - 0.75rem)'}, 50% 100%, 0 ${last ? '100%' : 'calc(100% - 0.75rem)'})`

// Text on the left, the photo on the right half from the menu bar down (below the text on smaller screens).
// The stages run along the photo's foot as one band of arrow legs, like the route on /vorschule; where the
// half-width photo is narrow (below xl) the band breaks into two rows. On phones the photo is a narrow card
// with the stages beside it as a route downwards, and the lead sentence is left out to keep the hero short.
export function Hero({ photo }: { photo?: Photo | null }) {
  const p = photo ?? fallback
  return (
    <section data-hero className="relative overflow-hidden bg-surface pt-16 md:pt-20 lg:min-h-[86vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 sm:py-16 lg:py-24">
        <div className="lg:w-[52%] lg:pr-10">
          <h1 className="text-center sm:text-left text-[2.6rem] sm:text-7xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.02] tracking-tight text-balance mb-9 sm:mb-8">
            Gemeinsam von der <HighlightBar tone="mint">Vorschule</HighlightBar> bis zum{' '}
            <HighlightBar tone="golden">Abitur.</HighlightBar>
          </h1>
          <p className="hidden sm:block text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl text-pretty">
            Eine Schule, die mit Ihrem Kind mitwächst: von den ersten Schritten in der Vorschule bis zum Abschluss – an
            einem Ort und mit vertrauten Menschen.
          </p>
          <div className="flex gap-2 sm:gap-3">
            <Link
              href="/anmeldung"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:flex-none sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Kind anmelden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/termine"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-foreground/15 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:flex-none sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <span className="sm:hidden">Kennenlernen</span>
              <span className="hidden sm:inline">Schule kennenlernen</span>
            </Link>
          </div>
        </div>
      </div>

      <div
        data-hero-photo
        className="grid grid-cols-[1fr_9.5rem] gap-3 px-4 pb-10 sm:relative sm:block sm:h-[34rem] sm:p-0 lg:absolute lg:inset-y-0 lg:right-0 lg:top-20 lg:h-auto lg:w-[46%]"
      >
        <div className="relative overflow-hidden rounded-3xl sm:absolute sm:inset-0 sm:rounded-none">
          <Image
            src={p.src}
            alt={p.alt}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 100vw, 55vw"
            className="object-cover"
            style={{ objectPosition: p.objectPosition }}
          />
        </div>
        {/* Light shade only; the solid legs carry their own contrast. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-[#0f1f2e]/80 to-transparent sm:block" />
        <nav aria-label="Schulstufen" className="sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-6">
          <ol className="flex flex-col sm:flex-row lg:grid lg:grid-cols-2 lg:gap-y-1 xl:flex">
            {stages.map((s, i) => {
              const first = i === 0
              const last = i === stages.length - 1
              return (
                <li
                  key={s.name}
                  className={cn(
                    'min-w-0 sm:flex-1',
                    // Each leg tucks into the previous one's point: below it on phones, beside it from sm, so the gap
                    // across matches the 4px between rows. In two rows Mittelstufe starts the second row.
                    !first && 'max-sm:-mt-2',
                    i % 2 === 1 && 'sm:-ml-3',
                    i === 2 && 'sm:-ml-3 lg:ml-0 xl:-ml-3',
                  )}
                  style={{ zIndex: stages.length - i }}
                >
                  <Link
                    href={s.href}
                    className={cn(
                      'flex flex-col justify-center leading-tight transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white',
                      '[clip-path:var(--leg-down)] sm:[clip-path:var(--leg-across)]',
                      'min-h-[5.25rem] px-3 pb-3 sm:min-h-16 sm:py-2.5 sm:pr-5',
                      first ? 'pt-3 sm:pl-4' : 'pt-5 sm:pl-6',
                      first && 'rounded-tl-2xl rounded-tr-2xl sm:rounded-tr-none sm:rounded-bl-2xl',
                      last && 'rounded-bl-2xl rounded-br-2xl sm:rounded-bl-none sm:rounded-tr-2xl',
                      s.tile,
                    )}
                    style={{ '--leg-down': downShape(first, last), '--leg-across': legShape(first, last) } as React.CSSProperties}
                  >
                    <span className="block text-[15px] font-extrabold sm:truncate xl:text-base">{s.name}</span>
                    <span className="block text-xs opacity-80 sm:truncate sm:text-sm">{s.years}</span>
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
