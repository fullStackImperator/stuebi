import type { Block } from '@/content/stufen'
import type { PageImage } from '@/payload-types'
import { toPhoto, toPhotos } from '@/lib/photo'

/**
 * Blocks with a CMS photo slot show the uploaded photo, blocks with a CMS gallery the uploaded photos below the text;
 * an empty slot keeps the school's own photo or gallery.
 */
export function withCmsPhotos(blocks: Block[], images: PageImage['ganztag'] | null | undefined): Block[] {
  return blocks.map((block) => {
    const uploaded = block.cmsPhoto ? toPhoto(images?.[block.cmsPhoto]) : null
    const gallery = block.cmsGallery ? toPhotos(images?.[block.cmsGallery]) : []
    return {
      ...block,
      ...(uploaded && { photo: uploaded }),
      ...(gallery.length > 0 && { gallery }),
    }
  })
}
