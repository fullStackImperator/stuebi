import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { StageTiles } from '@/components/stufen/stage-tiles'
import { stageOrder } from '@/content/stufen'
import { HighlightBar } from '@/components/ui/highlight-bar'

export function ParentsSection() {
  return (
    <section id="eltern" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Für Eltern
            </span>
            <span className="w-6 h-px bg-accent" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Ein{' '}
            <HighlightBar tone="golden">vertrauensvolles</HighlightBar>{' '}
            Miteinander.
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Schulwechsel bedeuten oft Umbrüche. Mit unserem Konzept eine Klasse bleiben Schülerinnen und Schüler von der Einschulung bis zum Abschluss weitestgehend im selben Klassenverband —{' '}
            <strong className="text-foreground">das gibt Sicherheit und Zugehörigkeit.</strong>
          </p>
        </div>

        {/* One large tile per stage and the Ganztag, each linking to its own page */}
        <div className="mb-12">
          <StageTiles ids={stageOrder} variant="landing" />
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild className="rounded-full gap-2 px-7 py-5 font-semibold bg-primary text-white hover:bg-primary/90">
            <Link href="/anmeldung#ablauf">
              Alles zur Anmeldung
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
