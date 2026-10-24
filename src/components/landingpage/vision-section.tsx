import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Compass, Heart, Sparkles, Users, ArrowUpRight, BookOpen, Star } from 'lucide-react'

const pillars = [
  {
    number: '01',
    icon: Compass,
    title: 'Lernwege mitgestalten',
    description:
      'Durch unser schülerzentriertes Lernkonzept der Maker Education und Profile wie Mein Start-Up gestalten unsere Schülerinnen und Schüler ihre Bildung aktiv mit.',
    topBg: 'bg-mint',
    dashColor: 'rgba(255,255,255,0.4)',
    numColor: 'text-white/95',
    image: '/images/test.png',
  },
  {
    number: '02',
    icon: Heart,
    title: 'Persönlichkeit entwickeln',
    description:
      'Ob in unseren Sportteams mit lizenzierten Trainern oder durch die individuelle Begleitung im multiprofessionellen Jahrgangsteam – wir fördern Stärken gezielt.',
    topBg: 'bg-accent',
    dashColor: 'rgba(255,255,255,0.4)',
    numColor: 'text-white/60',
    image: '/images/test.png',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Aktive Lernkultur leben',
    description:
      'Wir lernen beim Machen. Im Stübi-Makerspace arbeiten wir mit 3D-Druckern und Robotik und erlernen so spielerisch 21st Century Skills.',
    topBg: 'bg-golden',
    dashColor: 'rgba(0,0,0,0.2)',
    numColor: 'text-black/40',
    image: '/images/test.png',
  },
  {
    number: '04',
    icon: Users,
    title: 'Demokratisches Miteinander',
    description:
      'Verantwortung füreinander steht an oberster Stelle. In Projekten wie Abgekocht!, wo Klassen für die ganze Schule kochen, wird Gemeinschaft praktisch gelebt.',
    topBg: 'bg-primary',
    dashColor: 'rgba(255,255,255,0.4)',
    numColor: 'text-white/60',
    image: '/images/test.png',
  },
]

export function VisionSection() {
  return (
    <section
      id="vision"
      className="py-24 bg-surface-sand relative overflow-hidden"
    >
      {/* Floating decorative badges */}
      <div className="hidden lg:flex absolute top-16 left-[6%] w-12 h-12 rounded-2xl bg-mint items-center justify-center rotate-6 shadow-lg">
        <BookOpen className="h-5 w-5 text-white" />
      </div>
      <div className="hidden lg:flex absolute top-12 right-[7%] w-12 h-12 rounded-2xl bg-golden items-center justify-center -rotate-6 shadow-lg">
        <Star className="h-5 w-5 text-foreground" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Unsere Leitvision
            </span>
            <span className="w-6 h-px bg-accent" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Die 4{' '}
            <span className="relative whitespace-nowrap">
              Säulen
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
            der Stübi.
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Jede Maßnahme, jedes Vorhaben und jede Initiative wird daraufhin
            geprüft, ob sie unserem Entwicklungsziel dient.
          </p>
        </div>

        {/* Pillar cards — features.jpg style: photo in colored card, text below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="group cursor-pointer">
              {/* Photo card — colored bg + image */}
              <div
                className={cn(
                  'relative rounded-3xl overflow-hidden ',
                  pillar.topBg,
                )}
                style={{ paddingBottom: '118%' }}
              >
                {/* Photo: full-bleed */}
                <div className="absolute inset-0">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Pillar number */}
                {/* <span
                  className={cn(
                    'absolute top-3 left-4 text-xs font-bold tracking-widest z-20',
                    pillar.numColor,
                  )}
                >
                  {pillar.number}
                </span> */}

                {/* Arrow button — sits in the cleared corner, 8px gap from photo edge */}
                <div className="absolute bottom-2 right-2 z-20 w-14 h-14 rounded-2xl bg-surface-ink group-hover:bg-primary transition-colors duration-300 flex items-center justify-center shadow-lg">
                  <ArrowUpRight className="h-10 w-10 text-white" />
                </div>
              </div>

              {/* Text below card — features.jpg style */}
              <div className="pt-5 px-1">
                <h3 className="font-bold text-lg text-foreground mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
