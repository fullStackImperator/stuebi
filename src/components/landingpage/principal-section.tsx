import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'

// The headteacher in his own words, just above the contact persons. His name sits on the photo,
// like on the contact cards below; the figcaption ties the quote to the portrait.
export function PrincipalSection() {
  return (
    <section id="schulleitung" aria-labelledby="schulleitung-title" className="py-24 bg-surface">
      <figure className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl lg:order-2 lg:col-span-4 lg:col-start-9 lg:aspect-[5/6] lg:max-w-none">
          <Image
            src="/images/schulleitung/herpe.jpg"
            alt="Porträt von Matthias Herpe"
            fill
            sizes="(min-width: 1024px) 30vw, 448px"
            className="object-cover object-center"
          />

          {/* Bottom gradient, label and name — same treatment as the contact cards */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
          <figcaption>
            <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm bg-accent text-white">
              Schulleiter
            </span>
            <span className="absolute bottom-5 left-5 right-5 text-white font-bold text-xl leading-none">
              Matthias Herpe
            </span>
          </figcaption>
        </div>

        <div className="lg:order-1 lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-accent" />
            <span id="schulleitung-title" className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Schulleitung
            </span>
          </div>
          <span aria-hidden="true" className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-golden -rotate-3">
            <Quote className="h-7 w-7 fill-on-bright text-on-bright" />
          </span>
          <blockquote className="text-2xl sm:text-3xl lg:text-[2.3rem] font-semibold italic leading-snug text-foreground text-pretty">
            „In unser pädagogisches Konzept sind Schule, Lehrkräfte, Eltern und Kinder gleichermaßen eingebunden –
            das ist für uns die Umsetzung des Begriffs gemeinsames Lernen.“
          </blockquote>
          <Link
            href="/vision"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Unsere Vision
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </figure>
    </section>
  )
}
