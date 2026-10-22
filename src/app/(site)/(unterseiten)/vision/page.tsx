import type { Metadata } from 'next'
import { VisionSection } from '@/components/landingpage/vision-section'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'

export const metadata: Metadata = {
  title: 'Unsere Vision | Stübi Hamburg',
  description: 'Leitvision, pädagogischer Kompass und Werte der Stadtteilschule Stübenhofer Weg.',
}

export default function VisionPage() {
  return (
    <>
      <PageIntro
        eyebrow="Unsere Vision"
        title="Wofür die Stübi steht."
        lead="Wir schaffen ein personalisiertes und zukunftsorientiertes Bildungsangebot für jedes Kind – von der Vorschule bis zum Abitur."
      />

      <div id="saeulen" className="scroll-mt-20 md:scroll-mt-24">
        <VisionSection />
      </div>

      <PageSection
        id="kompass"
        eyebrow="Pädagogischer Kompass"
        title="Woran wir uns orientieren."
        intro="Jede Maßnahme, jedes Vorhaben und jede Initiative wird daraufhin geprüft, ob sie unserem Entwicklungsziel dient."
      >
        <Placeholder>
          Der pädagogische Kompass der Stübi (Leitsätze und wie sie im Unterricht und im Schulalltag umgesetzt werden).
        </Placeholder>
      </PageSection>

      <PageSection id="werte" eyebrow="Unsere Werte" title="Was uns im Miteinander wichtig ist." tone="sand">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <InfoCard title="Verantwortung füreinander" accent="bg-primary">
            <p>Gemeinschaft wird praktisch gelebt, zum Beispiel wenn Klassen im Projekt Abgekocht! für die ganze Schule kochen.</p>
          </InfoCard>
          <InfoCard title="Zugehörigkeit" accent="bg-mint">
            <p>Mit dem Konzept eine Klasse bleiben Schülerinnen und Schüler möglichst lange im selben Klassenverband.</p>
          </InfoCard>
          <InfoCard title="Stärken stärken" accent="bg-accent">
            <p>Wir begleiten jedes Kind individuell im multiprofessionellen Jahrgangsteam.</p>
          </InfoCard>
        </div>
        <Placeholder>Die Werte der Stübi in den Worten der Schulgemeinschaft.</Placeholder>
        <div className="mt-10">
          <NextLink href="/bildungswege">Weiter zu den Bildungswegen</NextLink>
        </div>
      </PageSection>
    </>
  )
}
