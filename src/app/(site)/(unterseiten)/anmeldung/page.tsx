import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { ContactSection } from '@/components/landingpage/contact-section'
import { connection } from 'next/server'
import { DepartmentSection } from '@/components/departments/department-section'
import { RegistrationDeadlines } from '@/components/departments/registration-deadlines'
import { PageIntro, PageSection } from '@/components/sections/page-parts'
import { getPayloadClient } from '@/lib/get-payload'
import { PhotoBand } from '@/components/photos/photo-band'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'

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

export default async function AnmeldungPage() {
  // Past dates are filtered per request, so never prerender.
  await connection()
  const payload = await getPayloadClient()
  const departments = await payload.find({
    collection: 'departments',
    sort: 'order',
    limit: 20,
    depth: 1,
    overrideAccess: true,
  })
  const { anmeldung: img } = await getPageImages()

  return (
    <>
      <PageIntro
        eyebrow="Anmeldung & Kontakt"
        color="accent"
        title="So kommt Ihr Kind an die Stübi."
        lead="Hier erfahren Sie, wie Sie Ihr Kind an der Stübi anmelden, und wen Sie bei Fragen erreichen."
      />

      <PageSection id="ablauf" eyebrow="Anmeldung" title="So melden Sie Ihr Kind an.">
        <RegistrationDeadlines departments={departments.docs} />
      </PageSection>

      <PhotoBand photo={toPhoto(img?.band?.image)} caption={img?.band?.caption} />

      {departments.docs.map((department, i) => (
        <DepartmentSection key={department.id} department={department} tone={i % 2 === 0 ? 'sand' : 'light'} />
      ))}

      <PageSection id="schulbuero" eyebrow="Schulbüro" title="So erreichen Sie uns." tone="sand">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {buero.map((b) => (
            <div key={b.label} className="rounded-3xl bg-surface p-6 shadow-sm">
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

      <section id="ansprechpartner" className="scroll-mt-20 md:scroll-mt-24">
        <ContactSection />
      </section>
    </>
  )
}
