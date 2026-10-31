import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { telHref } from '@/components/departments/department-sections'
import { contactPeople, departmentContacts, schoolAddress, schoolEmail } from '@/content/contacts'
import type { StageColor } from '@/content/stufen'
import { cn } from '@/lib/utils'
import type { Department } from '@/payload-types'

type DepartmentSlug = keyof typeof departmentContacts

// The Schulbüro half takes the page colour; navy text on the light colours, darker pink for white text.
const officeColor: Record<StageColor, string> = {
  golden: 'bg-golden text-on-bright',
  mint: 'bg-mint text-on-bright',
  accent: 'bg-accent-strong text-white',
  primary: 'bg-primary text-primary-foreground',
  'surface-ink': 'bg-surface-ink text-white dark:bg-white/15',
}

const ringColor: Record<StageColor, string> = {
  golden: 'ring-golden',
  mint: 'ring-mint',
  accent: 'ring-accent',
  primary: 'ring-primary',
  'surface-ink': 'ring-surface-ink dark:ring-white/40',
}

// Colour per department when the block is not on a Stufe page (e.g. /anmeldung).
const departmentColor: Record<DepartmentSlug, StageColor> = {
  primarstufe: 'mint',
  mittelstufe: 'accent',
  oberstufe: 'primary',
}

/**
 * One contact card: the Ansprechpartner with round portraits on the left, the Schulbüro in the page
 * colour on the right. People and office come from src/content/contacts; contact data entered for the
 * department in the CMS (Abteilungen → Kontakt) takes precedence.
 */
export function StageContact({ slug, contact, color }: { slug: DepartmentSlug; contact: Department['contact']; color?: StageColor }) {
  const { people, office } = departmentContacts[slug]
  const tone = color ?? departmentColor[slug]
  const head = contact?.head
  const officeLabel = contact?.office?.name || office.label
  const officePhone = contact?.office?.phone || office.phone
  const officeEmail = contact?.office?.email || schoolEmail

  return (
    <div data-stage-contact className="mt-12">
      <h3 className="mb-5 text-2xl font-extrabold text-foreground">Ihre Ansprechpartner</h3>
      <div className="grid overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-foreground/5 md:grid-cols-[3fr_2fr]">
        <ul className="divide-y divide-border px-6 sm:px-8">
          {people.map((id, i) => {
            const person = contactPeople[id]
            // The department head's CMS email and phone belong to the first person.
            const email = i === 0 ? head?.email : null
            const phone = i === 0 ? head?.phone : null
            return (
              <li key={id} data-contact-person className="flex items-center gap-5 py-6">
                <div className={cn('relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-offset-2 ring-offset-card sm:h-24 sm:w-24', ringColor[tone])}>
                  <Image src={person.image} alt={person.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-bold leading-tight text-foreground">{person.name}</p>
                  <p className="mt-1 text-muted-foreground">{person.topic}</p>
                  {phone && (
                    <a href={telHref(phone)} className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {phone}
                    </a>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className="mt-1 flex items-center gap-2 break-all text-sm font-semibold text-primary hover:underline">
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {email}
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </ul>

        <div data-school-office className={cn('flex flex-col justify-center p-6 sm:p-8', officeColor[tone])}>
          <p className="text-xl font-extrabold leading-tight">{officeLabel}</p>
          <a href={telHref(officePhone)} className="mt-4 flex items-center gap-3 text-2xl font-black tracking-tight underline-offset-4 hover:underline">
            <Phone className="h-6 w-6 shrink-0" aria-hidden="true" />
            {officePhone}
          </a>
          <a href={`mailto:${officeEmail}`} className="mt-4 flex items-center gap-3 break-all text-sm font-semibold underline-offset-4 hover:underline">
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            {officeEmail}
          </a>
          <p className="mt-2 flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {schoolAddress}
          </p>
          {contact?.office?.hours && <p className="mt-3 whitespace-pre-line text-sm">{contact.office.hours}</p>}
        </div>
      </div>
    </div>
  )
}
