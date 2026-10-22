import type { CollectionConfig } from "payload";
import { slugField } from "payload";

const isAdmin = ({ req }: { req: { user?: unknown } }) =>
  (req.user as { role?: string } | undefined)?.role === "admin";

const isStaff = ({ req }: { req: { user?: unknown } }) => {
  const role = (req.user as { role?: string } | undefined)?.role;
  return role === "admin" || role === "teacher";
};

/**
 * Abteilungen (Primarstufe, Mittelstufe, Oberstufe) with the blocks
 * Anmeldung, nächste Termine and Kontakt. Rendered at /abteilungen/[slug].
 */
export const Departments: CollectionConfig = {
  slug: "departments",
  labels: { singular: "Abteilung", plural: "Abteilungen" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "grades", "order"],
  },
  defaultSort: "order",
  access: {
    read: () => true,
    create: isAdmin,
    update: isStaff,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      label: "Name",
      type: "text",
      required: true,
    },
    slugField({ fieldToUse: "title" }),
    {
      name: "grades",
      label: "Jahrgänge",
      type: "text",
      admin: { description: "z. B. „Vorschule bis Klasse 4“" },
    },
    {
      name: "order",
      label: "Reihenfolge",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
    {
      name: "intro",
      label: "Einleitung",
      type: "textarea",
    },
    {
      type: "tabs",
      tabs: [
        {
          name: "registration",
          label: "Anmeldung",
          fields: [
            {
              name: "info",
              label: "Infos zur Anmeldung",
              type: "richText",
            },
            {
              name: "downloads",
              label: "Downloads",
              type: "array",
              admin: { description: "z. B. Anmeldeformular als PDF" },
              fields: [
                { name: "label", label: "Bezeichnung", type: "text", required: true },
                {
                  name: "file",
                  label: "Datei",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: "dates",
          label: "Termine",
          fields: [
            {
              name: "items",
              label: "Nächste Termine",
              type: "array",
              admin: {
                description:
                  "Vergangene Termine werden auf der Webseite automatisch ausgeblendet.",
              },
              fields: [
                { name: "title", label: "Titel", type: "text", required: true },
                {
                  name: "kind",
                  label: "Art",
                  type: "select",
                  required: true,
                  defaultValue: "event",
                  options: [
                    { label: "Anmeldezeitraum", value: "registration" },
                    { label: "Infoveranstaltung", value: "info" },
                    { label: "Veranstaltung", value: "event" },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "startDate",
                      label: "Datum / Beginn",
                      type: "date",
                      required: true,
                      admin: { date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" } },
                    },
                    {
                      name: "endDate",
                      label: "Ende (optional)",
                      type: "date",
                      admin: { date: { pickerAppearance: "dayOnly", displayFormat: "dd.MM.yyyy" } },
                    },
                  ],
                },
                {
                  name: "dateLabel",
                  label: "Eigene Datumsangabe (optional)",
                  type: "text",
                  admin: {
                    description: "Ersetzt die Datumsanzeige, z. B. „ab November bis 22.01.2027“",
                  },
                },
                {
                  type: "row",
                  fields: [
                    { name: "time", label: "Uhrzeit", type: "text" },
                    { name: "location", label: "Ort", type: "text" },
                  ],
                },
                { name: "note", label: "Hinweis", type: "textarea" },
              ],
            },
          ],
        },
        {
          name: "contact",
          label: "Kontakt",
          fields: [
            {
              name: "head",
              label: "Abteilungsleitung",
              type: "group",
              fields: [
                { name: "name", label: "Name", type: "text" },
                { name: "role", label: "Funktion", type: "text", defaultValue: "Abteilungsleitung" },
                { name: "email", label: "E-Mail", type: "email" },
                { name: "phone", label: "Telefon", type: "text" },
              ],
            },
            {
              name: "office",
              label: "Schulbüro",
              type: "group",
              fields: [
                { name: "name", label: "Bezeichnung", type: "text", defaultValue: "Schulbüro" },
                { name: "email", label: "E-Mail", type: "email" },
                { name: "phone", label: "Telefon", type: "text" },
                { name: "hours", label: "Öffnungszeiten", type: "textarea" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
