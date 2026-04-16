import Image from 'next/image'

import { cn } from '@/lib/utils'

/** Logos under `public/images` — keep in sync with filenames on disk. */
export const PARTNER_BRANDS = [
  {
    name: 'Hamburg Towers',
    src: '/images/towers.svg',
    width: 160,
    height: 48,
  },
  {
    name: 'Hamburger Judo-Verband',
    src: '/images/hjv_bg.webp',
    width: 140,
    height: 48,
  },
  {
    name: 'Sport ohne Grenzen',
    src: '/images/sog_bg.png',
    width: 160,
    height: 48,
  },
  {
    name: 'Aurubis',
    src: '/images/logos-aurubis.svg',
    width: 140,
    height: 48,
  },
] as const

type PartnerLogosProps = {
  className?: string
  /** Applied to each logo image (e.g. invert on dark sections). */
  logoClassName?: string
  /** Shown above the logo row (default matches hero). */
  label?: string
  /** Override label colour (e.g. `text-background/70` on dark bands). */
  labelClassName?: string
  /** Hide the label line. */
  hideLabel?: boolean
}

export function PartnerLogos({
  className,
  logoClassName,
  label = 'Unsere Partner für Bildung & Sport',
  labelClassName,
  hideLabel = false,
}: PartnerLogosProps) {
  return (
    <div className={cn('text-center', className)}>
      {!hideLabel && (
        <p
          className={cn(
            'mb-6 text-sm text-muted-foreground',
            labelClassName,
          )}
        >
          {label}
        </p>
      )}
      <ul
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14"
        role="list"
      >
        {PARTNER_BRANDS.map((partner) => (
          <li
            key={partner.name}
            className="flex h-16 items-center justify-center sm:h-14 md:h-32"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              className={cn(
                'h-12 w-auto max-w-[min(100vw-2rem,11rem)] object-contain object-center opacity-90 transition-opacity hover:opacity-100 sm:h-10 md:h-32',
                logoClassName,
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
