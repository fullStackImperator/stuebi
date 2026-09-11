import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, Apple, BookOpen, Users, ArrowRight, Baby, School, BookMarked, GraduationCap } from 'lucide-react'

const highlights = [
  {
    icon: Clock,
    title: 'Ganztagsbetreuung',
    description: 'Verlässliche Begleitung am Nachmittag mit vielfältigen Kursen von Kunst bis Sport.',
    bg: 'bg-golden',
    iconColor: 'text-foreground',
  },
  {
    icon: Apple,
    title: 'Gesunde Ernährung',
    description: 'Kostenloses Frühstück (Brotzeit) und ein gesundes Mittagessen für alle Kinder.',
    bg: 'bg-mint',
    iconColor: 'text-foreground',
  },
  {
    icon: BookOpen,
    title: 'Individuelle Förderung',
    description: 'Feste Lesezeiten und Lernzeiten statt klassischer Hausaufgaben – begleitet von Profis.',
    bg: 'bg-accent',
    iconColor: 'text-white',
  },
  {
    icon: Users,
    title: 'Konzept eine Klasse',
    description: 'Von der Einschulung bis zum Abschluss im selben Klassenverband – das gibt Sicherheit.',
    bg: 'bg-primary',
    iconColor: 'text-white',
  },
]

const stages = [
  { name: 'Vorschule', years: 'ab 5 Jahren', icon: Baby, color: 'bg-golden', iconColor: 'text-foreground' },
  { name: 'Grundschule', years: 'Klasse 1–4', icon: School, color: 'bg-mint', iconColor: 'text-foreground' },
  { name: 'Mittelstufe', years: 'Klasse 5–10', icon: BookMarked, color: 'bg-accent', iconColor: 'text-white' },
  { name: 'Oberstufe', years: 'Klasse 11–13', icon: GraduationCap, color: 'bg-primary', iconColor: 'text-white' },
]

export function ParentsSection() {
  return (
    <section id="eltern" className="py-24 bg-white">
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
            <span className="relative whitespace-nowrap">
              vertrauensvolles
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
                  stroke="#ffd166"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            Miteinander.
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Schulwechsel bedeuten oft Umbrüche. Mit unserem Konzept eine Klasse bleiben Schülerinnen und Schüler von der Einschulung bis zum Abschluss weitestgehend im selben Klassenverband —{' '}
            <strong className="text-foreground">das gibt Sicherheit und Zugehörigkeit.</strong>
          </p>
        </div>

        {/* Highlight cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="group rounded-3xl overflow-hidden bg-[#f5f0e8] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* Colored icon badge top */}
              <div className="p-6 pb-4">
                <div className={`w-12 h-12 rounded-2xl ${h.bg} flex items-center justify-center mb-4`}>
                  <h.icon className={`h-5 w-5 ${h.iconColor}`} />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2 leading-snug">
                  {h.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {h.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner.jpg-style stage timeline — dark rounded card with dashed connecting path */}
        <div className="relative rounded-3xl bg-[#1e2a35] px-8 py-10 overflow-hidden mb-10">

          {/* Dashed connecting SVG path between icons */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 100 40 C 150 80, 230 10, 300 40 C 370 70, 430 10, 500 40 C 570 70, 630 10, 700 40"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stages.map((stage) => (
              <div key={stage.name} className="flex flex-col items-center text-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${stage.color} flex items-center justify-center shadow-lg`}>
                  <stage.icon className={`h-5 w-5 ${stage.iconColor}`} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">{stage.name}</p>
                  <p className="text-white/45 text-xs mt-1">{stage.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild className="rounded-full gap-2 px-7 py-5 font-semibold bg-primary text-white hover:bg-primary/90">
            <Link href="#anmeldung">
              Alles zur Anmeldung
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
