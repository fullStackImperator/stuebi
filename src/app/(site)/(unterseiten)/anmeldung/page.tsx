import type { Metadata } from 'next'
import { ContactSection } from '@/components/landingpage/contact-section'
import { connection } from 'next/server'
import { DepartmentSection } from '@/components/departments/department-section'
import { RegistrationDeadlines } from '@/components/departments/registration-deadlines'
import { SchoolOffice } from '@/components/departments/school-office'
import { PageIntro, PageSection } from '@/components/sections/page-parts'
import { getPayloadClient } from '@/lib/get-payload'
import { PhotoBand } from '@/components/photos/photo-band'
import { getPageImages } from '@/lib/page-images'
import { toPhoto } from '@/lib/photo'

export const metadata: Metadata = {
  title: 'Anmeldung & Kontakt | Stübi Hamburg',
  description: 'Anmeldung, Formulare, Schulbüro und Ansprechpartner der Stadtteilschule Stübenhofer Weg.',
}

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

      <PageSection id="schulbuero" eyebrow="Schulbüro" title="So erreichen Sie uns.">
        <SchoolOffice />
      </PageSection>

      <section id="ansprechpartner" className="scroll-mt-20 md:scroll-mt-24">
        <ContactSection />
      </section>
    </>
  )
}
