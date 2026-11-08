import { pageMetadata } from '@/lib/page-metadata'
import { LegalText } from '@/components/legal/legal-text'
import { PageIntro } from '@/components/sections/page-parts'
import { impressum, legalUpdated } from '@/content/rechtliches'

export const metadata = pageMetadata({ title: 'Impressum', description: 'Anbieter, Kontakt und Verantwortliche der Website der Stadtteilschule Stübenhofer Weg.', path: '/impressum' })

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
