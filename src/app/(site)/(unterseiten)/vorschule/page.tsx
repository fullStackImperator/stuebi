import type { Metadata } from 'next'
import { StagePage } from '@/components/stufen/stage-page'

export const metadata: Metadata = {
  title: 'Vorschule | Stübi Hamburg',
  description: 'Die Vorschule am Campus Stübenhofer Weg: Regeln und Struktur, Bewegung, Kreativität und der Kinderbauernhof.',
}

// Photo slots and dates come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default function VorschulePage() {
  return <StagePage id="vorschule" />
}
