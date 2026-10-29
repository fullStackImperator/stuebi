import { ganztag } from './ganztag'
import { grundschule } from './grundschule'
import { mittelstufe } from './mittelstufe'
import { oberstufe } from './oberstufe'
import type { StageContent, StageId } from './types'
import { vorschule } from './vorschule'

export type { Block, Point, StageColor, StageContent, StageId } from './types'

// Reihenfolge des Bildungswegs; „Nächste Stufe“ folgt ihr.
export const stageOrder: StageId[] = ['vorschule', 'grundschule', 'mittelstufe', 'oberstufe', 'ganztag']

export const stages: Record<StageId, StageContent> = { vorschule, grundschule, mittelstufe, oberstufe, ganztag }

export const stageHref = (id: StageId) => `/${id}`
