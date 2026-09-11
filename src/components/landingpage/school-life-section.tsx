import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  GraduationCap,
  Dumbbell,
  Palette,
  Globe,
  Building2,
  Utensils,
  Microscope,
  Music,
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from 'lucide-react'

const featured = [
  {
    title: 'Sportteams',
    description: 'Basketball, Judo & Fußball mit lizenzierten Trainern – auf dem Weg zur Partnerschule des Nachwuchsleistungssports.',
    bg: 'bg-accent',
    image: '/images/test.png',
  },
  {
    title: 'Stübi-Makerspace',
    description: '3D-Drucker, Robotik und digitales Prototyping – hier lernen Schülerinnen und Schüler spielerisch 21st Century Skills.',
    bg: 'bg-mint',
    image: '/images/test.png',
  },
  {
    title: 'Projekt Abgekocht!',
    description: 'Klassen kochen für die ganze Schule. Verantwortung, Teamwork und echte Küche – Gemeinschaft ganz praktisch.',
    bg: 'bg-golden',
    image: '/images/test.png',
  },
]

const extras = [
  { icon: Palette, label: 'Kunst & Theater' },
  { icon: Music, label: 'Musik & Chor' },
  { icon: Globe, label: 'Fremdsprachen' },
  { icon: GraduationCap, label: 'Schülerfirmen' },
  { icon: Microscope, label: 'Forschen & Staunen' },
]

export function SchoolLifeSection() {
  return (
    <section id="schulleben" className="py-24 bg-[#f5f0e8] relative overflow-hidden">

      {/* Floating decorative badges */}
      <div className="hidden lg:flex absolute top-14 left-[5%] w-12 h-12 rounded-2xl bg-accent items-center justify-center -rotate-6 shadow-lg">
        <BookOpen className="h-5 w-5 text-white" />
      </div>
      <div className="hidden lg:flex absolute top-10 right-[6%] w-12 h-12 rounded-2xl bg-primary items-center justify-center rotate-6 shadow-lg">
        <Sparkles className="h-5 w-5 text-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Schulalltag
            </span>
            <span className="w-6 h-px bg-accent" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Ein Alltag voller{' '}
            <span className="relative whitespace-nowrap">
              Möglichkeiten
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
            Als Ganztagsschule bieten wir weit mehr als Unterricht. Sport, Technik, Kunst und soziale Projekte — hier findet jedes Kind seinen Platz.
          </p>
        </div>

        {/* Featured 3-column cards — same pattern as vision section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {featured.map((item) => (
            <div key={item.title} className="group cursor-pointer">

              {/* Photo card */}
              <div
                className={cn('relative rounded-3xl overflow-hidden', item.bg)}
                style={{ paddingBottom: '118%' }}
              >
                {/* Photo: full-bleed */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Arrow button */}
                <div className="absolute bottom-2 right-2 z-20 w-14 h-14 rounded-2xl bg-[#1e2a35] group-hover:bg-primary transition-colors duration-300 flex items-center justify-center shadow-lg">
                  <ArrowUpRight className="h-10 w-10 text-white" />
                </div>
              </div>

              {/* Text below card */}
              <div className="pt-5 px-1">
                <h3 className="font-bold text-lg text-foreground mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Extras — compact pill row */}
        <div className="flex flex-wrap justify-center gap-3">
          {extras.map((e) => (
            <div
              key={e.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-sm font-medium text-foreground"
            >
              <e.icon className="h-4 w-4 text-primary" />
              {e.label}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
