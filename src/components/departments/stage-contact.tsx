import { Mail, MapPin, Phone } from 'lucide-react'
import { PortraitCard } from '@/components/contact/portrait-card'
import { telHref } from '@/components/departments/department-sections'
import { departmentContacts, schoolAddress, schoolEmail } from '@/content/contacts'
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

// Colour per department when the block is not on a Stufe page (e.g. /anmeldung).
const departmentColor: Record<DepartmentSlug, StageColor> = {
  primarstufe: 'mint',
  mittelstufe: 'accent',
  oberstufe: 'primary',
}

/**
 * The Ansprechpartner as portraits (same style as on the start page) next to the Schulbüro in the
 * page colour. People and office come from src/content/contacts; contact data entered for the
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
      {/* Phones: portraits two side by side, Schulbüro below. From lg: one row, Schulbüro fills the rest. */}
      <div className="grid grid-cols-2 gap-4 lg:flex">
        {people.map((id, i) => {
          // The department head's CMS email and phone belong to the first person.
          const email = i === 0 ? head?.email : null
          const phone = i === 0 ? head?.phone : null
          return (
            <div key={id} className="lg:w-64 lg:shrink-0">
              <PortraitCard id={id} sizes="(min-width: 1024px) 256px, 50vw" />
              {phone && (
                <a href={telHref(phone)} className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
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
          )
        })}

        <div data-school-office className={cn('col-span-2 flex flex-col justify-center rounded-3xl p-6 sm:p-8 lg:flex-1', officeColor[tone])}>
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
