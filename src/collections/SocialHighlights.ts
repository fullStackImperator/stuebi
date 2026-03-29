import type { CollectionConfig } from "payload";

export const SocialHighlights: CollectionConfig = {
  slug: "social-highlights",
  labels: { singular: "Social highlight", plural: "Social highlights" },
  admin: {
    useAsTitle: "caption",
    description: "Manual Instagram-style tiles when the Graph API is not configured.",
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
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "caption",
      type: "text",
      required: true,
    },
    {
      name: "link",
      type: "text",
      admin: { description: "Full URL to the post or profile" },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers appear first" },
    },
  ],
  defaultSort: "sortOrder",
};
