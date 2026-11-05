import type { Metadata } from 'next'
import Image from 'next/image'
import { Check, Clock, Lock, Mail, Phone } from 'lucide-react'
import { InfoCard, PageIntro, PageSection } from '@/components/sections/page-parts'
import { contacts, counsellingTeacher, offers, teamPhoto, teamRows } from '@/content/beratung'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Beratung | Stübi Hamburg',
  description:
    'Der Beratungsdienst der Schule Stübenhofer Weg: vertrauliche Beratung für Schülerinnen und Schüler, Eltern und Lehrkräfte, die Beratungslehrerin und alle Kontakte.',
}

function Portrait({ src, name, className, sizes }: { src: string; name: string; className?: string; sizes: string }) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <Image src={src} alt={`Porträt von ${name}`} fill sizes={sizes} className="object-cover object-[50%_25%]" />
    </div>
  )
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

      {/* Her portrait on the left, stays in view while the text beside it scrolls; on phones it comes first. */}
      <section id="beratungslehrerin" data-tone="light" className="scroll-mt-20 md:scroll-mt-24 bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Portrait
              src={counsellingTeacher.image}
              name={counsellingTeacher.name}
              className="aspect-[4/5] max-h-[28rem] rounded-3xl max-lg:max-w-sm lg:max-h-none"
              sizes="(min-width: 1024px) 40vw, 384px"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-accent" />
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">{counsellingTeacher.role}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">{counsellingTeacher.name}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{counsellingTeacher.intro}</p>

            <h3 className="mt-10 mb-4 text-xl font-extrabold text-foreground">Um welche Anliegen geht es?</h3>
            <ul className="grid gap-x-8 gap-y-3 text-muted-foreground sm:grid-cols-2">
              {counsellingTeacher.topics.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-pretty">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <p data-note="vertraulich" className="flex gap-3 rounded-2xl bg-mint/25 p-5 text-foreground">
                <Lock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="text-pretty">{counsellingTeacher.confidential}</span>
              </p>
              <p data-note="sprechstunde" className="flex gap-3 rounded-2xl bg-golden/30 p-5 text-foreground">
                <Clock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="text-pretty">{counsellingTeacher.consultation}</span>
              </p>
            </div>
            <div className="mt-6 space-y-2">
              {counsellingTeacher.howToReach.map((t) => (
                <p key={t} className="text-sm leading-relaxed text-muted-foreground text-pretty">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

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
            <div key={p.email} className="overflow-hidden rounded-3xl bg-background shadow-sm">
              <Portrait src={p.image} name={p.name} className="aspect-[4/3] md:aspect-[4/5]" sizes="(min-width: 768px) 30vw, 100vw" />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">{p.role}</p>
                <p className="mt-2 text-xl font-extrabold text-foreground">{p.name}</p>
                <a
                  href={`mailto:${p.email}`}
                  className="mt-3 flex items-start gap-2 text-sm font-semibold text-primary hover:underline dark:text-foreground"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <MailText email={p.email} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
