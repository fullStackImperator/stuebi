import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone } from 'lucide-react'

const contacts = [
  {
    title: 'Vorschule & 1. Klassen',
    name: 'Sebastian Otto',
    role: 'Ansprechpartner',
    image: '/images/contact-sebastian.jpg',
    badgeBg: 'bg-golden',
    badgeText: 'text-foreground',
  },
  {
    title: 'Neue 5. Klassen',
    name: 'Ljubica Sabadija',
    role: 'Ansprechpartnerin',
    image: '/images/contact-ljubica.jpg',
    badgeBg: 'bg-mint',
    badgeText: 'text-foreground',
  },
  {
    title: 'Schulleitung',
    name: 'Matthias Herpe',
    role: 'Schulleiter',
    image: '/images/contact-matthias.jpg',
    badgeBg: 'bg-accent',
    badgeText: 'text-white',
  },
]

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Stübenhofer Weg 20a, 21109 Hamburg',
    href: undefined,
    bg: 'bg-golden',
    iconColor: 'text-foreground',
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: 'schule-stuebenhofer-weg@bsfb.hamburg.de',
    href: 'mailto:schule-stuebenhofer-weg@bsfb.hamburg.de',
    bg: 'bg-mint',
    iconColor: 'text-foreground',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '040 / 428 76 19 – 10',
    href: 'tel:+4940428761910',
    bg: 'bg-accent',
    iconColor: 'text-white',
  },
]

export function ContactSection() {
  return (
    <section id="kontakt" className="py-24 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Kontakt
            </span>
            <span className="w-6 h-px bg-accent" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Wir freuen uns{' '}
            <span className="relative whitespace-nowrap">
              auf Sie!
              <svg
                className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
                height="12"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 2 6 C 20 1, 80 1, 98 6 C 80 11, 20 11, 2 6 Z"
                  stroke="#06d6a0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Haben Sie Fragen zur Anmeldung oder möchten Sie unsere Schule kennenlernen? Wir sind gerne für Sie da.
          </p>
        </div>

        {/* Portrait cards — 3 columns, large photos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {contacts.map((contact) => (
            <div key={contact.name} className="group rounded-3xl overflow-hidden relative" style={{ paddingBottom: '120%' }}>

              {/* Photo full-bleed */}
              <Image
                src={contact.image}
                alt={contact.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

              {/* Focus area badge — top left */}
              <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm ${contact.badgeBg} ${contact.badgeText}`}>
                {contact.title}
              </span>

              {/* Name + role — overlaid on gradient */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-bold text-xl leading-none">{contact.name}</p>
                <p className="text-white/65 text-sm mt-1.5">{contact.role}</p>
              </div>

            </div>
          ))}
        </div>

        {/* Contact info strip — dark banner.jpg-style card */}
        <div className="rounded-3xl bg-[#1e2a35] px-8 py-7" id="anmeldung">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

            {/* Info items */}
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${info.bg} flex items-center justify-center shrink-0`}>
                    <info.icon className={`h-4 w-4 ${info.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase leading-none mb-1">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a href={info.href} className="text-white/80 text-sm hover:text-white transition-colors leading-snug">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white/80 text-sm leading-snug">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button
              asChild
              className="shrink-0 rounded-full bg-golden text-foreground hover:bg-golden/90 font-semibold gap-2 px-7 py-5"
            >
              <a href="mailto:schule-stuebenhofer-weg@bsfb.hamburg.de?subject=Anmeldung%20Anfrage">
                Kontakt aufnehmen
                <Mail className="h-4 w-4" />
              </a>
            </Button>

          </div>
        </div>

      </div>
    </section>
  )
}
