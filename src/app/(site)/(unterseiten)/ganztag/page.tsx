import type { Metadata } from 'next'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'
import { StagePhoto } from '@/components/photos/stage-photo'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'

export const metadata: Metadata = {
  title: 'Ganztag | Stübi Hamburg',
  description: 'Betreuung, Nachmittagsangebote und Mensa an der Stadtteilschule Stübenhofer Weg.',
}

// Photo slots come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default async function GanztagPage() {
  const { ganztag: img } = await getPageImages()

  return (
    <>
      <PageIntro
        eyebrow="Ganztag"
        title="Gut begleitet durch den ganzen Tag."
        lead="Verlässliche Betreuung, ein vielfältiges Nachmittagsangebot und gesundes Essen für alle Kinder."
      />

      <PageSection
        id="betreuung"
        eyebrow="Betreuung"
        title="Verlässlich vom Morgen bis zum Nachmittag."
        intro="Verlässliche Begleitung am Nachmittag mit vielfältigen Kursen von Kunst bis Sport."
      >
        <Placeholder>Betreuungszeiten (auch Früh- und Spätbetreuung, Ferien), Kosten und Anmeldung zur Betreuung.</Placeholder>
      </PageSection>

      <PageSection id="nachmittag" eyebrow="Nachmittag" title="Kurse und AGs." tone="sand">
        <StagePhoto photo={toPhoto(img?.nachmittag)} className="mb-8 lg:aspect-[21/9]" />
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <InfoCard title="Lernzeiten" accent="bg-primary">
            <p>Feste Lese- und Lernzeiten statt klassischer Hausaufgaben.</p>
          </InfoCard>
          <InfoCard title="Sport" accent="bg-accent">
            <p>Basketball, Judo & Fußball mit lizenzierten Trainern.</p>
          </InfoCard>
          <InfoCard title="Kreativ & digital" accent="bg-mint">
            <p>Kunst & Theater, Musik & Chor und der Stübi-Makerspace.</p>
          </InfoCard>
        </div>
        <div className="max-w-3xl space-y-3 text-muted-foreground leading-relaxed mb-8">
          <p>
            <strong className="font-semibold text-foreground">In der Grundschule</strong> beginnt nach dem Unterricht die
            Entdeckungsreise: Ob Theater, Kunst, Musik oder Sport – jedes Kind wählt täglich aus, was ihm Spaß macht.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Ab Klasse 5</strong> kommen Informatik und Technik dazu. Der
            Ganztag bietet Kurse in Kunst, Kultur, Sport, Informatik und Technik.
          </p>
        </div>
        <Placeholder>Aktuelle Kurse und AGs mit Zeiten.</Placeholder>
      </PageSection>

      <PageSection
        id="mensa"
        eyebrow="Mensa"
        title="Gesundes Essen für alle."
        intro="Kostenloses Frühstück (Brotzeit) und ein gesundes Mittagessen für alle Kinder."
      >
        <StagePhoto photo={toPhoto(img?.mensa)} className="mb-8 lg:aspect-[21/9]" />
        <Placeholder>Essenszeiten, Speiseplan und Bestellung bzw. Abrechnung des Mittagessens.</Placeholder>
        <div className="mt-10">
          <NextLink href="/termine">Weiter zu den Terminen</NextLink>
        </div>
      </PageSection>
    </>
  )
}
