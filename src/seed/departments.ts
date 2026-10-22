/**
 * Seeds the Abteilungen (departments) collection.
 * Existing departments (matched by slug) are left untouched.
 *
 *   npx payload run src/seed/departments.ts
 */
import config from "@payload-config";
import { getPayload } from "payload";

import type { Department } from "../payload-types";

type RichText = NonNullable<NonNullable<Department["registration"]>["info"]>;

const text = (value: string) => ({
  type: "text",
  text: value,
  format: 0,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const block = (type: "paragraph" | "heading", value: string) => ({
  type,
  ...(type === "heading" ? { tag: "h3" } : { textFormat: 0, textStyle: "" }),
  children: [text(value)],
  direction: "ltr" as const,
  format: "" as const,
  indent: 0,
  version: 1,
});

const richText = (...nodes: ReturnType<typeof block>[]): RichText => ({
  root: {
    type: "root",
    children: nodes,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  },
});

const h = (value: string) => block("heading", value);
const p = (value: string) => block("paragraph", value);

// Dates at noon UTC so they stay on the same calendar day in Europe/Berlin.
const day = (iso: string) => `${iso}T12:00:00.000Z`;

const departments: Omit<Department, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Primarstufe",
    slug: "primarstufe",
    grades: "Vorschule bis Klasse 4",
    order: 1,
    intro:
      "Ein starker Start fürs Leben: Vorschule und Grundschule an einem Ort. Ihr Kind wächst in einem vertrauten Umfeld auf, behält seine Bezugspersonen und kann in Ruhe die Welt entdecken.",
    registration: {
      info: richText(
        h("Anmeldung zur Vorschule"),
        p(
          "Die Anmeldung zur Vorschule können Sie ganz einfach bei der Vorstellung der 4,5-Jährigen vornehmen – auch wenn die Vorstellung an einer anderen Schule stattfindet (z. B. an der Schule Burgweide). Die andere Schule trägt die Anmeldung dann für uns ein und schickt uns die Unterlagen.",
        ),
        p("Ansonsten können Sie Ihr Kind jederzeit bis zum Fristende bei uns im Schulbüro anmelden."),
        h("Anmeldung zur 1. Klasse"),
        p(
          "Die Anmeldung für die 1. Klasse läuft über ein Anmeldeformular, das Sie im Schulbüro Ihrer Erstwunschschule abgeben. Die Erstwunschschule trägt dann auch Ihren Zweit- und Drittwunsch ein.",
        ),
      ),
      downloads: [],
    },
    dates: {
      items: [
        {
          title: "Anmeldung Vorschule",
          kind: "registration",
          startDate: day("2026-11-01"),
          endDate: day("2027-01-22"),
          dateLabel: "ab November bis 22.01.2027",
        },
        {
          title: "Anmeldung 1. Klasse",
          kind: "registration",
          startDate: day("2027-01-04"),
          endDate: day("2027-01-22"),
        },
        {
          title: "Marktplatz der Grundschulen",
          kind: "info",
          startDate: day("2026-11-19"),
          time: "15:00 – 17:00 Uhr",
          location: "Tor zur Welt",
        },
        {
          title: "Winterfest",
          kind: "event",
          startDate: day("2026-12-03"),
        },
      ],
    },
    contact: {
      head: { name: "Sebastian Otto", role: "Abteilungsleitung Primarstufe" },
      office: { name: "Schulbüro Primarstufe", phone: "040 428 96 66 0" },
    },
  },
  {
    title: "Mittelstufe",
    slug: "mittelstufe",
    grades: "Klasse 5 bis 10",
    order: 2,
    intro:
      "Zwei Bildungswege, ein starkes Team: gemeinsame Beobachtungsstufe in Klasse 5 und 6, ab Jahrgang 7 Gymnasialzweig oder Stadtteilschulzweig – in derselben Schulgemeinschaft.",
    registration: { info: null, downloads: [] },
    dates: { items: [] },
    contact: { head: { role: "Abteilungsleitung Mittelstufe" }, office: { name: "Schulbüro" } },
  },
  {
    title: "Oberstufe",
    slug: "oberstufe",
    grades: "Klasse 11 bis 13",
    order: 3,
    intro:
      "Den Horizont erweitern, Zukunft gestalten: Die gymnasiale Oberstufe führt sicher zum Abitur – nach 12 Jahren im Gymnasialzweig oder nach 13 Jahren im Stadtteilschulzweig.",
    registration: { info: null, downloads: [] },
    dates: { items: [] },
    contact: { head: { role: "Abteilungsleitung Oberstufe" }, office: { name: "Schulbüro" } },
  },
];

const payload = await getPayload({ config });

for (const data of departments) {
  const existing = await payload.find({
    collection: "departments",
    where: { slug: { equals: data.slug } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs.length > 0) {
    payload.logger.info(`Abteilung "${data.slug}" existiert bereits – übersprungen.`);
    continue;
  }
  await payload.create({ collection: "departments", data, overrideAccess: true });
  payload.logger.info(`Abteilung "${data.slug}" angelegt.`);
}

process.exit(0);
