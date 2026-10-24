import Image from 'next/image'
import type { Photo } from '@/lib/photo'

// Edge-to-edge photo between sections: about 4:3 on phones, wide from lg up. Empty slot → nothing.
export function PhotoBand({ photo, caption }: { photo: Photo | null; caption?: string | null }) {
  if (!photo) return null
  return (
    <figure data-photo-band className="bg-surface">
      <div className="relative aspect-[4/3] lg:aspect-[21/9] w-full overflow-hidden">
        <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: photo.objectPosition }} />
      </div>
      {caption && (
        <figcaption className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  )
}
