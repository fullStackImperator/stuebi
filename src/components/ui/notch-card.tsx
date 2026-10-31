import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type NotchCardProps = {
  /** Without href the card is not a link and shows no notch or arrow (e.g. on /vision itself). */
  href?: string
  id?: string
  title: string
  /** null shows a plain coloured area. CMS uploads pass unoptimized, as their host varies. */
  image: { src: string; alt: string; position?: string; unoptimized?: boolean } | null
  sizes: string
  /** Aspect classes for the photo, e.g. 'aspect-[4/3]'. */
  aspect: string
  /** Background and text colour of the arrow button, e.g. 'bg-mint text-on-bright'. */
  tone: string
  /** Small label in the top-left corner of the photo. */
  badge?: React.ReactNode
  /** Extra classes for the title, e.g. its font size. */
  titleClass?: string
  /** 'below' puts the title under the photo, e.g. for news photos that carry their own text. */
  titlePlacement?: 'photo' | 'below'
  className?: string
  children: React.ReactNode
}

// Shared card of Leitvision, Für Eltern and News: photo with the title on it (or below it), the arrow
// button sitting in a notch cut out of the photo's bottom-right corner, the teaser below.
export function NotchCard({
  href,
  id,
  title,
  image,
  sizes,
  aspect,
  tone,
  badge,
  titleClass = 'text-xl sm:text-2xl',
  titlePlacement = 'photo',
  className,
  children,
}: NotchCardProps) {
  // Inner span, so a line-clamp in titleClass does not count the padding.
  const titleText = <span className={cn('block', titleClass, 'leading-tight')}>{title}</span>
  const body = (
    <>
      <div className={cn('relative w-full', aspect)}>
        <div data-notch-photo className={cn('absolute inset-0 overflow-hidden rounded-3xl bg-primary/15', href && 'notch-br')}>
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              unoptimized={image.unoptimized}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
              style={{ objectPosition: image.position }}
            />
          )}
          {titlePlacement === 'photo' && (
            <>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
              <h3 className={cn('absolute bottom-0 left-0 p-5 font-extrabold text-white text-balance', href ? 'pr-20' : 'pr-5')}>
                {titleText}
              </h3>
            </>
          )}
          {badge}
        </div>
        {href && (
          <span
            data-notch-arrow
            aria-hidden="true"
            className={cn(
              'absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-colors duration-300 group-hover:bg-surface-ink group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-surface-ink',
              tone,
            )}
          >
            <ArrowUpRight className="h-7 w-7" />
          </span>
        )}
      </div>
      {titlePlacement === 'below' && (
        <h3 className="pt-4 px-1 font-bold text-foreground text-balance transition-colors group-hover:text-primary">{titleText}</h3>
      )}
      <div className={cn('px-1 text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty', titlePlacement === 'below' ? 'pt-2' : 'pt-4')}>
        {children}
      </div>
    </>
  )

  return href ? (
    <Link
      id={id}
      href={href}
      data-notch-card
      className={cn('group block scroll-mt-24 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring', className)}
    >
      {body}
    </Link>
  ) : (
    <div id={id} data-notch-card className={cn('group', className)}>
      {body}
    </div>
  )
}
