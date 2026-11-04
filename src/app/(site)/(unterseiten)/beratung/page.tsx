import type { Metadata } from 'next'
import Image from 'next/image'
import { Check, Clock, Lock, Mail, Phone } from 'lucide-react'
import { InfoCard, PageIntro, PageSection } from '@/components/sections/page-parts'
import { contacts, counsellingTeacher, offers, teamPhoto, teamRows } from '@/content/beratung'

export const metadata: Metadata = {
  title: 'Beratung | Stübi Hamburg',
  description:
    'Der Beratungsdienst der Schule Stübenhofer Weg: vertrauliche Beratung für Schülerinnen und Schüler, Eltern und Lehrkräfte, die Beratungslehrerin und alle Kontakte.',
}

// Long addresses wrap after the @, not in the middle of the domain.
function MailText({ email }: { email: string }) {
  const [name, domain] = email.split('@')
  return (
    <span>
      {name}@<wbr />
      {domain}
    </span>
  )
}

// Accent stripe per offer group, in the site's colours.
const groupAccent = ['bg-mint', 'bg-golden', 'bg-accent']

export default function BeratungPage() {
  return (
    <>
      <PageIntro
        motif="brief"
        eyebrow="Beratung"
        color="mint"
        title="Wir sind für Sie da."
        lead="Für Schülerinnen und Schüler, Eltern und Lehrkräfte – bei persönlichen, familiären und schulischen Fragen. Freiwillig und vertraulich."
      />

      <PageSection id="team" eyebrow="Beratungsdienst" title="Unser Beratungsteam.">
        <figure>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-[16/9]">
            <Image
              src={teamPhoto.src}
              alt={teamPhoto.alt}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
              style={{ objectPosition: teamPhoto.objectPosition }}
            />
          </div>
          <figcaption className="mt-4 space-y-1 text-sm leading-relaxed text-muted-foreground">
            {teamRows.map((r) => (
              <p key={r.row}>
                <span className="font-semibold text-foreground">{r.row} von links:</span> {r.names.join(', ')}
              </p>
            ))}
          </figcaption>
        </figure>
      </PageSection>

      <PageSection id="angebot" eyebrow="Angebot" title="Was wir anbieten." tone="sand">
        <div className="grid gap-5 lg:grid-cols-3">
          {offers.map((o, i) => (
            <div key={o.title} data-offer-group>
              <InfoCard title={o.title} accent={groupAccent[i]}>
                <ul className="space-y-2">
                  {o.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary dark:text-foreground" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection id="beratungslehrerin" eyebrow={counsellingTeacher.role} title={counsellingTeacher.name} intro={counsellingTeacher.intro}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <h3 className="mb-4 text-xl font-extrabold text-foreground">Um welche Anliegen geht es?</h3>
            <ul className="space-y-3 text-muted-foreground">
              {counsellingTeacher.topics.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-pretty">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="flex gap-3 rounded-2xl bg-mint/25 p-5 text-foreground">
              <Lock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="text-pretty">{counsellingTeacher.confidential}</span>
            </p>
            <p className="flex gap-3 rounded-2xl bg-golden/30 p-5 text-foreground">
              <Clock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="text-pretty">{counsellingTeacher.consultation}</span>
            </p>
            {counsellingTeacher.howToReach.map((t) => (
              <p key={t} className="text-sm leading-relaxed text-muted-foreground text-pretty">
                {t}
              </p>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="kontakt-beratung" eyebrow="Kontakt" title="So erreichen Sie uns." tone="sand">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] opacity-80">Beratungsdienst</p>
            <a href={`mailto:${contacts.team.email}`} className="mt-3 flex items-start gap-2 font-bold hover:underline">
              <Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
              <MailText email={contacts.team.email} />
            </a>
            {contacts.team.phones.map((p) => (
              <a key={p.tel} href={p.tel} className="mt-2 flex items-center gap-2 font-semibold tabular-nums hover:underline">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {p.label}
              </a>
            ))}
          </div>
          {contacts.people.map((p) => (
            <div key={p.email} className="rounded-3xl bg-background p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">{p.role}</p>
              <p className="mt-2 text-xl font-extrabold text-foreground">{p.name}</p>
              <a href={`mailto:${p.email}`} className="mt-3 flex items-start gap-2 text-sm font-semibold text-primary hover:underline dark:text-foreground">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <MailText email={p.email} />
              </a>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
