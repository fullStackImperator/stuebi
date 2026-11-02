import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

// Schulleiter and Stellvertreter, same style as the contact cards below.
const leitung = [
  { name: 'Matthias Herpe', role: 'Schulleiter', image: '/images/schulleitung/herpe.jpg', badge: 'bg-accent text-white' },
  { name: 'Eike Hübenthal', role: 'Stellv. Schulleiter', image: '/images/schulleitung/eike.jpg', badge: 'bg-mint text-on-bright' },
]

// The school leadership as a team: head and deputy side by side at the same size and large, the head's
// quote in a serif italic next to them with his name below it, just above the contact persons.
export function PrincipalSection() {
  return (
    <section id="schulleitung" aria-labelledby="schulleitung-title" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:gap-4 lg:order-2 lg:col-span-7 lg:col-start-6 lg:max-w-none">
          {leitung.map((p) => (
            <div key={p.name} data-leitung-person className="relative aspect-[5/6] w-full overflow-hidden rounded-3xl">
              <Image
                src={p.image}
                alt={`Porträt von ${p.name}`}
                fill
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 30vw, 50vw"
                className="object-cover object-center"
              />
              {/* Bottom gradient, label and name — same treatment as the contact cards */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
              <span className={cn('absolute top-3 left-3 sm:top-4 sm:left-4 text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm', p.badge)}>
                {p.role}
              </span>
              <span className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white font-bold text-lg sm:text-xl leading-tight">
                {p.name}
              </span>
            </div>
          ))}
        </div>

        <figure className="lg:order-1 lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-accent" />
            <span id="schulleitung-title" className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Unsere Schulleitung
            </span>
          </div>
          <span aria-hidden="true" className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-golden -rotate-3">
            <Quote className="h-7 w-7 fill-on-bright text-on-bright" />
          </span>
          <blockquote className="font-quote text-[1.7rem] sm:text-[2rem] font-medium italic leading-snug text-foreground text-pretty">
            „In unser pädagogisches Konzept sind Schule, Lehrkräfte, Eltern und Kinder gleichermaßen eingebunden –
            das ist für uns die Umsetzung des Begriffs gemeinsames Lernen.“
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 text-base">
            <span aria-hidden="true" className="h-px w-8 bg-foreground/30" />
            <span>
              <span className="font-bold text-foreground">Matthias Herpe</span>
              <span className="text-muted-foreground">, Schulleiter</span>
            </span>
          </figcaption>
          <Link
            href="/vision"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Unsere Vision
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </figure>
      </div>
    </section>
  )
}
