import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { MailTopicMenu } from '@/components/contact/mail-topic-menu'
import Image from 'next/image'
import { badge } from '@/components/contact/portrait-card'
import { telHref } from '@/components/departments/department-sections'
import { contactPeople, departmentContacts, officeHours, officeStaff, schoolAddress, schoolEmail } from '@/content/contacts'
import { tileTint } from '@/components/stufen/highlight-tiles'
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
      <span className="whitespace-nowrap">{email.split('@')[0]}@</span>
      <wbr />
      <span className="whitespace-nowrap">{email.split('@')[1]}</span>
    </span>
  )
}

/**
 * The Ansprechpartner as business cards in a light tint of the page colour and the Schulbüro in the page
 * colour, with the people who answer its phone. People and office come from src/content/contacts; contact data
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

  const tint = tileTint[tone]

  // Each head as a business card: photo on the left, topic, name and direct line on the right.
  const heads = people.map((id, i) => {
    const person = contactPeople[id]
    // The department head's CMS email and phone belong to the first person; otherwise the direct line.
    const email = (i === 0 && head?.email) || person.email
    const phone = (i === 0 && head?.phone) || person.phone
    return (
      <div key={id} data-contact-person className={cn('flex overflow-hidden rounded-3xl', tint)}>
        <div className="relative w-28 shrink-0 sm:w-40">
          <Image src={person.image} alt={person.name} fill sizes="160px" className="object-cover object-top" />
        </div>
        <div className="min-w-0 p-4 sm:p-6">
          <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-bold', badge[id])}>{person.topic}</span>
          <p className="mt-3 text-lg font-extrabold leading-tight text-foreground">{person.name}</p>
          <div className="mt-3 space-y-1.5 text-primary dark:text-foreground">
            {phone && (
              <a href={telHref(phone)} className="flex items-center gap-2 text-sm font-semibold tabular-nums hover:underline">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-start gap-2 text-sm font-semibold hover:underline">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <MailText email={email} />
              </a>
            )}
          </div>
        </div>
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

  // The Schulbüro in the page colour: how to reach it, and the people behind it as small photos with
  // their own line and mail. The card arranges itself by its own width (contact beside or above the people).
  const officeCard = (
    <div data-school-office className={cn('@container rounded-3xl p-5 sm:p-8', officeColor[tone])}>
      <div className="grid gap-6 @3xl:grid-cols-[minmax(0,1fr)_auto] @3xl:items-center @3xl:gap-10">
        <div>
          <p className="mb-4 text-2xl font-extrabold leading-tight">{officeLabel}</p>
          {contactLines}
        </div>
        <ul className="grid grid-cols-2 gap-4 @3xl:flex @3xl:gap-6">
          {staff.map((m) => (
            <li key={m.email} data-office-person className="min-w-0 @3xl:w-40">
              <div className="relative aspect-[5/6] w-24 overflow-hidden rounded-2xl bg-black/10 @md:w-28">
                <Image src={m.image} alt={m.name} fill sizes="112px" className="object-cover object-top" />
              </div>
              <p className="mt-3 font-extrabold leading-tight">{m.name}</p>
              <p className="mt-0.5 text-xs font-semibold opacity-85">{m.role}</p>
              {m.phone && (
                <a href={telHref(m.phone)} className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold tabular-nums underline-offset-4 hover:underline">
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
      </div>
    </div>
  )

  // With one head the row of two cards stays as on the Mittelstufe: the head beside the Schulbüro's own
  // contact, and the people behind the Schulbüro as a band below.
  if (people.length === 1)
    return (
      <div data-stage-contact className="mt-12">
        <h3 className="mb-5 text-2xl font-extrabold text-foreground">Ihre Ansprechpartner</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {heads}
          <div data-school-office className={cn('rounded-3xl p-5 sm:p-6', officeColor[tone])}>
            <p className="mb-3 text-lg font-extrabold leading-tight">{officeLabel}</p>
            {contactLines}
          </div>
        </div>
        <div data-office-band className={cn('mt-4 flex flex-col gap-5 rounded-3xl p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-10', officeColor[tone])}>
          <p className="text-sm font-bold opacity-85 lg:shrink-0 lg:whitespace-nowrap">Im Schulbüro für Sie da</p>
          <ul className="grid gap-5 sm:grid-cols-2 lg:flex lg:gap-10">
            {staff.map((m) => (
              <li key={m.email} data-office-person className="flex min-w-0 items-center gap-4">
                <div className="relative aspect-[5/6] w-16 shrink-0 overflow-hidden rounded-xl bg-black/10">
                  <Image src={m.image} alt={m.name} fill sizes="64px" className="object-cover object-top" />
                </div>
                <div className="min-w-0">
                  <p className="font-extrabold leading-tight">{m.name}</p>
                  <p className="mt-0.5 text-xs font-semibold opacity-85">{m.role}</p>
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )

  // Two heads share a row above the Schulbüro card.
  return (
    <div data-stage-contact className="mt-12">
      <h3 className="mb-5 text-2xl font-extrabold text-foreground">Ihre Ansprechpartner</h3>
      <div className="grid gap-4 md:grid-cols-2">{heads}</div>
      <div className="mt-4">{officeCard}</div>
    </div>
  )
}
