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

/** Full-bleed portrait with the topic as a badge and the name on a gradient. */
export function PortraitCard({ id, sizes, className }: { id: ContactPersonId; sizes: string; className?: string }) {
  const person = contactPeople[id]
  return (
    <figure data-contact-person className={cn('relative aspect-[5/6] overflow-hidden rounded-3xl bg-surface-ink', className)}>
      <Image src={person.image} alt={person.name} fill sizes={sizes} className="object-cover object-center" />

      {/* Bottom gradient keeps the name readable on any photo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />

      <span className={cn('absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm', badge[id])}>{person.topic}</span>

      <figcaption className="absolute bottom-5 left-5 right-5 text-xl font-bold leading-none text-white">{person.name}</figcaption>
    </figure>
  )
}
