import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { PortraitFigure } from '@/components/contact/portrait-card'
import { VisionSection } from '@/components/landingpage/vision-section'
import { InfoCard, NextLink, PageIntro, PageSection } from '@/components/sections/page-parts'
import { PhotoBand } from '@/components/photos/photo-band'
import { StagePhoto } from '@/components/photos/stage-photo'
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
        <p className="mt-10 max-w-2xl border-l-4 border-golden pl-4 text-base leading-relaxed text-muted-foreground text-pretty">
          {kompassPruefstein}
        </p>

        {/* The didactic lead, who is responsible for the Kompass. */}
        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <PortraitFigure
            name="Phoebe Lorenz"
            topic="Didaktische Leitung"
            image="/images/schulleitung/phoebe.jpg"
            badgeClass="bg-golden text-on-bright"
            sizes="(min-width: 640px) 256px, 100vw"
            className="w-full max-w-xs shrink-0 sm:w-64"
          />
          <div className="max-w-md">
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Wie wir unterrichten und Lernen weiterentwickeln, liegt bei unserer Didaktischen Leitung. Bei Fragen zu
              Unterricht und Lernkonzepten ist Phoebe Lorenz Ihre Ansprechpartnerin.
            </p>
            <a
              href="mailto:phoebe.lorenz@stuebenhofer-weg.de"
              className="mt-4 flex items-start gap-2 text-sm font-semibold text-primary hover:underline"
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
        {/* The school in numbers. */}
        <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {visionFacts.map((f) => (
            // Label below the value visually, but first for screen readers.
            <div key={f.label} data-vision-fact className="flex flex-col-reverse rounded-2xl bg-surface p-5 shadow-sm">
              <dt className="mt-1 text-sm leading-snug text-muted-foreground">{f.label}</dt>
              <dd className="text-2xl font-black leading-tight text-primary sm:text-3xl dark:text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
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
