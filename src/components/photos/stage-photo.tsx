import Image from 'next/image'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

// Photo inside a section or card: full width on phones, half the row from lg up. Empty slot → nothing.
export function StagePhoto({ photo, className }: { photo: Photo | null; className?: string }) {
  if (!photo) return null
  return (
    <div data-stage-photo className={cn('relative aspect-[4/3] w-full overflow-hidden rounded-3xl', className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        style={{ objectPosition: photo.objectPosition }}
      />
    </div>
  )
}
