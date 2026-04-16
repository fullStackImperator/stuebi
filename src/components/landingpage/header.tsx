'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="relative flex shrink-0 items-center"
          >
            <Image
              src="/images/stuebi-logo_bg.png"
              alt="Stübi – Schule Stübenhofer Weg"
              width={200}
              height={56}
              className="h-14 w-auto md:h-20"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#vision"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Unsere Vision
            </Link>
            <Link
              href="#eltern"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Für Eltern
            </Link>
            <Link
              href="#foerderer"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Für Förderer
            </Link>
            <Link
              href="#schulleben"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Schulleben
            </Link>
            <Link
              href="#kontakt"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Kontakt
            </Link>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ModeToggle />
            <Button asChild>
              <Link href="#anmeldung">Anmeldung</Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ModeToggle />
            <button
              type="button"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menü öffnen"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <Link
              href="#vision"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Unsere Vision
            </Link>
            <Link
              href="#eltern"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Für Eltern
            </Link>
            <Link
              href="#foerderer"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Für Förderer
            </Link>
            <Link
              href="#schulleben"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Schulleben
            </Link>
            <Link
              href="#kontakt"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
            <Button asChild className="w-full mt-2">
              <Link href="#anmeldung" onClick={() => setIsMenuOpen(false)}>
                Anmeldung
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
