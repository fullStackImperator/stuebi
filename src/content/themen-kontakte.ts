import { contacts as beratung } from './beratung'
import { didacticLead } from './contacts'
import { ganztag } from './stufen/ganztag'
import { careersBlock, supportBlock } from './stufen/shared'
import type { BlockPerson, StageColor } from './stufen/types'

// Weitere Ansprechpartner nach Thema, unter den Abteilungsleitungen auf /anmeldung. Ohne Schulbüro: das steht
// darüber. Die Personen kommen aus den Inhalten der Seiten, auf denen sie vorgestellt werden.
export type TopicContact = { id: string; title: string; href: string; linkLabel: string; color: StageColor; people: BlockPerson[] }

const coordination = [...ganztag.everyday, ...(ganztag.extra ?? [])].find((b) => b.id === 'koordination')

export const topicContacts: TopicContact[] = [
  {
    id: 'unterricht',
    title: 'Unterricht & IVK',
    href: '/bildungswege#ivk',
    linkLabel: 'Mehr zur IVK',
    color: 'golden',
    people: [{ name: didacticLead.name, role: 'Didaktische Leitung · IVK', email: didacticLead.email, image: didacticLead.image }],
  },
  { id: 'beratung', title: 'Beratung', href: '/beratung', linkLabel: 'Mehr zur Beratung', color: 'mint', people: beratung.people },
  {
    id: 'foerderung',
    title: 'Förderung',
    href: '/mittelstufe#foerderung',
    linkLabel: 'Mehr zur Förderung',
    color: 'accent',
    people: supportBlock.people ?? [],
  },
  { id: 'ganztag', title: 'Ganztag', href: '/ganztag#koordination', linkLabel: 'Mehr zum Ganztag', color: 'primary', people: coordination?.people ?? [] },
  {
    id: 'berufsorientierung',
    title: 'Berufsorientierung',
    href: '/mittelstufe#berufsorientierung',
    linkLabel: 'Mehr zur Berufsorientierung',
    color: 'surface-ink',
    people: careersBlock.people ?? [],
  },
]
