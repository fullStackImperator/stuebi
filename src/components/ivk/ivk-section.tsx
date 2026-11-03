import { Mail, Phone } from 'lucide-react'
import { PortraitFigure } from '@/components/contact/portrait-card'
import { telHref } from '@/components/departments/department-sections'
import { didacticLead, officeTeam, schoolOffices, topicMailto } from '@/content/contacts'
import { ivk } from '@/content/ivk'

const yadi = officeTeam.flatMap((b) => b.members).find((m) => m.name === 'Yadigar Bayrakdar')

type Person = { name: string; topic: string; image?: string; badge: string; phone: string; mail: string; mailLabel: string }

const people: Person[] = [
  {
    name: didacticLead.name,
    topic: 'IVK-Koordination',
    image: didacticLead.image,
    badge: 'bg-golden text-on-bright',
    phone: didacticLead.phone,
    mail: `mailto:${didacticLead.email}`,
    mailLabel: didacticLead.email,
  },
  ...(yadi
    ? [
        {
          name: yadi.name,
          topic: 'Schulbüro · IVK',
          image: yadi.image,
          badge: 'bg-accent text-white',
          phone: schoolOffices.main.phone,
          mail: topicMailto('IVK', yadi.email),
          mailLabel: yadi.email,
        },
      ]
    : []),
]

/** The three IVK classes, what they learn, and the two people to contact – visible at a glance. */
export function IvkSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
      <div>
        <p className="max-w-3xl text-xl leading-relaxed text-foreground text-pretty">{ivk.intro}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {ivk.classes.map((c) => (
            <li key={c.name} data-ivk-class className={`flex min-h-32 flex-col justify-end rounded-2xl p-5 ${c.tile}`}>
              <p className="text-2xl font-black leading-none">{c.name}</p>
              <p className="mt-2 text-sm font-semibold leading-snug">{c.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          {ivk.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </div>

      <div data-ivk-contacts>
        <h3 className="mb-4 text-xl font-extrabold text-foreground">Ihre Ansprechpersonen für die IVK</h3>
        <ul className="grid grid-cols-2 gap-4 lg:w-[26rem]">
          {people.map((p) => (
            <li key={p.name}>
              <PortraitFigure name={p.name} topic={p.topic} image={p.image} badgeClass={p.badge} sizes="(min-width: 1024px) 208px, 50vw" className="[&_figcaption]:text-lg" />
              <a href={telHref(p.phone)} className="mt-3 flex items-center gap-1.5 text-sm font-semibold tabular-nums text-primary hover:underline dark:text-foreground">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {p.phone}
              </a>
              <a href={p.mail} className="mt-1 flex items-start gap-1.5 text-xs font-semibold text-primary hover:underline dark:text-foreground">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>
                  {p.mailLabel.split('@')[0]}@<wbr />
                  {p.mailLabel.split('@')[1]}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
