import Image from 'next/image'
import { Camera } from 'lucide-react'
import type { Photo } from '@/lib/photo'

// Edge-to-edge photo between sections: about 4:3 on phones, wide from lg up.
// Empty slot → nothing, or with `slot` a "Foto folgt" placeholder naming where to upload the photo in the CMS.
export function PhotoBand({ photo, caption, slot }: { photo: Photo | null; caption?: string | null; slot?: string }) {
  if (!photo) {
    if (!slot) return null
    return (
      <div data-photo-band-placeholder className="bg-surface px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex aspect-[4/3] max-w-7xl flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-golden bg-golden/10 p-6 text-center text-sm text-foreground sm:aspect-[21/9]">
          <Camera className="h-7 w-7" aria-hidden="true" />
          <p>
            <strong className="block text-base">Foto folgt</strong>
            Breites Foto im CMS einsetzen: {slot}
          </p>
        </div>
      </div>
    )
  }
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
