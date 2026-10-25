import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, ChefHat, Cog, Trophy } from 'lucide-react'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

type Feature = {
  id: string
  title: string
  icon: LucideIcon
  // Each feature takes one figure colour from the logo.
  fill: string
  iconColor: string
  border: string
  slabTilt: string
  tagline?: string
  intro: string
  points: string[]
  note?: React.ReactNode
  quote?: { text: string; author: string }
}

const features: Feature[] = [
  {
    id: 'sport',
    title: 'Sportteams',
    icon: Trophy,
    fill: 'bg-accent',
    iconColor: 'text-white',
    border: 'border-accent',
    slabTilt: '-rotate-3',
    intro:
      'Sportbetonte Schule ab Jahrgang 5, mit den Schwerpunkten Basketball, Judo und Fußball. Trainiert wird wöchentlich mit A-, B- und C-lizenzierten Coaches – Schul-, Vereins- und Verbandstraining greifen ineinander.',
    points: [
      'Fünf Sporthallen und das „bewegte Klassenzimmer“ für täglichen Ausgleich',
      'Von der Grundschule bis zum Abitur trainieren alle für das Deutsche Sportabzeichen',
      'Vor- und Nachschreibtermine, Freistellung für Wettkämpfe und Trainingslager',
      'Sportlich orientierte Klassenreisen',
      'Hamburger Schulmeisterschaften und „Jugend trainiert für Olympia“',
      'Ab Jahrgang 9: Doping-Prävention',
      'Anschlussprofil in der Oberstufe: „Fair Play“ (Sport, Gesundheit & Management)',
      'Ziel: „Partnerschule des Nachwuchsleistungssports“',
    ],
    note: (
      <>
        <strong className="font-semibold text-foreground">Partner:</strong> Hamburger Judo-Verband e. V.,
        Hamburger Basketball-Verband e. V., Hamburger Sportbund e. V., Hamburg Towers, Sport ohne Grenzen e. V.
      </>
    ),
    quote: { text: '„Wenn du alles gibst, kannst du dir nichts vorwerfen.“', author: 'Dirk Nowitzki' },
  },
  {
    id: 'makerspace',
    title: 'Makerspace',
    icon: Cog,
    fill: 'bg-mint',
    iconColor: 'text-on-bright',
    border: 'border-mint',
    slabTilt: 'rotate-3',
    intro:
      'Der größte Makerspace einer Schule in Deutschland. Maker Education heißt hier: Kreativität, Erfindungsgeist und praktisches Arbeiten – vom ersten Entwurf bis zum fertigen Produkt.',
    points: [
      '3D-Drucker, Laser-Cutter, CNC-Fräsen, digitales Sticken',
      'Holz-, Textil-, Theater- und Metallwerkstatt',
      'Robotik und Mikrocontroller-Programmierung',
      'Audio und Video, VR/AR, Elektronik, digitale Textiltechnik',
      'Fehler machen schlau: Wenn ein Programm hakt oder ein Bauteil klemmt, ist das ein Lernschritt – so wachsen Durchhaltevermögen und Problemlösen',
      'Selbstbewusstsein durch eigenständiges Arbeiten und sichtbare Erfolge',
      'Unterstützt vom Schulverein und externen Fachkräften mit Workshops',
      'Makerspace Club: freiwillig in Pausen und nach Schulschluss, mit „Gürtel“-Aufstiegssystem wie in einer Kung-Fu-Schule',
    ],
    note: 'So bereiten wir auf die „21st Century Skills“ vor.',
    quote: { text: '„Lernen mit Kopf, Herz und Hand.“', author: 'Johann Heinrich Pestalozzi' },
  },
  {
    id: 'abgekocht',
    title: 'Abgekocht',
    icon: ChefHat,
    fill: 'bg-golden',
    iconColor: 'text-on-bright',
    border: 'border-golden',
    slabTilt: '-rotate-2',
    tagline: 'Wir kochen selbst – seit 2017',
    intro:
      'Jede Klasse kocht einmal im Schuljahr eine Woche lang für die gesamte Schule – gemeinsam mit einem professionellen Koch. Das Projekt ist der praktische Teil unseres Ernährungskonzepts und knüpft an unser Oberstufenprofil „Fair Play“ (Sport, Gesundheit & Management) an.',
    points: [
      'Frische Produkte, teils aus dem eigenen Schulgarten',
      'Theoretische Unterrichtsmodule und Exkursionen, etwa zum Bio-Bauernhof',
      'Einhaltung der DGE-Standards der Deutschen Gesellschaft für Ernährung',
      'Weitere Bausteine: gemeinsames Abschlussessen, Schulrestaurant „Barista“',
    ],
  },
]

