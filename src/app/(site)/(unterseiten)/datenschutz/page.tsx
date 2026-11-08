import { pageMetadata } from '@/lib/page-metadata'
import { LegalText } from '@/components/legal/legal-text'
import { PageIntro } from '@/components/sections/page-parts'
import { datenschutz, legalUpdated } from '@/content/rechtliches'

export const metadata = pageMetadata({ title: 'Datenschutz', description: 'Welche Daten die Website der Stadtteilschule Stübenhofer Weg verarbeitet – und welche nicht.', path: '/datenschutz' })

export default function DatenschutzPage() {
  return (
    <>
      <PageIntro
        motif="brief"
        eyebrow="Rechtliches"
        color="surface-ink"
        title="Datenschutz"
        lead="Diese Seite sammelt so wenig Daten wie möglich: keine Cookies, kein Tracking, keine eingebetteten Dienste."
      />
      <LegalText sections={datenschutz} updated={legalUpdated} />
    </>
  )
}
