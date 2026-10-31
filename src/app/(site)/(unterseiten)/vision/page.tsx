import type { Metadata } from 'next'
import { VisionSection } from '@/components/landingpage/vision-section'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'
import { PhotoBand } from '@/components/photos/photo-band'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'

export const metadata: Metadata = {
  title: 'Unsere Vision | Stübi Hamburg',
  description: 'Leitvision, pädagogischer Kompass und Werte der Stadtteilschule Stübenhofer Weg.',
}

// Photo slots come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default async function VisionPage() {
  const { vision: img } = await getPageImages()

  return (
    <>
      <PageIntro
        eyebrow="Unsere Vision"
        color="primary"
        title="Unser Leitbild."
        lead="Wir schaffen ein personalisiertes und zukunftsorientiertes Bildungsangebot für jedes Kind – von der Vorschule bis zum Abitur."
      />

      <div id="saeulen" className="scroll-mt-20 md:scroll-mt-24">
        <VisionSection linked={false} />
      </div>

      <PhotoBand photo={toPhoto(img?.band?.image)} caption={img?.band?.caption} />

      <PageSection
        id="kompass"
        eyebrow="Pädagogischer Kompass"
        title="Woran wir uns orientieren."
        intro="Am Campus Stübenhofer Weg verbinden wir fachliches Lernen, persönliche Entwicklung und gesellschaftliche Teilhabe zu einem ganzheitlichen Konzept. Wissen wird bei uns durch echtes Handeln lebendig."
      />

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
