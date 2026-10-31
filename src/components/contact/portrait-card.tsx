import Image from 'next/image'
import { contactPeople, type ContactPersonId } from '@/content/contacts'
import { cn } from '@/lib/utils'

// Badge colour per person, the same on the start page and the department contact cards.
const badge: Record<ContactPersonId, string> = {
  otto: 'bg-golden text-on-bright',
  sabadija: 'bg-mint text-on-bright',
  sens: 'bg-accent text-white',
  behrendt: 'bg-primary text-white',
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

/**
 * Full-bleed portrait with the topic as a badge and the name on a gradient. Without a photo the
 * person's initials fill the card, so a missing photo still looks intended.
 */
export function PortraitFigure({
  name,
  topic,
  image,
  badgeClass,
  sizes,
  className,
}: {
  name: string
  topic: string
  image?: string
  badgeClass: string
  sizes: string
  className?: string
}) {
  return (
    <figure data-contact-person className={cn('relative aspect-[5/6] overflow-hidden rounded-3xl bg-surface-ink', className)}>
      {image ? (
        <Image src={image} alt={name} fill sizes={sizes} className="object-cover object-center" />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-primary pb-8 text-7xl font-black tracking-tight text-white/40">
          {initials(name)}
        </span>
      )}

      {/* Bottom gradient keeps the name readable on any photo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />

      <span className={cn('absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm', badgeClass)}>{topic}</span>

      <figcaption className="absolute bottom-5 left-5 right-5 text-xl font-bold leading-none text-white">{name}</figcaption>
    </figure>
  )
}

/** Portrait of one of the school's fixed contact people (src/content/contacts). */
export function PortraitCard({ id, sizes, className }: { id: ContactPersonId; sizes: string; className?: string }) {
  const person = contactPeople[id]
  return <PortraitFigure name={person.name} topic={person.topic} image={person.image} badgeClass={badge[id]} sizes={sizes} className={className} />
}
