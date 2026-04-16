import Link from 'next/link'
import { PartnerLogos } from '@/components/landingpage/partner-logos'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Cpu, Briefcase, ArrowRight, Handshake } from 'lucide-react'

const projects = [
  {
    icon: Cpu,
    title: 'Der Stübi-Makerspace',
    description:
      'Unterstützen Sie unsere High-Tech-Werkstatt. Hier lernen Kinder durch Prototyping und Experimentieren wichtige Zukunftskompetenzen – von 3D-Druck bis Robotik.',
  },
  {
    icon: Briefcase,
    title: 'Berufsorientierung & Start-Ups',
    description:
      'Bieten Sie Praktika an oder ermöglichen Sie ein Duales Studium bei Kooperationspartnern wie Aurubis. Unsere Profile Fair Play und Mein Start-Up bereiten Jugendliche auf die Zukunft vor.',
  },
]

export function SponsorsSection() {
  return (
    <section id="foerderer" className="py-24 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 text-background text-sm font-medium mb-4">
              <Handshake className="h-4 w-4" />
              Für Förderer & Partner
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-background mb-4">
              Fördern Sie die Macher von morgen
            </h2>
            <p className="text-lg text-background/70 mb-6 text-pretty leading-relaxed">
              Bildungsgerechtigkeit braucht starke Partner. Helfen Sie uns,
              unser{' '}
              <strong className="text-background">
                zukunftsorientiertes Bildungsangebot
              </strong>{' '}
              weiter auszubauen und jungen Talenten in Wilhelmsburg den Zugang
              zu modernster Technik und wertvollen Praxiserfahrungen zu
              ermöglichen.
            </p>
            <p className="text-background/60 mb-8 text-pretty">
              Wir sind auf dem Weg zur Partnerschule des
              Nachwuchsleistungssports und suchen Unternehmen und Stiftungen,
              die unsere Vision teilen.
            </p>
            <Button asChild variant="secondary" className="gap-2">
              <Link href="#kontakt">
                Werden Sie Bildungspartner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            {/* <div className="mt-12 rounded-2xl border border-background/15 bg-background/5 p-6">
              <PartnerLogos
                label="Unsere Partner für Bildung & Sport"
                labelClassName="text-background/70"
                logoClassName="brightness-0 invert opacity-95 hover:opacity-100"
              />
            </div> */}
          </div>

          {/* Right Content - Project Cards */}
          <div className="space-y-6">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="bg-background/5 border-background/10 text-background"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center mb-2">
                    <project.icon className="h-6 w-6 text-background" />
                  </div>
                  <CardTitle className="text-background">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-background/70 text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-background">VSK–13</p>
                <p className="text-sm text-background/60">Jahrgänge</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-background">4+</p>
                <p className="text-sm text-background/60">Sportpartner</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-background">2</p>
                <p className="text-sm text-background/60">Profilklassen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
