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

const linkStyle = cn(
  navigationMenuTriggerStyle(),
  'px-2 xl:px-2.5 text-sm font-medium text-foreground bg-transparent hover:bg-muted data-popup-open:bg-transparent',
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

          {/* Phones: the menu lives in the bottom action bar (MobileMenu) */}
          <div className="lg:hidden">
            <ModeToggle />
          </div>

        </div>
      </div>
    </header>
  )
}
