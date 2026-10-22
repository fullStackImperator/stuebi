import Link from 'next/link'

const stageLinks = [
  { name: 'Vorschule', href: '/abteilungen/primarstufe' },
  { name: 'Grundschule', href: '/abteilungen/primarstufe' },
  { name: 'Mittelstufe', href: '/abteilungen/mittelstufe' },
  { name: 'Gymnasiale Oberstufe', href: '/abteilungen/oberstufe' },
]

const legalLinks = [
  { name: 'Impressum', href: '#' },
  { name: 'Datenschutz', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-[#0f1f2e] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold text-white">Stübi</span>
              <span className="block text-xs text-white/50">
                Die andere Schule
              </span>
            </div>
            <p className="text-sm text-white/60 mb-4">
              Stadtteilschule Stübenhofer Weg
              <br />
              Hamburg-Wilhelmsburg
            </p>
            <p className="text-sm text-white/60">
              Gemeinsam von der Vorschule bis zum Abitur.
            </p>
          </div>

          {/* Stage Links */}
          <div>
            <p className="font-semibold text-white mb-4">Klassenstufen</p>
            <ul className="space-y-2">
              {stageLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-golden transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-white mb-4">Kontakt</p>
            <address className="text-sm text-white/60 not-italic space-y-2">
              <p>Stübenhofer Weg 20a</p>
              <p>21109 Hamburg</p>
              <p>
                <a
                  href="mailto:stuebi@stuebenhofer-weg.de"
                  className="hover:text-mint transition-colors"
                >
                  stuebi@stuebenhofer-weg.de
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Schule Stübenhofer Weg. Alle Rechte
            vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/#foerderer"
              className="text-sm text-white/40 hover:text-white/80 transition-colors"
            >
              Förderer & Partner
            </Link>
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-white/40 hover:text-white/80 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