export type SchoolLifePhotos = Partial<Record<'sport' | 'makerspace' | 'abgekocht', Photo | null>>

export function SchoolLifeSection({ photos = {} }: { photos?: SchoolLifePhotos }) {
  return (
    <section id="schulleben" aria-labelledby="schulleben-title" className="py-24 bg-surface-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Unsere Besonderheiten
            </span>
            <span className="w-6 h-px bg-accent" />
          </div>

          <h2 id="schulleben-title" className="text-4xl sm:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Das macht Stübi{' '}
            <span className="relative whitespace-nowrap">
              besonders
              <svg
                className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
                height="12"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 2 6 C 20 1, 80 1, 98 6 C 80 11, 20 11, 2 6 Z"
                  stroke="#ef476f"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Drei Angebote, die es in dieser Form an keiner anderen Hamburger Schule gibt.
          </p>
        </div>

        <div className="flex flex-col gap-20 lg:gap-28">
          {features.map((f, i) => (
            <FeatureRow key={f.id} feature={f} photo={photos[f.id as keyof SchoolLifePhotos] ?? null} flip={i % 2 === 1} />
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

function FeatureRow({ feature: f, photo, flip }: { feature: Feature; photo: Photo | null; flip: boolean }) {
  const Icon = f.icon
  return (
    <article
      aria-labelledby={`schulleben-${f.id}`}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      {/* Photo on a tilted slab in the feature colour, like the coloured figures in the logo */}
      <div className={cn('relative mx-2 sm:mx-6 lg:mx-0 lg:col-span-5', flip && 'lg:order-2')}>
        <div aria-hidden="true" className={cn('absolute inset-0 rounded-3xl', f.fill, f.slabTilt)} />
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface shadow-lg">
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
          ) : (
            // No photo in the CMS yet: a dark panel keeps the slab readable instead of an empty white box.
            <div className="flex h-full items-center justify-center bg-surface-ink">
              <div className={cn('flex h-24 w-24 items-center justify-center rounded-3xl', f.fill)}>
                <Icon className={cn('h-11 w-11', f.iconColor)} aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={cn('lg:col-span-7', flip && 'lg:order-1')}>
        <div className="mb-5 flex items-center gap-4">
          <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl', f.fill)}>
            <Icon className={cn('h-6 w-6', f.iconColor)} aria-hidden="true" />
          </span>
          <div>
            <h3 id={`schulleben-${f.id}`} className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              {f.title}
            </h3>
            {f.tagline && <p className="mt-1 font-semibold text-muted-foreground">{f.tagline}</p>}
          </div>
        </div>

        <p className="mb-6 max-w-[62ch] text-lg leading-relaxed text-foreground/85 text-pretty">{f.intro}</p>

        <ul className="mb-6 flex max-w-[62ch] flex-col gap-2.5">
          {f.points.map((point) => (
            <li key={point} className="flex gap-3 leading-relaxed text-foreground/85">
              <span aria-hidden="true" className={cn('mt-[0.55em] h-2 w-2 shrink-0 rounded-full', f.fill)} />
              {point}
            </li>
          ))}
        </ul>

        {f.note && <p className="mb-6 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">{f.note}</p>}

        {f.quote && (
          <blockquote className={cn('max-w-[56ch] border-l-4 pl-5', f.border)}>
            <p className="text-xl font-semibold italic leading-snug text-foreground">{f.quote.text}</p>
            <footer className="mt-2 text-sm text-muted-foreground">{f.quote.author}</footer>
          </blockquote>
        )}
      </div>
    </article>
  )
}
