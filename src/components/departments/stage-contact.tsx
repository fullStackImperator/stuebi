import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { telHref } from '@/components/departments/department-sections'
import { contactPeople, departmentContacts, schoolAddress, schoolEmail } from '@/content/contacts'
import type { Department } from '@/payload-types'

type DepartmentSlug = keyof typeof departmentContacts

/**
 * Ansprechpartner with photo next to the Schulbüro. People and office come from src/content/contacts;
 * contact data entered for the department in the CMS (Abteilungen → Kontakt) takes precedence.
 */
export function StageContact({ slug, contact }: { slug: DepartmentSlug; contact: Department['contact'] }) {
  const { people, office } = departmentContacts[slug]
  const head = contact?.head
  const officeLabel = contact?.office?.name || office.label
  const officePhone = contact?.office?.phone || office.phone
  const officeEmail = contact?.office?.email || schoolEmail

  return (
    <div data-stage-contact className="mt-12">
      <h3 className="mb-5 text-2xl font-extrabold text-foreground">Ihre Ansprechpartner</h3>
      {/* Portraits at a fixed size (two side by side on phones); the Schulbüro takes the rest of the row. */}
      <div className="flex flex-wrap gap-4">
        {people.map((id, i) => {
          const person = contactPeople[id]
          // The department head's CMS email and phone belong to the first person.
          const email = i === 0 ? head?.email : null
          const phone = i === 0 ? head?.phone : null
          return (
            <figure key={id} data-contact-person className="w-[calc(50%-0.5rem)] sm:w-52">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-ink">
                <Image src={person.image} alt={person.name} fill sizes="(min-width: 640px) 208px, 50vw" className="object-cover" />
              </div>
              <figcaption className="mt-4">
                <p className="font-bold leading-tight text-foreground">{person.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{person.topic}</p>
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
              </figcaption>
            </figure>
          )
        })}

        <div data-school-office className="flex w-full flex-col justify-end rounded-3xl bg-surface-ink p-7 text-white dark:bg-white/10 sm:w-auto sm:min-w-72 sm:flex-1">
          <p className="text-2xl font-extrabold leading-tight">{officeLabel}</p>
          <a href={telHref(officePhone)} className="mt-6 flex items-center gap-3 text-xl font-bold hover:underline">
            <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
            {officePhone}
          </a>
          <a href={`mailto:${officeEmail}`} className="mt-3 flex items-center gap-3 break-all text-sm hover:underline">
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            {officeEmail}
          </a>
          <p className="mt-3 flex items-center gap-3 text-sm text-white/90">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {schoolAddress}
          </p>
          {contact?.office?.hours && <p className="mt-3 whitespace-pre-line text-sm text-white/90">{contact.office.hours}</p>}
        </div>
      </div>
    </div>
  )
}
