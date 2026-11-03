import type { Metadata } from 'next'
import { BentoGrid } from '@/components/bento/bento-grid'
import { NextLink, PageIntro, PageSection } from '@/components/sections/page-parts'
import { PhotoBand } from '@/components/photos/photo-band'
import { Prinzipien } from '@/components/vision/prinzipien'
import { Saeulen } from '@/components/vision/saeulen'
import { Werte } from '@/components/vision/werte'
import { raum, visionFacts, werte } from '@/content/vision'
import { bentoCells } from '@/lib/bento'
import { getPageImages } from '@/lib/page-images'
import { bandFallbacks } from '@/lib/fallback-photos'
import { toPhoto } from '@/lib/photo'

export const metadata: Metadata = {
  title: 'Unsere Vision | Stübi Hamburg',
  description: 'Leitvision, Prinzipien, Campus und Werte der Stadtteilschule Stübenhofer Weg.',
}

// Photo slots come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

// Campus facts in the four logo colours, like the colour tiles elsewhere (white text on the darker pink).
const campusTiles = ['bg-primary text-primary-foreground', 'bg-mint text-on-bright', 'bg-golden text-on-bright', 'bg-accent-strong text-white']

export default async function VisionPage() {
  const { vision: img } = await getPageImages()

  return (
    <>
      <PageIntro
        motif="kompass"
        eyebrow="Unsere Vision"
        color="primary"
        title="Unser Leitbild."
        lead="Wir schaffen ein personalisiertes und zukunftsorientiertes Bildungsangebot für jedes Kind – von der Vorschule bis zum Abitur."
      />

      <div id="saeulen" className="scroll-mt-20 md:scroll-mt-24">
        <Saeulen />
      </div>

      <PhotoBand photo={toPhoto(img?.band?.image) ?? bandFallbacks.vision} caption={img?.band?.caption} />

      <PageSection
        id="prinzipien"
        eyebrow="Unsere Prinzipien"
        title="Woran wir uns orientieren."
        intro="Am Campus Stübenhofer Weg verbinden wir fachliches Lernen, persönliche Entwicklung und gesellschaftliche Teilhabe zu einem ganzheitlichen Konzept. Wissen wird bei uns durch echtes Handeln lebendig."
      >
        {/* Old links to the Kompass land here. */}
        <span id="kompass" aria-hidden="true" className="block scroll-mt-24" />
        <Prinzipien />
      </PageSection>

      <PageSection id="raum" eyebrow="Unser Campus" title="Lernen an jedem Ort." intro={raum.intro} tone="sand">
        <BentoGrid
          cells={bentoCells({ title: raum.photo, gallery: raum.gallery, facts: visionFacts, points: [raum.point] })}
          tileColors={campusTiles}
          quoteColor="bg-primary text-primary-foreground"
        />
      </PageSection>

      <PageSection id="werte" eyebrow="Unsere Werte" title="Was uns im Miteinander wichtig ist.">
        <Werte werte={werte} />
        <div className="mt-10">
          <NextLink href="/bildungswege">Weiter zu den Bildungswegen</NextLink>
        </div>
      </PageSection>
    </>
  )
}
