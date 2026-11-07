import type { Metadata } from 'next'
import { LegalText } from '@/components/legal/legal-text'
import { PageIntro } from '@/components/sections/page-parts'
import { impressum, legalUpdated } from '@/content/rechtliches'

export const metadata: Metadata = {
  title: 'Impressum | Stübi Hamburg',
  description: 'Anbieter, Kontakt und Verantwortliche der Website der Stadtteilschule Stübenhofer Weg.',
}

export default function ImpressumPage() {
  return (
    <>
      <PageIntro
        motif="brief"
        eyebrow="Rechtliches"
        color="surface-ink"
        title="Impressum"
        lead="Wer hinter dieser Seite steht und wie Sie uns erreichen."
      />
      <LegalText sections={impressum} updated={legalUpdated} />
    </>
  )
}
