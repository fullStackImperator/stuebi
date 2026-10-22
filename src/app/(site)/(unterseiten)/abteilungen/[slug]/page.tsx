import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import type { Metadata } from 'next'

import {
  ContactBlock,
  DatesSection,
  RegistrationSection,
  upcomingDates,
} from '@/components/departments/department-sections'
import { PageIntro } from '@/components/sections/page-parts'
import { getPayloadClient } from '@/lib/get-payload'

type Props = { params: Promise<{ slug: string }> }

async function findDepartment(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'departments',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })
  return res.docs[0]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await findDepartment(slug)
  if (!doc) return { title: 'Nicht gefunden' }
  return {
    title: `${doc.title} – Stübi Hamburg`,
    description: doc.intro || undefined,
  }
}

export default async function DepartmentPage({ params }: Props) {
  // Past dates are filtered per request, so never prerender.
  await connection()
  const { slug } = await params
  const doc = await findDepartment(slug)
  if (!doc) notFound()

  const dates = upcomingDates(doc.dates?.items)

  return (
    <>
      <PageIntro eyebrow={doc.grades || 'Abteilung'} title={doc.title} lead={doc.intro} />
      <div className="py-16 sm:py-20 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/abteilungen" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            ← Alle Abteilungen
          </Link>
          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RegistrationSection registration={doc.registration} />
            </div>
            <div className="lg:col-span-2">
              <DatesSection items={dates} />
            </div>
          </div>
          <div className="mt-6">
            <ContactBlock contact={doc.contact} />
          </div>
        </div>
      </div>
    </>
  )
}
