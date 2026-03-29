import type { CollectionConfig, PayloadRequest } from "payload";
import { slugField } from "payload";

async function isAuthorOrAdmin({
  req,
  id,
}: {
  req: PayloadRequest;
  id?: string | number;
}): Promise<boolean> {
  const user = req.user;
  const role = (user as { role?: string } | null)?.role;
  if (role === "admin") return true;
  if (role !== "teacher" || !user?.id || id === undefined) return false;
  const doc = await req.payload.findByID({
    collection: "news",
    id: String(id),
    overrideAccess: true,
    depth: 0,
  });
  let authorId: string | null = null;
  if (typeof doc.author === "object" && doc.author !== null && "id" in doc.author) {
    authorId = String((doc.author as { id: string | number }).id);
  } else if (doc.author) {
    authorId = String(doc.author);
  }
  return authorId === String(user.id);
}

export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt", "author"],
  },
  access: {
    read: ({ req }) => {
      if (!req.user) {
        return {
          status: { equals: "published" },
        };
      }
      const role = (req.user as { role?: string }).role;
      if (role === "admin" || role === "teacher") return true;
      return {
        status: { equals: "published" },
      };
    },
    create: ({ req }) => {
      const role = (req.user as { role?: string } | undefined)?.role;
      return role === "admin" || role === "teacher";
    },
    update: async ({ req, id }) => isAuthorOrAdmin({ req, id }),
    delete: async ({ req, id }) => isAuthorOrAdmin({ req, id }),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({ fieldToUse: "title" }),
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      access: {
        update: ({ req }) => {
          const role = (req.user as { role?: string } | undefined)?.role;
          return role === "admin" || role === "teacher";
        },
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: false,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === "create" && req.user && !data.author) {
          return {
            ...data,
            author: req.user.id,
          };
        }
        return data;
      },
    ],
  },
};
