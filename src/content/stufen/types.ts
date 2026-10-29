import type { Photo } from '@/lib/photo'

export type StageId = 'vorschule' | 'grundschule' | 'mittelstufe' | 'oberstufe' | 'ganztag'

export type StageColor = 'golden' | 'mint' | 'accent' | 'primary' | 'surface-ink'

export type Point = { title: string; text: string }

// Ein Abschnitt einer Stufenseite; `id` wird zur Anker-id der Section.
export type Block = {
  id: string
  heading: string
  intro?: string
  points?: Point[]
  paragraphs?: string[]
  placeholder?: string
}

export type StageContent = {
  id: StageId
  name: string
  grades: string
  lead: string
  // Ein Satz für die Kachel auf der Startseite und der Bildungswege-Übersicht.
  teaser: string
  color: StageColor
  photo: Photo
  // Feld im CMS-Global „Seitenbilder → Bildungswege“; ein dort gesetztes Foto hat Vorrang.
  photoSlot?: 'vorschule' | 'grundschule' | 'mittelstufe' | 'oberstufe'
  expect: Point[]
  everyday: Block[]
  extra?: Block[]
  support: boolean
  careers: boolean
  department?: 'primarstufe' | 'mittelstufe' | 'oberstufe'
  next?: StageId
}
