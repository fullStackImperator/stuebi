import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Backpack, Lightbulb } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center border-noneoverflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-school.jpg"
          alt="Schülerinnen und Schüler der Stübi Hamburg"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/50 to-primary/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* <p className="text-secondary font-medium mb-4 text-lg">
            Stadtteilschule Stübenhofer Weg
          </p> */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight text-balance mb-6">
            Gemeinsam von der Vorschule bis zum Abitur.
          </h1>
          <p className="text-xl sm:text-2xl text-primary-foreground/90 leading-relaxed mb-10 text-pretty">
            Wir schaffen für unsere Kinder und Jugendlichen ein personalisiertes
            und zukunftsorientiertes Bildungsangebot.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
            >
              <Link href="#eltern">
                <Backpack className="mr-2 h-5 w-5" />
                Für Eltern: Den Stübi-Weg entdecken
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="#foerderer">
                <Lightbulb className="mr-2 h-5 w-5" />
                Für Förderer: Zukunftsprojekte unterstützen
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="var(--card)"
          />
        </svg>
      </div>
    </section>
  )
}
