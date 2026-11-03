import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  GraduationCap,
  Medal,
  Rocket,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WegLanes } from "@/components/bildungswege/weg-lanes";
import {
  NextLink,
  PageIntro,
  PageSection,
} from "@/components/sections/page-parts";
import { IvkSection } from "@/components/ivk/ivk-section";
import { PhotoBand } from "@/components/photos/photo-band";
import { StageTiles } from "@/components/stufen/stage-tiles";
import { stageOrder } from "@/content/stufen";
import { getPageImages } from "@/lib/page-images";
import { bandFallbacks } from "@/lib/fallback-photos";
import { toPhoto } from "@/lib/photo";

export const metadata: Metadata = {
  title: "Bildungswege | Stübi Hamburg",
  description:
    "Vorschule, Grundschule, Mittelstufe, Oberstufe, Ganztag und Abschlüsse an der Stadtteilschule Stübenhofer Weg – von der Vorschule bis zum Abitur.",
};

// One tile per degree, in the order they are reached; each step a little higher (from sm up).
const degrees: {
  short: string;
  name: string;
  when?: string;
  routes?: string[];
  tile: string;
  height: string;
  icon: LucideIcon;
}[] = [
  {
    short: "ESA",
    name: "Erster allgemeinbildender Schulabschluss",
    when: "nach Klasse 9",
    tile: "bg-golden text-on-bright",
    height: "sm:min-h-48",
    icon: Award,
  },
  {
    short: "MSA",
    name: "Mittlerer Schulabschluss",
    when: "nach Klasse 10",
    tile: "bg-mint text-on-bright",
    height: "sm:min-h-60",
    icon: Medal,
  },
  {
    short: "Abitur",
    name: "Allgemeine Hochschulreife",
    routes: [
      "nach Klasse 12 im Gymnasialzweig",
      "nach Klasse 13 im Stadtteilschulzweig",
    ],
    tile: "bg-primary text-primary-foreground",
    height: "sm:min-h-[22rem]",
    icon: GraduationCap,
  },
];

const profiles = [
  {
    title: "Profil „Fair Play“",
    subtitle: "Sport, Gesundheit & Management",
    text: "Für sportbegeisterte Jugendliche: Sport, PGW (Politik, Gesellschaft, Wirtschaft) und Biologie greifen ineinander. Die Schülerinnen und Schüler planen echte Sportevents, beschäftigen sich mit Gesundheitsmanagement und setzen sportwissenschaftliche Theorie in die Praxis um.",
    tile: "bg-accent-strong text-white",
    icon: Trophy,
    doing: [
      "Sportevents planen",
      "Gesundheitsmanagement",
      "Sportwissenschaft in der Praxis",
    ],
  },
  {
    title: "Profil „Mein Start-Up“",
    subtitle: "Wirtschaft, Innovation & Management",
    text: "Hier werden Jugendliche zu Gründerinnen und Gründern: Sie entwickeln eigene Produkte, schreiben Businesspläne und erforschen globale wirtschaftliche Zusammenhänge.",
    tile: "bg-mint text-on-bright",
    icon: Rocket,
    doing: ["Eigene Produkte", "Businesspläne", "Globale Wirtschaft"],
  },
];

// Photo slots come from the CMS; refresh at most a minute after an editor changes them.
export const revalidate = 60;

// Übersicht: jede Stufe hat eine eigene Seite, hier führen Kacheln dorthin.
export default async function BildungswegePage() {
  const { bildungswege: img } = await getPageImages();

  return (
    <>
      <PageIntro
        motif="weg"
        eyebrow="Bildungswege"
        color="golden"
        title="Gemeinsam von der Vorschule bis zum Abitur."
        lead="An der Stübi können Kinder ihre ganze Schulzeit an einem Ort verbringen: von der Vorschule über Grund- und Mittelstufe bis zur Oberstufe. Mit unserem Konzept eine Klasse bleiben sie dabei weitestgehend im selben Klassenverband – das gibt Sicherheit und Zugehörigkeit."
      />

      <PageSection
        id="stufen"
        eyebrow="Unsere Stufen"
        title="Ein Weg, eine Schule."
        tone="sand"
      >
        <WegLanes />
        <StageTiles ids={stageOrder} />
      </PageSection>

      <PhotoBand
        photo={toPhoto(img?.band?.image) ?? bandFallbacks.bildungswege}
        caption={img?.band?.caption}
      />

      <PageSection
        id="abschluesse"
        eyebrow="Abschlüsse"
        title="Alle Abschlüsse an einer Schule."
      >
        <div className="relative mb-14">
          {/* A dotted path climbs over the steps, like the path in the header motif (from sm up). */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 -top-6 hidden h-[11.5rem] w-full text-golden sm:block"
          >
            {/* Traces the top edge of each step, just above it: ESA, MSA, Abitur. */}
            <path
              d="M2 93 L30 93 C33 93, 33 67, 36 67 L64 67 C67 67, 67 6, 70 6 L98 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="0.5 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="grid items-end gap-3 sm:grid-cols-3">
            {degrees.map((d) => (
              <li
                key={d.short}
                data-degree
                className={`deco-tile flex min-h-40 flex-col rounded-2xl p-6 ${d.tile} ${d.height}`}
              >
                <d.icon
                  className="mb-auto h-8 w-8 self-end opacity-80"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <p className="mt-6 text-4xl font-black leading-none">
                  {d.short}
                </p>
                <p className="mt-3 font-bold leading-snug">{d.name}</p>
                {d.when && (
                  <p className="mt-1 text-sm leading-snug">{d.when}</p>
                )}
                {d.routes && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {d.routes.map((r) => (
                      <li
                        key={r}
                        className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold leading-snug"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
        <h3
          id="profile"
          className="scroll-mt-24 text-2xl font-extrabold text-foreground mb-5"
        >
          Die Profile der Studienstufe
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {profiles.map((p) => (
            <div
              key={p.title}
              data-profile
              className={`deco-tile flex flex-col rounded-3xl p-7 sm:p-8 ${p.tile}`}
            >
              <p.icon
                className="mb-6 h-10 w-10"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h4 className="text-2xl font-extrabold leading-tight">
                {p.title}
              </h4>
              <p className="mt-1 font-semibold opacity-90">{p.subtitle}</p>
              <p className="mt-4 leading-relaxed opacity-90 text-pretty">
                {p.text}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {p.doing.map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          href="/oberstufe#voraussetzungen"
          className="group mt-5 flex items-center justify-between gap-4 rounded-2xl bg-surface-sand px-6 py-5 font-semibold text-foreground transition-colors hover:bg-surface-sand/70"
        >
          <span>
            Welche Voraussetzungen gelten für den Übergang in die Oberstufe?
          </span>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 dark:text-foreground"
            aria-hidden="true"
          />
        </Link>
      </PageSection>

      <PageSection
        id="ivk"
        eyebrow="Neu in Deutschland"
        title="Internationale Vorbereitungsklassen (IVK)."
        tone="sand"
      >
        <IvkSection />
        <div className="mt-12">
          <NextLink href="/schwerpunkt">
            Weiter zu unseren Schwerpunkten
          </NextLink>
        </div>
      </PageSection>
    </>
  );
}
