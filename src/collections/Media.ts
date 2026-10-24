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
  upload: {
    // Editors set a focus point so faces stay in frame in wide (desktop) and tall (phone) crops.
    focalPoint: true,
    imageSizes: [
      { name: "small", width: 640, formatOptions: { format: "webp" } },
      { name: "medium", width: 1280, formatOptions: { format: "webp" } },
      { name: "large", width: 1920, formatOptions: { format: "webp" } },
    ],
  },
};
