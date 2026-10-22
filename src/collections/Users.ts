import type { CollectionConfig } from "payload";

import { rateLimitAuth, resetLoginRateLimit } from "../lib/auth-rate-limit";

const MINUTE = 60 * 1000;

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    hidden: ({ user }) => (user as { role?: string } | undefined)?.role !== "admin",
  },
  auth: {
    /** Brute-force protection per account: lock after 5 wrong passwords for 15 minutes. */
    maxLoginAttempts: 5,
    lockTime: 15 * MINUTE,
    /** Password reset links are valid for 30 minutes (default: 1 hour). */
    forgotPassword: { expiration: 30 * MINUTE },
    cookies: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
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
    beforeOperation: [rateLimitAuth],
    afterLogin: [resetLoginRateLimit],
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
    /** Only admins add accounts. The very first admin is created via /admin's "create first user" screen, which bypasses this check only while the users table is empty. */
    create: ({ req }) => (req.user as { role?: string } | undefined)?.role === "admin",
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
