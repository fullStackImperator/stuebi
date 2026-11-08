import { pageMetadata } from '@/lib/page-metadata'
import { StagePage } from '@/components/stufen/stage-page'

export const metadata = pageMetadata({ title: 'Grundschule', description: 'Die Grundschule am Campus Stübenhofer Weg: Lernzeiten statt Hausaufgaben, bewegtes Klassenzimmer, Lesezeiten und Talentgruppen.', path: '/grundschule' })

// Photo slots and dates come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default function GrundschulePage() {
  return <StagePage id="grundschule" />
}
