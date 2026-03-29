import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: ({ req }) => {
      const role = (req.user as { role?: string } | undefined)?.role;
      return role === "admin" || role === "teacher";
    },
    update: ({ req }) =>
      (req.user as { role?: string } | undefined)?.role === "admin",
    delete: ({ req }) =>
      (req.user as { role?: string } | undefined)?.role === "admin",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
