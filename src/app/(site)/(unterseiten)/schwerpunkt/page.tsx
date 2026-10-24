import type { Metadata } from 'next'
import { GraduationCap, Globe, Microscope, Music, Palette } from 'lucide-react'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'

export const metadata: Metadata = {
  title: 'Schwerpunkt | Stübi Hamburg',
  description: 'Sportteams, Stübi-Makerspace, Projekt Abgekocht! und individuelle Förderung – das macht die Stübi besonders.',
}

const extras = [
  { icon: Palette, label: 'Kunst & Theater' },
  { icon: Music, label: 'Musik & Chor' },
  { icon: Globe, label: 'Fremdsprachen' },
  { icon: GraduationCap, label: 'Schülerfirmen' },
  { icon: Microscope, label: 'Forschen & Staunen' },
]

export default function SchwerpunktPage() {
  return (
    <>
      <PageIntro
        eyebrow="Schwerpunkt"
        title="Das macht die Stübi besonders."
        lead="Wir lernen beim Machen: mit Sportteams, im Makerspace, in der Schulküche und mit viel Zeit für jedes einzelne Kind."
      />

      <PageSection id="besonderheiten" eyebrow="Unsere Besonderheiten" title="Lernen mit Kopf, Herz und Hand.">
        <div className="grid sm:grid-cols-2 gap-5">
          <InfoCard id="sport" title="Sportteams" accent="bg-accent">
            <p>Basketball, Judo & Fußball mit lizenzierten Trainern – auf dem Weg zur Partnerschule des Nachwuchsleistungssports.</p>
          </InfoCard>
          <InfoCard id="makerspace" title="Stübi-Makerspace" accent="bg-mint">
            <p>3D-Drucker, Robotik und digitales Prototyping – hier lernen Schülerinnen und Schüler spielerisch 21st Century Skills.</p>
          </InfoCard>
          <InfoCard id="abgekocht" title="Projekt Abgekocht!" accent="bg-golden">
            <p>Klassen kochen für die ganze Schule. Verantwortung, Teamwork und echte Küche – Gemeinschaft ganz praktisch.</p>
          </InfoCard>
          <InfoCard id="foerderung" title="Individuelle Förderung" accent="bg-primary">
            <p>Feste Lesezeiten und Lernzeiten statt klassischer Hausaufgaben – begleitet von Profis.</p>
          </InfoCard>
        </div>
      </PageSection>

      <PageSection id="mehr" eyebrow="Und außerdem" title="Noch mehr zu entdecken." tone="sand">
        <div className="flex flex-wrap gap-3 mb-8">
          {extras.map((e) => (
            <span key={e.label} className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium shadow-sm">
              <e.icon className="h-4 w-4 text-accent" />
              {e.label}
            </span>
          ))}
        </div>
        <Placeholder>Weitere Besonderheiten und Profile, z. B. Mein Start-Up.</Placeholder>
        <div className="mt-10">
          <NextLink href="/ganztag">Weiter zum Ganztag</NextLink>
        </div>
      </PageSection>
    </>
  )
}
