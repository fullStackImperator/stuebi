import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Cpu,
  HandHeart,
  HeartHandshake,
  Landmark,
  Rocket,
  School,
  Sparkles,
  Users,
} from "lucide-react";

import { SocialSection } from "@/components/social-section";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPayloadClient } from "@/lib/get-payload";
import { mediaUrl } from "@/lib/media-url";

const pillars = [
  {
    icon: Compass,
    title: "Lernwege mitgestalten",
    text: 'Durch unser schülerzentriertes Lernkonzept der „Maker Education“ und Profile wie „Mein Start-Up“ gestalten unsere Schülerinnen und Schüler ihre Bildung aktiv mit.',
    href: "/gymnasiale-oberstufe",
    linkLabel: "Zur Oberstufe",
  },
  {
    icon: Users,
    title: "Persönlichkeit entwickeln",
    text: "Ob in unseren Sportteams mit lizenzierten Trainern oder durch die individuelle Begleitung im multiprofessionellen Jahrgangsteam – wir fördern Stärken gezielt.",
    href: "/ueber-uns",
    linkLabel: "Konzept & Team",
  },
  {
    icon: Cpu,
    title: "Aktive Lernkultur leben",
    text: 'Wir lernen beim Machen. Im Stübi-Makerspace arbeiten wir mit 3D-Druckern und Robotik und erlernen spielerisch „21st Century Skills“.',
    href: "/makerspace",
    linkLabel: "Zum Makerspace",
  },
  {
    icon: HeartHandshake,
    title: "Demokratisches Miteinander",
    text: 'Verantwortung füreinander steht an oberster Stelle. In Projekten wie „Abgekocht!“, wo Klassen für die ganze Schule kochen, wird Gemeinschaft praktisch gelebt.',
    href: "/ganztag",
    linkLabel: "Ganztag & Gemeinschaft",
  },
];

const partnerNames = [
  "Hamburg Towers",
  "Hamburger Judo-Verband",
  "Sport ohne Grenzen",
  "Aurubis",
];

