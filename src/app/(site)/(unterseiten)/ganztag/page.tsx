import type { Metadata } from 'next'
import { StagePage } from '@/components/stufen/stage-page'

export const metadata: Metadata = {
  title: 'Ganztag | Stübi Hamburg',
  description: 'Der Ganztag am Campus Stübenhofer Weg: rhythmisierter Schultag, Lernzeiten, Kurse und AGs, Schulbibliothek und Mittagessen.',
}

// Refresh at most a minute after an editor changes CMS content.
export const revalidate = 60

export default function GanztagPage() {
  return <StagePage id="ganztag" />
}
