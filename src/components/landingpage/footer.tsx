import Image from 'next/image'
import Link from 'next/link'

const stageLinks = [
  { name: 'Vorschule', href: '/vorschule' },
  { name: 'Grundschule', href: '/grundschule' },
  { name: 'Mittelstufe', href: '/mittelstufe' },
  { name: 'Oberstufe', href: '/oberstufe' },
]

const moreLinks = [
  { name: 'Sportteams', href: '/schwerpunkt#sport' },
  { name: 'Makerspace', href: '/schwerpunkt#makerspace' },
  { name: 'Abgekocht', href: '/schwerpunkt#abgekocht' },
  { name: 'Förderer & Partner', href: '/#foerderer' },
  { name: 'Kontakt', href: '/#kontakt' },
]

const legalLinks = [
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' },
]

const headingClass =
  'mb-1 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[#8AA3C6]'
const linkClass =
  'w-fit rounded-sm text-[#B9CBE2] transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FB4E2]'

export function Footer() {
  // Footer stays deep navy in both themes; four-colour logo is transparent so it sits on any background.
  return (
    <footer className="bg-[#12284C] pt-16 pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-[#B9CBE2] lg:pb-10">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-9 px-5 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
        <div>
          <Link
            href="/"
            className="mb-5 inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8FB4E2]"
          >
            <Image
              src="/images/stuebi-logo-campus.png"
              alt="Stübi – Campus Stübenhofer Weg, zur Startseite"
              width={202}
              height={80}
              className="h-16 w-auto md:h-20"
            />
          </Link>
          <p className="mb-1.5 text-[15.5px] leading-relaxed">
            Schule Stübenhofer Weg
            <br />
            Stübenhofer Weg 20a, 21109 Hamburg
          </p>
          <a
            href="mailto:stuebi@stuebenhofer-weg.de"
            className="rounded-sm text-[15.5px] text-[#8FB4E2] hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FB4E2]"
          >
            stuebi@stuebenhofer-weg.de
          </a>
        </div>

        <nav
          aria-label="Fußnavigation Schulstufen"
          className="flex flex-col gap-2.5 text-[15.5px]"
        >
          <span className={headingClass}>Schulstufen</span>
          {stageLinks.map((link) => (
            <Link key={link.name} href={link.href} className={linkClass}>
              {link.name}
            </Link>
          ))}
        </nav>

        <nav
          aria-label="Fußnavigation Besonderheiten und Rechtliches"
          className="flex flex-col gap-2.5 text-[15.5px]"
        >
          <span className={headingClass}>Mehr</span>
          {moreLinks.map((link) => (
            <Link key={link.name} href={link.href} className={linkClass}>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-8 max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/15 pt-5 text-[13.5px] text-[#8AA3C6]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Schule Stübenhofer Weg</span>
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-sm transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FB4E2]"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <span>Fotos: Schule Stübenhofer Weg / Adobe Stock</span>
        </div>
      </div>
    </footer>
  )
}
