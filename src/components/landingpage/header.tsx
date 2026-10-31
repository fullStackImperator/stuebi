'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { ArrowRight } from 'lucide-react'
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
import { styleFor } from './section-style'

// Hover, focus and the open state take the section's own colour (set as --nav-bg/--nav-fg per item),
// the same colours as the phone menu's tiles.
const linkStyle = cn(
  navigationMenuTriggerStyle(),
  'px-2 xl:px-2.5 text-sm font-medium text-foreground bg-transparent',
  'hover:bg-(--nav-bg) hover:text-(--nav-fg) focus:bg-(--nav-bg) focus:text-(--nav-fg)',
  'data-popup-open:bg-(--nav-bg) data-popup-open:text-(--nav-fg) data-popup-open:hover:bg-(--nav-bg)',
  'data-open:bg-(--nav-bg) data-open:text-(--nav-fg) data-open:hover:bg-(--nav-bg) data-open:focus:bg-(--nav-bg)',
)

export function Header() {
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
                {mainNav.map((item) => {
                  const s = styleFor(item.href)
                  const Icon = s.icon
                  return (
                    <NavigationMenuItem key={item.href} className={s.vars}>
                      <NavigationMenuTrigger className={linkStyle}>
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[320px] p-3">
                          {/* Overview link to the section page */}
                          <Link
                            href={item.href}
                            data-nav-overview
                            className={cn('group mb-1 flex items-center gap-3 rounded-xl px-3 py-3', s.tile)}
                          >
                            <Icon className="h-5 w-5 shrink-0" aria-hidden />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-extrabold">{item.label}</span>
                              <span className="mt-0.5 block text-xs opacity-85">{item.desc}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
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
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>

            <ModeToggle />
          </div>

          {/* Phones: the menu lives in the bottom action bar (MobileMenu) */}
          <div className="lg:hidden">
            <ModeToggle />
          </div>

        </div>
      </div>
    </header>
  )
}
