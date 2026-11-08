import { pageMetadata } from '@/lib/page-metadata'
import { StagePage } from '@/components/stufen/stage-page'

export const metadata = pageMetadata({ title: 'Vorschule', description: 'Die Vorschule am Campus Stübenhofer Weg: Regeln und Struktur, Bewegung, Kreativität und der Kinderbauernhof.', path: '/vorschule' })

// Photo slots and dates come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default function VorschulePage() {
  return <StagePage id="vorschule" />
}
