import type { CollectionConfig } from "payload";
import { slugField } from "payload";

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
    slugField({ fieldToUse: "title" }),
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
