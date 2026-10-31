import type { Field, GlobalConfig } from "payload";

const isStaff = ({ req }: { req: { user?: unknown } }) => {
  const role = (req.user as { role?: string } | undefined)?.role;
  return role === "admin" || role === "teacher";
};

const photo = (name: string, label: string): Field => ({
  name,
  label,
  type: "upload",
  relationTo: "media",
});

// Several photos for one Schwerpunkt section; the title photo stays a separate slot.
const gallery = (name: string, label: string): Field => ({
  name,
  label,
  type: "upload",
  relationTo: "media",
  hasMany: true,
  maxRows: 6,
  admin: { description: "Bis zu 6 weitere Fotos für die Schwerpunkt-Seite, per Ziehen sortierbar." },
});

// Full-width photo between sections, with an optional one-line caption.
const band = (label: string, name = "band"): Field => ({
  name,
  label,
  type: "group",
  fields: [
    { name: "image", label: "Foto", type: "upload", relationTo: "media" },
    { name: "caption", label: "Bildunterschrift (optional)", type: "text" },
  ],
});

/**
 * Photo slots on the public pages. Empty slots are simply not shown on the site.
 */
export const PageImages: GlobalConfig = {
  slug: "page-images",
  label: "Seitenbilder",
  access: {
    read: () => true,
    update: isStaff,
  },
  fields: [
    {
      name: "startseite",
      label: "Startseite",
      type: "group",
      fields: [
        photo("hero", "Titelbild"),
        band("Breites Foto 1 (nach „Vision“)", "band1"),
        band("Breites Foto 2 (nach „Schulalltag“)", "band2"),
      ],
    },
    {
      name: "bildungswege",
      label: "Bildungswege",
      type: "group",
      fields: [
        photo("vorschule", "Vorschule"),
        photo("grundschule", "Grundschule"),
        photo("mittelstufe", "Mittelstufe"),
        photo("oberstufe", "Oberstufe"),
        band("Breites Foto (vor „Abschlüsse“)"),
      ],
    },
    {
      name: "schwerpunkt",
      label: "Schwerpunkt",
      type: "group",
      fields: [
        photo("sport", "Sport – Titelfoto"),
        gallery("sportGalerie", "Sport – Galerie"),
        photo("makerspace", "Makerspace – Titelfoto"),
        gallery("makerspaceGalerie", "Makerspace – Galerie"),
        photo("abgekocht", "Abgekocht! – Titelfoto"),
        gallery("abgekochtGalerie", "Abgekocht! – Galerie"),
      ],
    },
    {
      name: "ganztag",
      label: "Ganztag",
      type: "group",
      fields: [photo("nachmittag", "Nachmittag"), photo("mensa", "Mensa")],
    },
    { name: "vision", label: "Vision", type: "group", fields: [band("Breites Foto")] },
    { name: "anmeldung", label: "Anmeldung", type: "group", fields: [band("Breites Foto")] },
  ],
};
