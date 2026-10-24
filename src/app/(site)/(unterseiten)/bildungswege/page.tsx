import type { Metadata } from 'next'
import { Baby, BookMarked, GraduationCap, School } from 'lucide-react'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'

export const metadata: Metadata = {
  title: 'Bildungswege | Stübi Hamburg',
  description: 'Stufen, Schullaufbahn und Abschlüsse an der Stadtteilschule Stübenhofer Weg – von der Vorschule bis zum Abitur.',
}

const stages = [
  { name: 'Vorschule', years: 'ab 5 Jahren', icon: Baby, color: 'bg-golden', iconColor: 'text-on-bright' },
  { name: 'Grundschule', years: 'Klasse 1–4', icon: School, color: 'bg-mint', iconColor: 'text-on-bright' },
  { name: 'Mittelstufe', years: 'Klasse 5–10', icon: BookMarked, color: 'bg-accent', iconColor: 'text-white' },
  { name: 'Oberstufe', years: 'Klasse 11–13', icon: GraduationCap, color: 'bg-primary', iconColor: 'text-white' },
]

const degrees = [
  { title: 'Erster allgemeinbildender Schulabschluss (ESA)', when: 'nach Klasse 9', accent: 'bg-golden' },
  { title: 'Mittlerer Schulabschluss (MSA)', when: 'nach Klasse 10', accent: 'bg-mint' },
  { title: 'Abitur', when: 'nach Klasse 13 in der Oberstufe', accent: 'bg-primary' },
]

export default function BildungswegePage() {
  return (
    <>
      <PageIntro
        eyebrow="Bildungswege"
        title="Gemeinsam von der Vorschule bis zum Abitur."
        lead="An der Stübi können Kinder ihre ganze Schulzeit an einem Ort verbringen: von der Vorschule über Grund- und Mittelstufe bis zur Oberstufe."
      />

      <PageSection id="stufen" eyebrow="Stufen" title="Vier Stufen unter einem Dach.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((stage) => (
            <div key={stage.name} className="rounded-3xl bg-surface-ink p-6 flex flex-col items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl ${stage.color} flex items-center justify-center`}>
                <stage.icon className={`h-5 w-5 ${stage.iconColor}`} />
              </div>
              <div>
                <p className="text-white font-bold">{stage.name}</p>
                <p className="text-white/50 text-sm mt-1">{stage.years}</p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="schullaufbahn"
        eyebrow="Schullaufbahn"
        title="Konzept eine Klasse."
        intro="Schulwechsel bedeuten oft Umbrüche. Mit unserem Konzept eine Klasse bleiben Schülerinnen und Schüler von der Einschulung bis zum Abschluss weitestgehend im selben Klassenverband – das gibt Sicherheit und Zugehörigkeit."
        tone="sand"
      >
        <Placeholder>Übergänge zwischen den Stufen (Vorschule → 1. Klasse, 4 → 5, 10 → Oberstufe) und was dabei passiert.</Placeholder>
      </PageSection>

      <PageSection id="abschluesse" eyebrow="Abschlüsse" title="Alle Abschlüsse an einer Schule.">
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {degrees.map((d) => (
            <InfoCard key={d.title} title={d.title} accent={d.accent}>
              <p>{d.when}</p>
            </InfoCard>
          ))}
        </div>
        <Placeholder>Profile der Oberstufe und Voraussetzungen für den Übergang.</Placeholder>
        <div className="mt-10">
          <NextLink href="/schwerpunkt">Weiter zu unseren Schwerpunkten</NextLink>
        </div>
      </PageSection>
    </>
  )
}
