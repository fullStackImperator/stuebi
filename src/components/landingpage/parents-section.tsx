import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Apple, BookOpen, Users, ArrowRight } from 'lucide-react'

const highlights = [
  {
    icon: Clock,
    title: 'Ganztagsbetreuung',
    description:
      'Verlässliche Begleitung am Nachmittag mit vielfältigen Kursen von Kunst bis Sport.',
  },
  {
    icon: Apple,
    title: 'Gesunde Ernährung',
    description:
      'Kostenloses Frühstück (Brotzeit) und ein gesundes Mittagessen für alle Kinder.',
  },
  {
    icon: BookOpen,
    title: 'Individuelle Förderung',
    description:
      'Feste Lesezeiten und Lernzeiten statt klassischer Hausaufgaben – begleitet von Profis.',
  },
  {
    icon: Users,
    title: 'Konzept eine Klasse',
    description:
      'Von der Einschulung bis zum Abschluss im selben Klassenverband – das gibt Sicherheit.',
  },
]

const stages = [
  { name: 'Vorschule', years: 'ab 5 Jahren', color: 'bg-primary' },
  { name: 'Grundschule', years: 'Klasse 1–4', color: 'bg-primary/80' },
  { name: 'Mittelstufe', years: 'Klasse 5–10', color: 'bg-accent' },
  { name: 'Oberstufe', years: 'Klasse 11–13', color: 'bg-accent/80' },
]

export function ParentsSection() {
  return (
    <section id="eltern" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Für Eltern
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ein vertrauensvolles und beständiges Miteinander
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
              Schulwechsel bedeuten oft Umbrüche. Mit unserem Konzept eine
              Klasse bleiben Schülerinnen und Schüler von der Einschulung bis
              zum Abschluss weitestgehend im selben Klassenverband.{' '}
              <strong className="text-foreground">
                Das gibt Sicherheit und Zugehörigkeit.
              </strong>
            </p>

            {/* Timeline */}
            <div className="mb-8">
              <p className="text-sm font-medium text-foreground mb-4">
                Der Bildungsweg an der Stübi
              </p>
              <div className="flex items-center gap-1">
                {stages.map((stage, index) => (
                  <div key={stage.name} className="flex-1 group relative">
                    <div
                      className={`h-2 ${stage.color} ${index === 0 ? 'rounded-l-full' : ''} ${index === stages.length - 1 ? 'rounded-r-full' : ''}`}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-foreground">
                        {stage.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {stage.years}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild className="gap-2">
              <Link href="#anmeldung">
                Alles zur Anmeldung
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right Content - Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((highlight) => (
              <Card
                key={highlight.title}
                className="border-border/50 hover:border-primary/30 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <highlight.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
