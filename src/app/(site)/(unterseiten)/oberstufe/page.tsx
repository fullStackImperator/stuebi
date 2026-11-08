import { pageMetadata } from '@/lib/page-metadata'
import { StagePage } from '@/components/stufen/stage-page'

export const metadata = pageMetadata({ title: 'Oberstufe', description: 'Die gymnasiale Oberstufe am Campus Stübenhofer Weg: Vorstufe, Profile Fair Play und Mein Start-Up, Voraussetzungen.', path: '/oberstufe' })

// Photo slots and dates come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default function OberstufePage() {
  return <StagePage id="oberstufe" />
}
