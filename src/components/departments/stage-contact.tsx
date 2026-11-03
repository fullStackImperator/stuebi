import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { MailTopicMenu } from '@/components/contact/mail-topic-menu'
import { PortraitCard, PortraitFigure } from '@/components/contact/portrait-card'
import { telHref } from '@/components/departments/department-sections'
import { contactPeople, departmentContacts, officeHours, officeStaff, schoolAddress, schoolEmail } from '@/content/contacts'
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

// Long addresses wrap after the @, never inside a word.
function MailText({ email }: { email: string }) {
  return (
    <span>
      {email.split('@')[0]}@<wbr />
      {email.split('@')[1]}
    </span>
  )
}

/**
 * The Ansprechpartner as portraits (same style as on the start page) and the Schulbüro in the page colour,
 * with the people who answer its phone. People and office come from src/content/contacts; contact data
 * entered for the department in the CMS (Abteilungen → Kontakt) takes precedence.
 */
export function StageContact({
  slug,
  contact,
  color,
}: {
  slug: DepartmentSlug
  contact: Department['contact']
  color?: StageColor
}) {
  const { people, office } = departmentContacts[slug]
  const tone = color ?? departmentColor[slug]
  const head = contact?.head
  const officeLabel = contact?.office?.name || office.label
  const officePhone = contact?.office?.phone || office.phone
  const officeEmail = contact?.office?.email || schoolEmail
  const staff = officeStaff(slug)

  const heads = people.map((id, i) => {
    // The department head's CMS email and phone belong to the first person; otherwise the direct line.
    const email = (i === 0 && head?.email) || contactPeople[id].email
    const phone = (i === 0 && head?.phone) || contactPeople[id].phone
    return (
      <div key={id} className="col-span-2 sm:col-span-1 lg:w-64 lg:shrink-0">
        <PortraitCard id={id} sizes="(min-width: 1024px) 256px, (min-width: 640px) 50vw, 100vw" />
        {phone && (
          <a href={telHref(phone)} className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {phone}
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="mt-1 flex items-start gap-2 text-sm font-semibold text-primary hover:underline">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <MailText email={email} />
          </a>
        )}
      </div>
    )
  })

  const hours = contact?.office?.hours || officeHours

  const contactLines = (
    <>
      <a href={telHref(officePhone)} className="flex items-center gap-3 text-2xl font-black tracking-tight underline-offset-4 hover:underline">
        <Phone className="h-6 w-6 shrink-0" aria-hidden="true" />
        {officePhone}
      </a>
      <MailTopicMenu to={officeEmail} className="mt-4" triggerClassName="flex items-start gap-3 text-sm font-semibold underline-offset-4 hover:underline [&>svg:last-child]:mt-0.5">
        <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <MailText email={officeEmail} />
      </MailTopicMenu>
      <p className="mt-2 flex items-center gap-3 text-sm">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
        {schoolAddress}
      </p>
      <p className="mt-2 flex items-start gap-3 whitespace-pre-line text-sm">
        <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {hours}
      </p>
    </>
  )

  // The Ansprechpartner and, in the same row, one card in the page colour with the Schulbüro people
  // and how to reach them. The card arranges itself by its own width: portraits beside the contact, smaller
  // when two department heads leave less room, and above the contact on phones.
  return (
    <div data-stage-contact className="mt-12">
      <h3 className="mb-5 text-2xl font-extrabold text-foreground">Ihre Ansprechpartner</h3>
      <div className="grid grid-cols-2 gap-4 lg:flex">
        {heads}
        <div
          data-school-office
          className={cn('@container col-span-2 rounded-3xl p-4 sm:p-6 lg:flex-1', officeColor[tone])}
        >
          <div className="grid gap-6 @xl:grid-cols-[auto_1fr] @xl:items-center @xl:gap-8 @3xl:gap-10">
            <ul className="flex flex-wrap gap-4">
              {staff.map((m) => (
                <li key={m.email} data-office-person className="w-[calc(50%-0.5rem)] @md:w-32 @3xl:w-40">
                  {/* The small portraits have no room above the face for a badge, so the area goes below. */}
                  <PortraitFigure name={m.name} topic="" image={m.image} badgeClass="" sizes="(min-width: 640px) 160px, 50vw" className="[&_figcaption]:text-base" />
                  <p className="mt-2 text-sm font-bold leading-tight">{m.role}</p>
                  {m.phone && (
                    <a href={telHref(m.phone)} className="mt-1 flex items-center gap-1.5 text-xs font-semibold tabular-nums underline-offset-4 hover:underline">
                      <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {m.phone}
                    </a>
                  )}
                  <a href={`mailto:${m.email}`} className="mt-1 flex items-start gap-1.5 text-xs font-semibold underline-offset-4 hover:underline">
                    <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <MailText email={m.email} />
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-2 pb-2 sm:px-0 sm:pb-0">
              <p className="mb-4 text-2xl font-extrabold leading-tight">{officeLabel}</p>
              {contactLines}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
