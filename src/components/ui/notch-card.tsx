import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type NotchCardProps = {
  /** Without href the card is not a link and shows no notch or arrow (e.g. on /vision itself). */
  href?: string
  id?: string
  title: string
  image: { src: string; alt: string; position?: string }
  sizes: string
  /** Aspect classes for the photo, e.g. 'aspect-[4/3]'. */
  aspect: string
  /** Background and text colour of the arrow button, e.g. 'bg-mint text-on-bright'. */
  tone: string
  /** Small label in the top-left corner of the photo. */
  badge?: React.ReactNode
  /** Font size of the title on the photo. */
  titleSize?: string
  className?: string
  children: React.ReactNode
}

// Shared card of Leitvision and Für Eltern: photo with the title on it, the arrow button sitting in
// a notch cut out of the photo's bottom-right corner, the teaser below.
export function NotchCard({ href, id, title, image, sizes, aspect, tone, badge, titleSize = 'text-xl sm:text-2xl', className, children }: NotchCardProps) {
  const body = (
    <>
      <div className={cn('relative w-full', aspect)}>
        <div data-notch-photo className={cn('absolute inset-0 overflow-hidden rounded-3xl bg-muted', href && 'notch-br')}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
            style={{ objectPosition: image.position }}
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
          {badge}
          <h3 className={cn('absolute bottom-0 left-0 p-5 font-extrabold text-white text-balance', titleSize, 'leading-tight', href ? 'pr-20' : 'pr-5')}>
            {title}
          </h3>
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
      <div className="pt-4 px-1 text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">{children}</div>
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
