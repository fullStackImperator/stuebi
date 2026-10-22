import type { Metadata } from 'next'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'

export const metadata: Metadata = {
  title: 'Ganztag | Stübi Hamburg',
  description: 'Betreuung, Nachmittagsangebote und Mensa an der Stadtteilschule Stübenhofer Weg.',
}

export default function GanztagPage() {
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
        <Placeholder>Aktuelles Kursangebot am Nachmittag.</Placeholder>
      </PageSection>

      <PageSection
        id="mensa"
        eyebrow="Mensa"
        title="Gesundes Essen für alle."
        intro="Kostenloses Frühstück (Brotzeit) und ein gesundes Mittagessen für alle Kinder."
      >
        <Placeholder>Essenszeiten, Speiseplan und Bestellung bzw. Abrechnung des Mittagessens.</Placeholder>
        <div className="mt-10">
          <NextLink href="/termine">Weiter zu den Terminen</NextLink>
        </div>
      </PageSection>
    </>
  )
}