export default async function HomePage() {
  const payload = await getPayloadClient();
  const news = await payload.find({
    collection: "news",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 4,
    depth: 1,
    overrideAccess: true,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-amber-50/40 dark:to-primary/5"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsl(var(--primary)/0.2),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Wilhelmsburg · von der Vorschule bis zum Abitur
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[2.75rem] lg:leading-tight">
            Gemeinsam von der Vorschule bis zum Abitur
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Wir schaffen für unsere Kinder und Jugendlichen ein personalisiertes
            und zukunftsorientiertes Bildungsangebot.
          </p>
          <div className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/#eltern"
              className={cn(
                buttonVariants({ variant: "default" }),
                "inline-flex h-auto min-h-10 items-center justify-center gap-2 px-4 py-2.5 text-left sm:min-w-[240px]",
              )}
            >
              <School className="size-4 shrink-0 opacity-90" aria-hidden />
              <span className="leading-snug">
                Für Eltern: Den Stübi-Weg entdecken
              </span>
            </Link>
            <Link
              href="/#foerderer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "inline-flex h-auto min-h-10 items-center justify-center gap-2 border-primary/30 bg-background/80 px-4 py-2.5 text-left backdrop-blur sm:min-w-[240px]",
              )}
            >
              <Sparkles className="size-4 shrink-0" aria-hidden />
              <span className="leading-snug">
                Für Förderer: Zukunftsprojekte unterstützen
              </span>
            </Link>
          </div>
          <p className="mt-8 max-w-2xl text-xs text-muted-foreground">
            Hier können später ein emotionales Video oder ein Bild-Slider
            ergänzt werden (z. B. Frühstück, Makerspace).
          </p>
        </div>
      </section>

      {/* 4 Säulen */}
      <section
        id="leitvision"
        className="scroll-mt-24 border-b border-border bg-muted/30 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Unsere Leitvision: vier Säulen
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Jede Maßnahme, jedes Vorhaben und jede Entwicklungsinitiative an
            unserer Schule wird daraufhin geprüft, ob sie unserem
            Entwicklungsziel dient: ein personalisiertes und
            zukunftsorientiertes Bildungsangebot für jedes Kind.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <Card
                  key={p.title}
                  className="flex flex-col border-primary/10 bg-card shadow-sm transition hover:border-primary/25 hover:shadow-md"
                >
                  <CardHeader className="pb-2">
                    <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <CardTitle className="font-heading text-lg leading-snug">
                      {p.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto flex flex-1 flex-col pt-0">
                    <CardDescription className="flex-1 text-sm leading-relaxed">
                      {p.text}
                    </CardDescription>
                    <Link
                      href={p.href}
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "mt-4 h-auto justify-start px-0 text-primary",
                      )}
                    >
                      {p.linkLabel}
                      <ArrowRight className="ml-1 size-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eltern */}
      <section id="eltern" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <HandHeart className="size-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Für Familien
                </span>
              </div>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Ein vertrauensvolles und beständiges Miteinander
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Schulwechsel bedeuten oft Umbrüche. Mit unserem Konzept „eine
                Klasse“ bleiben Schülerinnen und Schüler von der Einschulung bis
                zum Abschluss weitestgehend im selben Klassenverband. Das gibt
                Sicherheit und Zugehörigkeit.
              </p>
            </div>
            <div className="rounded-2xl border border-dashed border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 sm:p-8">
              <p className="text-sm font-medium text-foreground">
                Ihr Kind im Mittelpunkt
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Eine umfassende Persönlichkeitsentwicklung wird durch
                verlässliche Strukturen und multiprofessionelle Teams möglich.
              </p>
            </div>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            <li>
              <Card className="h-full border-border/80">
                <CardHeader>
                  <CardTitle className="font-heading text-base">
                    Ganztagsbetreuung
                  </CardTitle>
                  <CardDescription>
                    Verlässliche Begleitung am Nachmittag mit Kursen von Kunst
                    bis Sport.
                  </CardDescription>
                </CardHeader>
              </Card>
            </li>
            <li>
              <Card className="h-full border-border/80">
                <CardHeader>
                  <CardTitle className="font-heading text-base">
                    Gesunde Ernährung
                  </CardTitle>
                  <CardDescription>
                    Kostenloses Frühstück („Brotzeit“) und ein gesundes
                    Mittagessen.
                  </CardDescription>
                </CardHeader>
              </Card>
            </li>
            <li>
              <Card className="h-full border-border/80">
                <CardHeader>
                  <CardTitle className="font-heading text-base">
                    Individuelle Förderung
                  </CardTitle>
                  <CardDescription>
                    Feste Lese- und Lernzeiten statt klassischer Hausaufgaben.
                  </CardDescription>
                </CardHeader>
              </Card>
            </li>
          </ul>
          <div className="mt-10">
            <Link
              href="/anmeldung"
              className={cn(buttonVariants({ variant: "default" }), "gap-2")}
            >
              Alles zur Anmeldung &amp; Grundschule
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Förderer */}
      <section
        id="foerderer"
        className="scroll-mt-24 border-y border-border bg-primary/5 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <Landmark className="size-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Für Unternehmen &amp; Stiftungen
                </span>
              </div>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Fördern Sie die Macher von morgen
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Bildungsgerechtigkeit braucht starke Partner. Helfen Sie uns,
                unser zukunftsorientiertes Bildungsangebot weiter auszubauen und
                jungen Talenten in Wilhelmsburg den Zugang zu modernster
                Technik und wertvollen Praxiserfahrungen zu ermöglichen. Jede
                Maßnahme wird an unserem Zielbild ausgerichtet – das schafft
                Planbarkeit für Ihre Förderung.
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Cpu className="size-4" />
                  </div>
                  <CardTitle className="font-heading text-lg">
                    Stübi-Makerspace
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    Unterstützen Sie unsere High-Tech-Werkstatt: Prototyping,
                    Experimentieren und MINT-Kompetenzen für alle Altersstufen.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Rocket className="size-4" />
                  </div>
                  <CardTitle className="font-heading text-lg">
                    Berufsorientierung &amp; Start-ups
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    Praktika, Wirtschaftskompetenz und Anknüpfung an Partner
                    wie Aurubis – etwa duale Studiengänge oder
                    Projektkooperationen.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
          <div className="mt-10">
            <Link
              href="/kontakt"
              className={cn(buttonVariants({ variant: "default" }), "gap-2")}
            >
              Werden Sie Bildungspartner
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partner-Leiste */}
      <section id="partner" className="scroll-mt-24 py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Vertrauen &amp; Netzwerke
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-muted-foreground">
            Auf dem Weg zur Partnerschule des Nachwuchsleistungssports
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-border/60 py-8">
            {partnerNames.map((name) => (
              <span
                key={name}
                className="font-heading text-sm font-semibold tracking-wide text-foreground/70 sm:text-base"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Logos der Partner können hier als Bilder ergänzt werden.
          </p>
        </div>
      </section>

      {/* Schulleben / Aktuelles */}
      <section id="schulleben" className="scroll-mt-24 border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                Schulleben &amp; Aktuelles
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Einblicke in Projekte, Termine und Neuigkeiten — gepflegt im
                CMS.
              </p>
            </div>
            <Link
              href="/news"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-fit shrink-0",
              )}
            >
              Alle Beiträge
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {news.docs.length === 0 ? (
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>Noch keine Meldungen</CardTitle>
                  <CardDescription>
                    Sobald im Admin-Bereich Beiträge veröffentlicht sind,
                    erscheinen sie hier.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              news.docs.map((item) => {
                const img =
                  typeof item.featuredImage === "object" && item.featuredImage
                    ? mediaUrl(item.featuredImage)
                    : null;
                return (
                  <Card key={item.id} className="overflow-hidden">
                    {img && (
                      <div
                        className="aspect-[2/1] w-full bg-muted bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">
                        <Link
                          href={`/news/${item.slug}`}
                          className="hover:text-primary hover:underline"
                        >
                          {item.title}
                        </Link>
                      </CardTitle>
                      {item.excerpt && (
                        <CardDescription className="line-clamp-2">
                          {item.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <Link
                        href={`/news/${item.slug}`}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "px-0",
                        )}
                      >
                        Weiterlesen
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>

      <SocialSection />
    </>
  );
}
