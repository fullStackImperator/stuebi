import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone } from 'lucide-react'
import { HighlightBar } from '@/components/ui/highlight-bar'
import { PortraitCard } from '@/components/contact/portrait-card'
import { contactPeopleOrder, schoolAddress, schoolEmail, schoolOffices } from '@/content/contacts'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: schoolAddress,
    href: undefined,
    bg: 'bg-golden',
    iconColor: 'text-on-bright',
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: schoolEmail,
    href: `mailto:${schoolEmail}`,
    bg: 'bg-mint',
    iconColor: 'text-on-bright',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: schoolOffices.main.phone,
    href: schoolOffices.main.tel,
    bg: 'bg-accent',
    iconColor: 'text-white',
  },
]

export function ContactSection() {
  return (
    <section id="kontakt" className="py-24 bg-surface-sand">
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
            <HighlightBar tone="mint">auf Sie!</HighlightBar>
          </h2>

          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Haben Sie Fragen zur Anmeldung oder möchten Sie unsere Schule kennenlernen? Wir sind gerne für Sie da.
          </p>
        </div>

        {/* Portrait cards — one per contact person */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {contactPeopleOrder.map((id) => (
            <PortraitCard key={id} id={id} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
          ))}
        </div>

        {/* Contact info strip — dark banner.jpg-style card */}
        <div className="rounded-3xl bg-surface-ink px-8 py-7">
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
              className="shrink-0 rounded-full bg-golden text-on-bright hover:bg-golden/90 font-semibold gap-2 px-7 py-5"
            >
              <a href={`mailto:${schoolEmail}?subject=Anmeldung%20Anfrage`}>
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
