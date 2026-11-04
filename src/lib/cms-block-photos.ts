import type { Block } from '@/content/stufen'
import type { PageImage } from '@/payload-types'
import { toPhoto } from '@/lib/photo'

/** Blocks with a CMS photo slot show the uploaded photo; an empty slot keeps the school's own photo. */
export function withCmsPhotos(blocks: Block[], images: PageImage['ganztag'] | null | undefined): Block[] {
  return blocks.map((block) => {
    const uploaded = block.cmsPhoto ? toPhoto(images?.[block.cmsPhoto]) : null
    return uploaded ? { ...block, photo: uploaded } : block
  })
}
