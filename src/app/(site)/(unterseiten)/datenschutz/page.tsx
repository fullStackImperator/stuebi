import type { Metadata } from 'next'
import { LegalText } from '@/components/legal/legal-text'
import { PageIntro } from '@/components/sections/page-parts'
import { datenschutz, legalUpdated } from '@/content/rechtliches'

export const metadata: Metadata = {
  title: 'Datenschutz | Stübi Hamburg',
  description: 'Welche Daten die Website der Stadtteilschule Stübenhofer Weg verarbeitet – und welche nicht.',
}

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
