import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Backpack, Lightbulb, Users, GraduationCap, Building2, Dumbbell, Sparkles } from 'lucide-react'

const stats = [
  { icon: Users, value: 'VSK–13', label: 'Jahrgänge', bg: 'bg-golden', iconColor: 'text-on-bright' },
  { icon: GraduationCap, value: 'Abitur', label: 'Abschluss möglich', bg: 'bg-mint', iconColor: 'text-on-bright' },
  { icon: Building2, value: 'Makerspace', label: 'Zukunftskompetenzen', bg: 'bg-accent', iconColor: 'text-white' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col pt-16 md:pt-20 overflow-hidden">

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row flex-1 relative">

        {/* Left panel */}
        <div className="relative z-10 flex flex-col justify-center bg-primary lg:w-[52%] px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20">

          {/* Golden accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-golden" />

          {/* Eyebrow — matches all other sections */}
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-golden" />
            <span className="text-golden text-xs font-bold tracking-[0.2em] uppercase">
              Hamburg · Wilhelmsburg
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-primary-foreground leading-[1.05] tracking-tight text-balance mb-6">
            Gemeinsam von der{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Vorschule</span>
              {/* Hand-drawn oval — matches site-wide heading treatment */}
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
                  stroke="rgba(255,209,102,0.6)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            bis zum{' '}
            <span className="relative inline-block">
              <span className="text-golden relative z-10">Abitur.</span>
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
            </span>
          </h1>

          {/* Body */}
          <p className="text-lg text-primary-foreground/75 leading-relaxed mb-10 max-w-lg text-pretty">
            Wir schaffen ein personalisiertes und zukunftsorientiertes
            Bildungsangebot — von der aktiven Lernkultur bis zur
            demokratischen Gemeinschaft.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="cta"
              size="lg"
              className="text-base px-7 py-6 font-semibold shadow-lg shadow-accent/30"
            >
              <Link href="#eltern">
                <Backpack className="mr-2 h-5 w-5" />
                Für Eltern
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="text-base px-7 py-6 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
            >
              <Link href="#foerderer">
                <Lightbulb className="mr-2 h-5 w-5" />
                Für Förderer
              </Link>
            </Button>
          </div>
        </div>

        {/* Right panel — photo + floating badges */}
        <div className="relative lg:flex-1 min-h-[45vh] lg:min-h-0">
          <Image
            src="/images/hero-school.jpg"
            alt="Schülerinnen und Schüler der Stübi Hamburg"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Floating icon badges — echoes every other section */}
          <div className="hidden lg:flex absolute top-10 right-10 w-12 h-12 rounded-2xl bg-golden items-center justify-center rotate-6 shadow-lg z-10">
            <Sparkles className="h-5 w-5 text-foreground" />
          </div>
          <div className="hidden lg:flex absolute bottom-20 right-8 w-12 h-12 rounded-2xl bg-mint items-center justify-center -rotate-6 shadow-lg z-10">
            <Dumbbell className="h-5 w-5 text-foreground" />
          </div>

          {/* Dashed decorative circle — subtle, bottom-left of photo */}
          <svg
            className="hidden lg:block absolute bottom-16 left-8 opacity-30 pointer-events-none z-10"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray="7 5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Stat strip — banner.jpg language: colored icon badges */}
      <div className="relative z-10 bg-surface-ink">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {stats.map(({ icon: Icon, value, label, bg, iconColor }) => (
              <div key={label} className="flex items-center gap-3 py-5 px-4 sm:px-8">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`h-4 w-4 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm sm:text-base leading-none">{value}</p>
                  <p className="text-white/50 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
