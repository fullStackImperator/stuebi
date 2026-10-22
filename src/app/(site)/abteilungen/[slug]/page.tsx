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
import { Footer } from '@/components/landingpage/footer'
import { Header } from '@/components/landingpage/header'
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
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 md:pt-32 pb-24 bg-white dark:bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/abteilungen" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            ← Alle Abteilungen
          </Link>
          <div className="mt-6 mb-10">
            {doc.grades && (
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">{doc.grades}</span>
            )}
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">{doc.title}</h1>
            {doc.intro && (
              <p className="mt-4 max-w-3xl text-lg text-muted-foreground text-pretty leading-relaxed">{doc.intro}</p>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
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
      <Footer />
    </main>
  )
}
