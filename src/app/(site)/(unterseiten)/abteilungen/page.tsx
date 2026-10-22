import Link from 'next/link'
import { connection } from 'next/server'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

import { upcomingDates } from '@/components/departments/department-sections'
import { PageIntro } from '@/components/sections/page-parts'
import { getPayloadClient } from '@/lib/get-payload'

export const metadata: Metadata = {
  title: 'Abteilungen – Stübi Hamburg',
  description: 'Anmeldung, Termine und Ansprechpartner für Primarstufe, Mittelstufe und Oberstufe.',
}

const accents = ['bg-golden text-foreground', 'bg-mint text-foreground', 'bg-accent text-white', 'bg-primary text-white']

export default async function DepartmentsPage() {
  await connection()
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'departments',
    sort: 'order',
    limit: 20,
    depth: 0,
    overrideAccess: true,
  })

  return (
    <>
      <PageIntro
        eyebrow="Abteilungen"
        title="Primarstufe, Mittelstufe, Oberstufe."
        lead="Alles zur Anmeldung, die nächsten Termine und Ihre Ansprechpartner – von der Vorschule bis zum Abitur."
      />
      <div className="py-16 sm:py-20 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-5 sm:grid-cols-3">
            {res.docs.map((doc, i) => {
              const next = upcomingDates(doc.dates?.items)[0]
              return (
                <li key={doc.id}>
                  <Link
                    href={`/abteilungen/${doc.slug}`}
                    className="group flex h-full flex-col rounded-3xl bg-[#f5f0e8] dark:bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  >
                    {doc.grades && (
                      <span className={`w-fit text-xs font-semibold px-3 py-1 rounded-full ${accents[i % accents.length]}`}>
                        {doc.grades}
                      </span>
                    )}
                    <p className="mt-4 text-xl font-bold text-foreground">{doc.title}</p>
                    {next && <p className="mt-2 text-sm text-muted-foreground">Nächster Termin: {next.title}</p>}
                    <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Anmeldung & Termine
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
