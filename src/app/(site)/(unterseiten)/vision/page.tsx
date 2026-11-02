import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { PortraitFigure } from '@/components/contact/portrait-card'
import { VisionSection } from '@/components/landingpage/vision-section'
import { InfoCard, NextLink, PageIntro, PageSection } from '@/components/sections/page-parts'
import { PhotoBand } from '@/components/photos/photo-band'
import { StagePhoto } from '@/components/photos/stage-photo'
import { VisionFacts } from '@/components/vision/facts'
import { Kompass } from '@/components/vision/kompass'
import { kompassPruefstein, kompassRichtungen, kompassZiel, leitgedanke, raum, visionFacts, werte } from '@/content/vision'
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
        motif="kompass"
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
      >
        <p data-leitgedanke className="mb-12 max-w-3xl font-quote text-3xl italic leading-snug text-foreground text-pretty sm:text-4xl">
          „{leitgedanke}“
        </p>
        <Kompass goal={kompassZiel} directions={kompassRichtungen} />
        {/* The test every plan has to pass, and who looks after it: one panel to close the section. */}
        <div data-kompass-pruefstein className="mt-16 grid items-center gap-8 rounded-3xl bg-surface-sand p-6 sm:grid-cols-[14rem_1fr] sm:p-10 lg:grid-cols-[16rem_1fr] lg:gap-12">
          <PortraitFigure
            name="Phoebe Lorenz"
            topic="Didaktische Leitung"
            image="/images/schulleitung/phoebe.jpg"
            badgeClass="bg-golden text-on-bright"
            sizes="(min-width: 640px) 256px, 100vw"
            className="w-full max-w-xs"
          />
          <div>
            <p className="font-quote text-2xl italic leading-snug text-foreground text-pretty sm:text-3xl">„{kompassPruefstein}“</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
              Darauf achtet unsere Didaktische Leitung. Bei Fragen zu Unterricht und Lernkonzepten ist Phoebe Lorenz Ihre
              Ansprechpartnerin.
            </p>
            <a
              href="mailto:phoebe.lorenz@stuebenhofer-weg.de"
              className="mt-4 inline-flex items-start gap-2 text-sm font-semibold text-primary hover:underline dark:text-foreground"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                phoebe.lorenz@
                <wbr />
                stuebenhofer-weg.de
              </span>
            </a>
          </div>
        </div>
      </PageSection>

      <PageSection id="raum" eyebrow="Unser Campus" title="Lernen an jedem Ort." tone="sand">
        <div data-vision-raum className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <StagePhoto photo={raum.photo} className="aspect-[4/3]" />
          <div>
            <h3 className="text-2xl font-extrabold leading-tight text-foreground">{raum.title}</h3>
            {raum.paragraphs.map((t) => (
              <p key={t} className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
                {t}
              </p>
            ))}
          </div>
        </div>
        <VisionFacts facts={visionFacts} />
      </PageSection>

      <PageSection id="werte" eyebrow="Unsere Werte" title="Was uns im Miteinander wichtig ist.">
        <div className="grid gap-5 sm:grid-cols-2">
          {werte.map((w) => (
            <InfoCard key={w.title} title={w.title} accent={w.accent}>
              <p>{w.text}</p>
            </InfoCard>
          ))}
        </div>
        <div className="mt-10">
          <NextLink href="/bildungswege">Weiter zu den Bildungswegen</NextLink>
        </div>
      </PageSection>
    </>
  )
}
