import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    hidden: ({ user }) => (user as { role?: string } | undefined)?.role !== "admin",
  },
  auth: true,
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "teacher",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Teacher", value: "teacher" },
      ],
      access: {
        update: ({ req }) => (req.user as { role?: string } | undefined)?.role === "admin",
      },
    },
  ],
  access: {
    create: () => true,
    read: ({ req }) => {
      if (!req.user) return false;
      const role = (req.user as { role?: string }).role;
      if (role === "admin") return true;
      return {
        id: { equals: req.user.id },
      };
    },
    update: ({ req, id }) => {
      if ((req.user as { role?: string } | undefined)?.role === "admin") return true;
      return req.user?.id === id;
    },
    delete: ({ req }) =>
      (req.user as { role?: string } | undefined)?.role === "admin",
  },
};
