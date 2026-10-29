'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { mainNav } from '@/lib/site-navigation'
import { cn } from '@/lib/utils'

const linkStyle = cn(
  navigationMenuTriggerStyle(),
  'px-2 xl:px-2.5 text-sm font-medium text-foreground bg-transparent hover:bg-muted data-popup-open:bg-transparent',
)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Lets other fixed UI (the phone action bar) step aside while the menu is open.
  useEffect(() => {
    if (isMenuOpen) document.body.dataset.menuOpen = 'true'
    else delete document.body.dataset.menuOpen
    return () => {
      delete document.body.dataset.menuOpen
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
    setOpenSection(null)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="relative flex shrink-0 items-center">
            <Image
              src="/images/stuebi-logo-campus.png"
              alt="Stübi – Campus Stübenhofer Weg"
              width={202}
              height={80}
              className="h-12 w-auto md:h-16"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu align="end">
              <NavigationMenuList className="gap-0">
                {mainNav.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger className={linkStyle}>
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[320px] p-3">
                        {/* Overview link to the section page */}
                        <Link
                          href={item.href}
                          className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2.5 mb-1 hover:bg-muted transition-colors group"
                        >
                          <span>
                            <span className="block text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              {item.label}
                            </span>
                            <span className="block text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>

                        {item.children.map((link) => (
                          <Link
                            key={link.href}
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
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <ModeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <ModeToggle />
            <button
              type="button"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {mainNav.map((item) => {
              const open = openSection === item.href
              return (
                <div key={item.href}>
                  <button
                    type="button"
                    className="w-full min-h-11 flex items-center justify-between px-3 py-2 text-base font-medium rounded-lg hover:bg-muted"
                    onClick={() => setOpenSection(open ? null : item.href)}
                    aria-expanded={open}
                  >
                    {item.label}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
                  </button>
                  {open && (
                    <div className="pl-3 mt-1 space-y-1">
                      <Link
                        href={item.href}
                        className="flex min-h-11 items-center px-3 text-base font-semibold text-foreground rounded-lg hover:bg-muted"
                        onClick={closeMenu}
                      >
                        Übersicht
                      </Link>
                      {item.children.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="flex min-h-11 items-center px-3 text-base text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                          onClick={closeMenu}
                        >
                          {l.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
