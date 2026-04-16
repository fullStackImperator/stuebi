import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#leitvision", label: "Unsere Vision" },
  { href: "/#eltern", label: "Für Eltern" },
  { href: "/#foerderer", label: "Förderer & Partner" },
  { href: "/news", label: "Schulleben" },
  { href: "/kontakt", label: "Kontakt" },
];

const linkClass =
  "rounded-md px-2.5 py-2 text-sm font-medium text-foreground/90 transition hover:bg-muted hover:text-foreground lg:px-3";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Stübi – Schule Stübenhofer Weg"
            width={140}
            height={36}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>
        <nav className="hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-0.5 lg:flex xl:gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              <span className="hidden xl:inline">{l.label}</span>
              <span className="xl:hidden">
                {l.label === "Förderer & Partner" ? "Förderer" : l.label}
              </span>
            </Link>
          ))}
          <Link
            href="/anmeldung"
            className={cn(
              buttonVariants({ variant: "default" }),
              "ml-1 shrink-0 shadow-sm",
            )}
          >
            Anmeldung
          </Link>
          <Link
            href="/admin"
            className={cn(linkClass, "text-muted-foreground")}
            title="CMS"
          >
            CMS
          </Link>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/anmeldung"
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            Anmeldung
          </Link>
        </div>
      </div>
      <nav className="flex flex-wrap justify-center gap-1 border-t border-border/60 px-2 py-2 lg:hidden">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-md px-2 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            {l.label === "Förderer & Partner" ? "Förderer" : l.label}
          </Link>
        ))}
        <Link
          href="/admin"
          className="rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted"
        >
          CMS
        </Link>
      </nav>
    </header>
  );
}
