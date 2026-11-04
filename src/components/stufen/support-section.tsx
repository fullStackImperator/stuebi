import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Languages, Mail, MessageCircle, Phone, Sprout } from 'lucide-react'
import { StagePhoto } from '@/components/photos/stage-photo'
import Image from 'next/image'
import Link from 'next/link'
import type { Block } from '@/content/stufen'
import type { Photo } from '@/lib/photo'
import { cn } from '@/lib/utils'

// Initials tiles until there are photos, in three site colours (darker pink for white text).
const initialsTile = ['bg-mint text-on-bright', 'bg-golden text-on-bright', 'bg-accent-strong text-white']
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')

// One icon per offer, in the order of supportBlock.points.
const icons: LucideIcon[] = [Languages, Sprout, MessageCircle]

/** Mail address that only breaks after the @. */
function MailText({ email }: { email: string }) {
  return (
    <span>
      {email.split('@')[0]}@<wbr />
      <span className="whitespace-nowrap">{email.split('@')[1]}</span>
    </span>
  )
}

/**
 * „Förderung & Beratung“: photo beside the three offers, then one card in the Stufe colour with both contacts –
 * the Beratungsdienst (Sprechstunde, mail, phone) and the Förderkoordination (the people with their mail).
 */
export function SupportBody({ block, photo, iconTile }: { block: Block; photo: Photo; iconTile: string }) {
  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div data-support-photo>
          <StagePhoto photo={photo} />
        </div>
        <ul className="flex flex-col gap-7">
          {block.points?.map((p, i) => {
            const Icon = icons[i % icons.length]
            return (
              <li key={p.title} className="flex gap-4">
                <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', iconTile)}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-tight text-foreground">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-foreground/80">{p.text}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div data-support-contacts className={cn('mt-12 grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10', iconTile)}>
        <div data-beratungsdienst className="border-b border-current/25 pb-8 lg:border-r lg:border-b-0 lg:pb-0 lg:pr-10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] opacity-80">Beratungsdienst</p>
          <h3 className="mt-1 text-2xl font-extrabold leading-tight">Vertraulich beraten</h3>
          {block.paragraphs?.map((text) => (
            <p key={text} className="mt-2 text-sm leading-relaxed opacity-90 text-pretty">
              {text}
            </p>
          ))}
          {block.links && (
            <div className="mt-5 flex flex-wrap gap-2">
              {block.links.map((l) => {
                const phone = l.href.startsWith('tel:')
                const Icon = phone ? Phone : Mail
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={cn(
                      'inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5',
                      phone ? 'ring-2 ring-inset ring-current/30' : 'bg-surface text-foreground shadow-sm',
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {phone ? l.label : <MailText email={l.label} />}
                  </a>
                )
              })}
            </div>
          )}
          {/* The whole offer, the team and the counselling teacher on their own page. */}
          <Link
            href="/beratung"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            Mehr zum Beratungsdienst
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {block.people && (
          <div data-foerderkoordination>
            <p className="text-xs font-bold uppercase tracking-[0.15em] opacity-80">Förderkoordination</p>
            <h3 className="mt-1 text-2xl font-extrabold leading-tight">Fragen zur Förderung</h3>
            <ul className="mt-4 grid gap-2">
              {block.people.map((p, i) => (
                <li key={p.name} data-foerder-person className="flex items-center gap-3 rounded-2xl bg-surface p-3 text-foreground shadow-sm">
                  {p.image ? (
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                  ) : (
                    <span aria-hidden="true" className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-black', initialsTile[i % initialsTile.length])}>
                      {initials(p.name)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold leading-tight">{p.name}</p>
                    {p.email && (
                      <a href={`mailto:${p.email}`} className="mt-0.5 inline-flex items-start gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline dark:text-foreground">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <MailText email={p.email} />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
