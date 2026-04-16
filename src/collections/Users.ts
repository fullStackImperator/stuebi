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
      /** Required so `req.user.role` is set on every admin/API request (JWT). Without this, access control sees `undefined` and denies everything. */
      saveToJWT: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Teacher", value: "teacher" },
      ],
      access: {
        update: ({ req }) => (req.user as { role?: string } | undefined)?.role === "admin",
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== "create" || !data) return data;
        const { totalDocs } = await req.payload.count({
          collection: "users",
          overrideAccess: true,
        });
        if (totalDocs === 0) {
          return { ...data, role: "admin" };
        }
        return data;
      },
    ],
  },
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
