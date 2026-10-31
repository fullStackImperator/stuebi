import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PartnerLogos, PARTNER_COUNT } from '@/components/landingpage/partner-logos'
import { Cpu, Briefcase, ArrowRight } from 'lucide-react'

const highlights = [
  {
    icon: Cpu,
    label: 'Stübi-Makerspace',
    detail: '3D-Druck, Robotik & digitales Prototyping',
    color: 'bg-golden',
    iconColor: 'text-on-bright',
  },
  {
    icon: Briefcase,
    label: 'Berufsorientierung',
    detail: 'Praktika & duales Studium bei Aurubis u. v. m.',
    color: 'bg-mint',
    iconColor: 'text-on-bright',
  },
]

const stats = [
  { value: 'VSK–13', label: 'Jahrgänge', color: 'text-golden' },
  { value: String(PARTNER_COUNT), label: 'Partner & Förderer', color: 'text-mint' },
  { value: '2', label: 'Profilklassen', color: 'text-accent' },
]

export function SponsorsSection() {
  return (
    <section id="foerderer" className="py-24 bg-surface-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner.jpg-style: large dark rounded card */}
        <div className="rounded-3xl overflow-hidden flex flex-col lg:flex-row min-h-[480px]">
          {/* Left — photo panel */}
          <div className="relative lg:w-[40%] min-h-[280px] lg:min-h-0">
            <Image
              src="/images/hero-school.jpg"
              alt="Schülerinnen und Schüler der Stübi"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Gradient blending into dark panel on desktop */}
            <div className="hidden lg:block absolute inset-y-0 right-0 w-6 bg-gradient-to-r from-transparent to-surface-ink" />
          </div>

          {/* Right — dark content panel */}
          <div className="relative flex-1 bg-surface-ink px-8 sm:px-12 lg:px-14 py-12 lg:py-14 overflow-hidden flex flex-col justify-center">
            {/* Dashed circle decorations */}
            <svg
              className="absolute top-6 right-8 opacity-20 pointer-events-none"
              width="140"
              height="140"
              viewBox="0 0 140 140"
              aria-hidden="true"
            >
              <circle
                cx="70"
                cy="70"
                r="58"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="7 5"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="absolute -bottom-10 -left-10 opacity-10 pointer-events-none"
              width="180"
              height="180"
              viewBox="0 0 180 180"
              aria-hidden="true"
            >
              <circle
                cx="90"
                cy="90"
                r="74"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="7 5"
                strokeLinecap="round"
              />
            </svg>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                Für Förderer & Partner
              </span>
              <span className="flex-1 max-w-[60px] h-px bg-white/20" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              Fördern Sie die <span className="text-golden">Macher</span> von
              morgen.
            </h2>

            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-lg text-pretty">
              Bildungsgerechtigkeit braucht starke Partner. Helfen Sie uns,
              jungen Talenten in Wilhelmsburg Zugang zu modernster Technik und
              wertvollen Praxiserfahrungen zu ermöglichen.
            </p>

            {/* Highlight pills */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${h.color} flex items-center justify-center shrink-0`}
                  >
                    <h.icon className={`h-4 w-4 ${h.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-white leading-tight">
                      {h.label}
                    </p>
                    <p className="text-sm text-white/60 mt-1 leading-snug">
                      {h.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-x-10 mb-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className={`whitespace-nowrap text-xl sm:text-3xl font-extrabold ${s.color} leading-none`}
                  >
                    {s.value}
                  </p>
                  <p className="text-sm text-white/60 mt-2">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Button
                asChild
                className="rounded-full bg-golden text-on-bright hover:bg-golden/90 font-semibold gap-2 px-7 py-5"
              >
                <Link href="#kontakt">
                  Bildungspartner werden
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Partner logos below the card */}
        <div className="mt-20">
          <PartnerLogos />
        </div>
      </div>
    </section>
  )
}
