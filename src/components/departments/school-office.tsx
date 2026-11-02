import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { PortraitFigure } from '@/components/contact/portrait-card'
import { officeHours, officeTeam } from '@/content/contacts'
import { cn } from '@/lib/utils'

const ADDRESS = 'Stübenhofer Weg 20a, 21109 Hamburg'
// A link instead of an embedded map, so no Google content loads without the visitor's consent.
const ROUTE_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

type Card = { icon: LucideIcon; label: string; value: string; href: string; action: string; tone: string }

const cards: Card[] = [
  { icon: Phone, label: 'Schulbüro', value: '040 / 428 76 19 – 10', href: 'tel:+4940428761910', action: 'Anrufen', tone: 'bg-accent text-white' },
  {
    icon: Phone,
    label: 'Schulbüro Primarstufe',
    value: '040 / 428 96 66 – 0',
    href: 'tel:+494042896660',
    action: 'Anrufen',
    tone: 'bg-golden text-on-bright',
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: 'schule-stuebenhofer-weg@bsfb.hamburg.de',
    href: 'mailto:schule-stuebenhofer-weg@bsfb.hamburg.de',
    action: 'Mail schreiben',
    tone: 'bg-primary text-white',
  },
]

// A <wbr> after the @ lets the long mail address break there instead of mid-word.
function breakAtAt(value: string) {
  const at = value.indexOf('@')
  if (at < 0) return value
  return (
    <>
      {value.slice(0, at)}
      <wbr />
      {value.slice(at)}
    </>
  )
}

// "So erreichen Sie uns": the school building with the address and a route link, next to large
// tap-to-call and mail cards in the site colours, and below them the people in the Schulbüros.
export function SchoolOffice() {
  return (
    <div className="space-y-14">
      <OfficeCards />
      <OfficeTeam />
    </div>
  )
}

// Badge colour per building, like its phone card above: pink for the Hauptgebäude, golden for the Grundschule.
const buildingBadge: Record<string, string> = {
  Hauptgebäude: 'bg-accent text-white',
  Grundschulgebäude: 'bg-golden text-on-bright',
}

/** The faces behind the Schulbüros, grouped by building, with the opening hours. */
function OfficeTeam() {
  return (
    <div data-office-team>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-2xl font-extrabold text-foreground">Unser Schulbüro-Team</h3>
        <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Clock className="h-4 w-4" aria-hidden />
          {officeHours}
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-6 lg:gap-5">
        {officeTeam.map(({ building, members }) => (
          <div key={building} className={members.length > 2 ? 'lg:col-span-4' : 'lg:col-span-2'}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{building}</p>
            <ul className={cn('grid grid-cols-2 gap-4', members.length > 2 && 'sm:grid-cols-4')}>
              {members.map((m) => (
                <li key={m.email}>
                  <PortraitFigure
                    name={m.name}
                    topic={m.role}
                    image={m.image}
                    badgeClass={m.role === 'Verwaltungsleitung' ? 'bg-primary text-white' : buildingBadge[building]}
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 25vw, 50vw"
                    className="[&_figcaption]:text-lg"
                  />
                  <a href={`mailto:${m.email}`} className="mt-2 flex items-start gap-1.5 text-xs font-semibold text-primary hover:underline">
                    <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span>{breakAtAt(m.email)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function OfficeCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/9] lg:col-span-5 lg:aspect-auto lg:min-h-[28rem]">
        <Image
          src="/images/fotos/schulgebaeude.jpg"
          alt="Das Schulgebäude am Stübenhofer Weg"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-[50%_40%]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/80 via-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
          <p className="flex items-center gap-2 text-sm font-semibold opacity-90">
            <MapPin className="h-4 w-4" aria-hidden />
            Adresse
          </p>
          <p className="mt-1 text-xl font-extrabold leading-snug sm:text-2xl">
            Stübenhofer Weg 20a
            <br />
            21109 Hamburg
          </p>
          <a
            href={ROUTE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-golden px-5 text-sm font-bold text-on-bright transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Route planen
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(öffnet Google Maps)</span>
          </a>
        </div>
      </div>

      <ul className="grid gap-5 lg:col-span-7">
        {cards.map((c) => (
          <li key={c.href}>
            <a
              href={c.href}
              data-office-card
              className={cn(
                'group flex h-full items-center gap-5 rounded-3xl p-5 sm:p-6 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
                c.tone,
              )}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/10">
                <c.icon className="h-6 w-6" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold opacity-85">{c.label}</span>
                <span
                  className={cn(
                    'mt-0.5 block font-extrabold leading-tight break-words',
                    c.href.startsWith('tel:') ? 'text-2xl sm:text-3xl tabular-nums' : 'text-base sm:text-xl',
                  )}
                >
                  {breakAtAt(c.value)}
                </span>
              </span>
              <span className="hidden shrink-0 items-center gap-1.5 text-sm font-bold sm:inline-flex">
                {c.action}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
