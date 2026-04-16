import Link from "next/link";

import { Separator } from "@/components/ui/separator";

const schulabschnitte = [
  { href: "/vorschule", label: "Vorschule" },
  { href: "/grundschule", label: "Grundschule" },
  { href: "/mittelstufe", label: "Mittelstufe" },
  { href: "/gymnasiale-oberstufe", label: "Gymnasiale Oberstufe" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">
              Stübi · Schule Stübenhofer Weg
            </p>
            <address className="mt-3 text-sm not-italic text-muted-foreground">
              Stübenhofer Weg 20a
              <br />
              21109 Hamburg
            </address>
            <p className="mt-2 text-sm">
              <a
                href="mailto:stuebi@stuebenhofer-weg.de"
                className="text-primary underline-offset-4 hover:underline"
              >
                stuebi@stuebenhofer-weg.de
              </a>
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Schulabschnitte</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              {schulabschnitte.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">Folgen Sie uns</p>
            <div className="mt-3 flex flex-wrap gap-4">
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"}
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "#"}
                rel="noopener noreferrer"
                target="_blank"
              >
                Facebook
              </a>
              <Link
                className="text-primary underline-offset-4 hover:underline"
                href="/admin"
              >
                Redaktion (CMS)
              </Link>
            </div>
            <p className="mt-4 text-muted-foreground">
              Lebensraum im Stadtteil Wilhelmsburg — partizipativ, demokratisch,
              zukunftsorientiert.
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Schule Stübenhofer Weg ·{" "}
          <Link href="/impressum" className="hover:underline">
            Impressum
          </Link>
          {" · "}
          <Link href="/datenschutz" className="hover:underline">
            Datenschutz
          </Link>
        </p>
      </div>
    </footer>
  );
}
