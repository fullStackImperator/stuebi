import type { CollectionConfig, TextField } from "payload";
import { slugField } from "payload";

import { validatePageSlug } from "@/lib/reserved-slugs";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    hidden: ({ user }) => (user as { role?: string } | undefined)?.role !== "admin",
  },
  access: {
    read: () => true,
    create: ({ req }) =>
      (req.user as { role?: string } | undefined)?.role === "admin",
    update: ({ req }) =>
      (req.user as { role?: string } | undefined)?.role === "admin",
    delete: ({ req }) =>
      (req.user as { role?: string } | undefined)?.role === "admin",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({
      fieldToUse: "title",
      // Reservierte Slugs (eigene Routen wie /ganztag) würden die CMS-Seite unerreichbar machen.
      overrides: (row) => ({
        ...row,
        fields: row.fields.map((f) =>
          f.type === "text" && f.name === "slug"
            ? ({ ...f, validate: (value: string | null | undefined) => validatePageSlug(value) } as TextField)
            : f,
        ),
      }),
    }),
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};
