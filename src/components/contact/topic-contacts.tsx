import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { tileTint } from '@/components/stufen/highlight-tiles'
import { topicContacts, type TopicContact } from '@/content/themen-kontakte'
import type { BlockPerson } from '@/content/stufen/types'

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')

// The photo flush left from top to bottom; without a photo the initials on the topic tint, so the gap shows.
function Portrait({ person, topic }: { person: BlockPerson; topic: TopicContact }) {
  return (
    <div data-portrait className={`relative min-h-24 w-20 shrink-0 overflow-hidden ${tileTint[topic.color]}`}>
      {person.image ? (
        <Image src={person.image} alt={person.name} fill sizes="80px" className="object-cover object-top" />
      ) : (
        <span data-initials className="absolute inset-0 flex items-center justify-center text-lg font-black text-foreground/60">
          {initials(person.name)}
        </span>
      )}
    </div>
  )
}

/** Further contacts by topic as small business cards, below the department heads on /anmeldung. No Schulbüro: it has its own section. */
export function TopicContacts() {
  return (
    <div data-topic-contacts className="mt-16">
      <h3 className="text-2xl font-extrabold text-foreground sm:text-3xl">Weitere Ansprechpartner nach Thema</h3>
      <p className="mt-2 mb-6 max-w-2xl text-muted-foreground text-pretty">
        Für Fragen zu Unterricht, Beratung, Förderung, Ganztag und Berufsorientierung.
      </p>
      <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {topicContacts.map((t) => (
          <div key={t.id} data-topic>
            <h4 className="mb-3 text-lg font-extrabold text-foreground">{t.title}</h4>
            <ul className="space-y-3">
              {t.people.map((p) => (
                <li key={p.name} className="flex overflow-hidden rounded-2xl bg-surface">
                  <Portrait person={p} topic={t} />
                  <div className="min-w-0 p-3">
                    <p className="font-extrabold leading-tight text-foreground">{p.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-muted-foreground">{p.role}</p>
                    {p.email && (
                      <a href={`mailto:${p.email}`} className="mt-1.5 flex items-start gap-1.5 text-xs font-semibold text-primary hover:underline dark:text-foreground">
                        <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {/* Long addresses wrap after the @, never inside a word. */}
                        <span>
                          <span className="whitespace-nowrap">{p.email.split('@')[0]}@</span>
                          <wbr />
                          <span className="whitespace-nowrap">{p.email.split('@')[1]}</span>
                        </span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Link href={t.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline">
              {t.linkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
