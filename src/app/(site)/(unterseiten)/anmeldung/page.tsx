import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { ContactSection } from '@/components/landingpage/contact-section'
import { InfoCard, NextLink, PageIntro, PageSection, Placeholder } from '@/components/sections/page-parts'

export const metadata: Metadata = {
  title: 'Anmeldung & Kontakt | Stübi Hamburg',
  description: 'Anmeldung, Formulare, Schulbüro und Ansprechpartner der Stadtteilschule Stübenhofer Weg.',
}

const buero = [
  { icon: MapPin, label: 'Adresse', value: 'Stübenhofer Weg 20a, 21109 Hamburg' },
  {
    icon: Mail,
    label: 'E-Mail',
    value: 'schule-stuebenhofer-weg@bsfb.hamburg.de',
    href: 'mailto:schule-stuebenhofer-weg@bsfb.hamburg.de',
  },
  { icon: Phone, label: 'Schulbüro', value: '040 / 428 76 19 – 10', href: 'tel:+4940428761910' },
  { icon: Phone, label: 'Schulbüro Primarstufe', value: '040 / 428 96 66 – 0', href: 'tel:+494042896660' },
]

export default function AnmeldungPage() {
  return (
    <>
      <PageIntro
        eyebrow="Anmeldung & Kontakt"
        title="So kommt Ihr Kind an die Stübi."
        lead="Hier erfahren Sie, wie Sie Ihr Kind an der Stübi anmelden, und wen Sie bei Fragen erreichen."
      />

      <PageSection id="formulare" eyebrow="Anmeldung & Formulare" title="So melden Sie Ihr Kind an.">
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          <InfoCard title="Vorschule" accent="bg-golden">
            <p>
              Die Anmeldung zur Vorschule ist direkt bei der Vorstellung der 4,5-Jährigen möglich, auch wenn diese an einer
              anderen Schule stattfindet. Ansonsten können Sie Ihr Kind jederzeit bis zum Fristende bei uns im Schulbüro
              anmelden.
            </p>
            <p className="font-semibold text-foreground">Anmeldung: ab November bis 22.01.2027</p>
          </InfoCard>
          <InfoCard title="1. Klasse" accent="bg-mint">
            <p>
              Die Anmeldung läuft über ein Formular, das Sie im Schulbüro Ihrer Erstwunschschule abgeben. Die Erstwunschschule
              trägt auch Ihren Zweit- und Drittwunsch ein.
            </p>
            <p className="font-semibold text-foreground">Anmeldung: 04.01.2027 – 22.01.2027</p>
          </InfoCard>
          <InfoCard title="5. Klasse" accent="bg-accent">
            <Placeholder>Ablauf und Fristen für die Anmeldung zur 5. Klasse.</Placeholder>
          </InfoCard>
          <InfoCard title="Oberstufe" accent="bg-primary">
            <Placeholder>Ablauf, Fristen und Anmeldeformular (Download) für die Oberstufe.</Placeholder>
          </InfoCard>
        </div>
        <NextLink href="/abteilungen">Anmeldung & Termine nach Abteilung</NextLink>
      </PageSection>

      <PageSection id="schulbuero" eyebrow="Schulbüro" title="So erreichen Sie uns." tone="sand">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {buero.map((b) => (
            <div key={b.label} className="rounded-3xl bg-white p-6 shadow-sm">
              <b.icon className="h-5 w-5 text-accent mb-3" />
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">{b.label}</p>
              {b.href ? (
                <a href={b.href} className="text-sm font-medium text-foreground hover:text-primary break-words">
                  {b.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-foreground">{b.value}</p>
              )}
            </div>
          ))}
        </div>
      </PageSection>

      <div id="ansprechpartner" className="scroll-mt-20 md:scroll-mt-24">
        <ContactSection />
      </div>
    </>
  )
}
