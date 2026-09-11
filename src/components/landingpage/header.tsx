'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { Menu, X, ChevronDown } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const elternLinks = [
  { title: 'Bildungsweg VSK–13', href: '#eltern', desc: 'Von der Vorschule bis zum Abitur' },
  { title: 'Ganztagsbetreuung', href: '#eltern', desc: 'Verlässliche Begleitung & Mittagessen' },
  { title: 'Individuelle Förderung', href: '#eltern', desc: 'Lernzeiten statt Hausaufgaben' },
  { title: 'Anmeldung & Kontakt', href: '#anmeldung', desc: 'Jetzt Platz anfragen' },
]

const schullebenLinks = [
  { title: 'Sportteams', href: '#schulleben', desc: 'Basketball, Judo & Fußball' },
  { title: 'Stübi-Makerspace', href: '#schulleben', desc: '3D-Druck, Robotik & Coding' },
  { title: 'Kunst & Theater', href: '#schulleben', desc: 'Kreative AGs am Nachmittag' },
  { title: 'Projekt Abgekocht!', href: '#schulleben', desc: 'Kochen für die Gemeinschaft' },
]

const linkStyle = cn(
  navigationMenuTriggerStyle(),
  'text-sm font-medium text-foreground bg-transparent hover:bg-muted data-popup-open:bg-transparent',
)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [elternOpen, setElternOpen] = useState(false)
  const [schullebenOpen, setSchullebenOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="relative flex shrink-0 items-center">
            <Image
              src="/images/stuebi-logo-brand.svg"
              alt="Stübi – Schule Stübenhofer Weg"
              width={200}
              height={56}
              className="h-14 w-auto md:h-20"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">

                {/* Simple: Vision */}
                <NavigationMenuItem>
                  <NavigationMenuLink href="#vision" className={linkStyle}>
                    Unsere Vision
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Dropdown: Für Eltern */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={linkStyle}>
                    Für Eltern
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid lg:grid-cols-[220px_1fr] w-[360px] lg:w-[540px] overflow-hidden">

                      {/* Image panel — large screens only */}
                      <div className="hidden lg:block relative min-h-[220px]">
                        <Image
                          src="/images/hero-school.jpg"
                          alt="Für Eltern"
                          fill
                          className="object-cover object-center"
                          sizes="220px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-extrabold text-base leading-tight">Für Eltern</p>
                          <p className="text-white/70 text-xs mt-1">Alles auf einen Blick</p>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="p-3">
                        {elternLinks.map((link) => (
                          <Link
                            key={link.title}
                            href={link.href}
                            className="block rounded-lg px-3 py-2.5 hover:bg-muted transition-colors group"
                          >
                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {link.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
                          </Link>
                        ))}
                      </div>

                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Dropdown: Schulleben */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={linkStyle}>
                    Schulleben
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid lg:grid-cols-[220px_1fr] w-[360px] lg:w-[540px] overflow-hidden">

                      {/* Image panel */}
                      <div className="hidden lg:block relative min-h-[220px]">
                        <Image
                          src="/images/hero-school.jpg"
                          alt="Schulleben"
                          fill
                          className="object-cover object-center"
                          sizes="220px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-extrabold text-base leading-tight">Schulleben</p>
                          <p className="text-white/70 text-xs mt-1">Entdecken & erleben</p>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="p-3">
                        {schullebenLinks.map((link) => (
                          <Link
                            key={link.title}
                            href={link.href}
                            className="block rounded-lg px-3 py-2.5 hover:bg-muted transition-colors group"
                          >
                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {link.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
                          </Link>
                        ))}
                      </div>

                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Simple: Förderer */}
                <NavigationMenuItem>
                  <NavigationMenuLink href="#foerderer" className={linkStyle}>
                    Für Förderer
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Simple: Kontakt */}
                <NavigationMenuItem>
                  <NavigationMenuLink href="#kontakt" className={linkStyle}>
                    Kontakt
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>

            <ModeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <ModeToggle />
            <button
              type="button"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menü öffnen"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col px-4 py-4 gap-1">

            <Link href="#vision" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
              Unsere Vision
            </Link>

            {/* Für Eltern accordion */}
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted"
                onClick={() => setElternOpen(!elternOpen)}
              >
                Für Eltern
                <ChevronDown className={cn('h-4 w-4 transition-transform', elternOpen && 'rotate-180')} />
              </button>
              {elternOpen && (
                <div className="pl-3 mt-1 space-y-1">
                  {elternLinks.map((l) => (
                    <Link key={l.title} href={l.href} className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
                      {l.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Schulleben accordion */}
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted"
                onClick={() => setSchullebenOpen(!schullebenOpen)}
              >
                Schulleben
                <ChevronDown className={cn('h-4 w-4 transition-transform', schullebenOpen && 'rotate-180')} />
              </button>
              {schullebenOpen && (
                <div className="pl-3 mt-1 space-y-1">
                  {schullebenLinks.map((l) => (
                    <Link key={l.title} href={l.href} className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
                      {l.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="#foerderer" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
              Für Förderer
            </Link>
            <Link href="#kontakt" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
              Kontakt
            </Link>

          </nav>
        </div>
      )}
    </header>
  )
}
