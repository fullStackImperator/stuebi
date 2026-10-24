import type { Department } from '@/payload-types'
import { cn } from '@/lib/utils'
import { ContactBlock, DatesSection, RegistrationSection, upcomingDates } from './department-sections'

// One department on /anmeldung: registration, upcoming dates and contacts. The section id is the
// department slug, so menu links like /anmeldung#primarstufe land here.
export function DepartmentSection({ department, tone }: { department: Department; tone: 'light' | 'sand' }) {
  return (
    <section
      id={department.slug}
      data-tone={tone}
      className={cn('scroll-mt-20 md:scroll-mt-24 py-14 sm:py-20', tone === 'sand' ? 'bg-surface-sand' : 'bg-surface')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          {department.grades && <p className="text-accent font-semibold mb-2">{department.grades}</p>}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">{department.title}</h2>
          {department.intro && (
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">{department.intro}</p>
          )}
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <RegistrationSection registration={department.registration} />
          </div>
          <div className="lg:col-span-2">
            <DatesSection items={upcomingDates(department.dates?.items)} />
          </div>
        </div>
        <div className="mt-6">
          <ContactBlock contact={department.contact} />
        </div>
      </div>
    </section>
  )
}
