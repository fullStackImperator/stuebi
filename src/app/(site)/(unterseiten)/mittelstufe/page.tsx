import { pageMetadata } from '@/lib/page-metadata'
import { StagePage } from '@/components/stufen/stage-page'

export const metadata = pageMetadata({ title: 'Mittelstufe', description: 'Die Mittelstufe am Campus Stübenhofer Weg: Beobachtungsstufe, Gymnasial- und Stadtteilschulzweig, Berufsorientierung.', path: '/mittelstufe' })

// Photo slots and dates come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60

export default function MittelstufePage() {
  return <StagePage id="mittelstufe" />
}
