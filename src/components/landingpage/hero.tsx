import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'
import { HighlightBar } from '@/components/ui/highlight-bar'

// After the brochure cover: school photos and flat blocks in the logo colours, the headline in the
// biggest tile. Softly rounded tiles; the grid gap is the paper between them.
function PhotoTile({ src, alt, className, position = 'center' }: { src: string; alt: string; className?: string; position?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl', className)}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" style={{ objectPosition: position }} />
    </div>
  )
}

// The four stages as tiles in the site's stage colours.
const stages = [
  { name: 'Vorschule', years: 'ab 5 Jahren', href: '/vorschule', tile: 'bg-golden text-on-bright' },
  { name: 'Grundschule', years: 'Klasse 1–4', href: '/grundschule', tile: 'bg-mint text-on-bright' },
  { name: 'Mittelstufe', years: 'Klasse 5–10', href: '/mittelstufe', tile: 'bg-accent text-white' },
  { name: 'Oberstufe', years: 'Klasse 11–13', href: '/oberstufe', tile: 'bg-primary text-white' },
]

export function Hero({ photo }: { photo?: Photo | null }) {
  return (
    <section className="bg-surface pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(190px,15vw))_auto]">
          {/* Headline tile: first on phones, 2×2 on large screens */}
          <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-primary px-6 py-10 sm:px-10 xl:px-12 lg:col-start-1 lg:row-start-2 lg:row-span-2">
            <h1 className="text-[2.6rem] sm:text-6xl xl:text-7xl font-extrabold text-primary-foreground leading-[1.04] tracking-tight text-balance mb-8">
              Gemeinsam von der <HighlightBar tone="mint">Vorschule</HighlightBar> bis zum{' '}
              <HighlightBar tone="golden">Abitur.</HighlightBar>
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/anmeldung"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Kind anmelden
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/termine"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Schule kennenlernen
              </Link>
            </div>
          </div>

          {/* Stage tiles: right after the headline on phones, their own row along the bottom on large screens */}
          {stages.map((st, i) => (
            <Link
              key={st.name}
              href={st.href}
              className={cn(
                'group flex min-h-28 flex-col justify-between rounded-2xl p-4 transition-[filter] hover:brightness-105 sm:p-5 lg:row-start-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                st.tile,
                ['lg:col-start-1', 'lg:col-start-2', 'lg:col-start-3', 'lg:col-start-4'][i],
              )}
            >
              <ArrowRight
                className="h-5 w-5 self-end opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none"
                aria-hidden="true"
              />
              <span>
                <span className="block text-lg font-extrabold leading-tight sm:text-xl">{st.name}</span>
                <span className="block text-sm opacity-80">{st.years}</span>
              </span>
            </Link>
          ))}

          <PhotoTile
            src={photo?.src ?? '/images/fotos/einschulung-schultuete.jpg'}
            alt={photo?.alt ?? 'Ein Mädchen mit Schultüte und Krone bei der Einschulung'}
            position={photo?.objectPosition ?? '50% 30%'}
            className="aspect-square lg:aspect-auto lg:col-start-1 lg:row-start-1"
          />
          <PhotoTile
            src="/images/fotos/sport-fussball.jpg"
            alt="Schüler spielen Fußball in der Sporthalle"
            position="40% 55%"
            className="hidden lg:block lg:col-start-2 lg:row-start-1"
          />
          <PhotoTile
            src="/images/fotos/abgekocht-kochen.jpg"
            alt="Ein Junge brät Gemüse in der Schulküche beim Projekt Abgekocht"
            position="50% 12%"
            className="aspect-square lg:aspect-auto lg:col-start-3 lg:col-span-2 lg:row-start-1"
          />
          <div className="col-span-2 flex items-center justify-center rounded-2xl bg-white p-6 lg:col-span-1 lg:col-start-3 lg:row-start-2">
            <Image src="/images/stuebi-logo-campus.png" alt="Stübi – Campus Stübenhofer Weg" width={202} height={80} className="h-auto w-full max-w-[220px]" />
          </div>
          <PhotoTile
            src="/images/fotos/makerspace-junge.jpg"
            alt="Ein Junge im Stübi-Makerspace-T-Shirt lächelt in die Kamera"
            className="aspect-square lg:aspect-auto lg:col-start-4 lg:row-start-2 lg:row-span-2"
          />
          <PhotoTile
            src="/images/fotos/grundschule-spiel.jpg"
            alt="Zwei Grundschulkinder spielen gemeinsam ein Brettspiel"
            className="aspect-square lg:aspect-auto lg:col-start-3 lg:row-start-3"
          />
        </div>
      </div>
    </section>
  )
}
