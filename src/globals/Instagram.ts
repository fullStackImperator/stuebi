import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";

import { INSTAGRAM_CACHE_TAG } from "@/lib/social/instagram-config";

const isAdmin = ({ req }: { req: { user?: unknown } }) =>
  (req.user as { role?: string } | undefined)?.role === "admin";

const SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000;

// Access token for the school's Instagram account. The site renews it on its own (see src/lib/social/instagram.ts).
export const Instagram: GlobalConfig = {
  slug: "instagram",
  label: "Instagram",
  admin: {
    description:
      "Zugang zum Instagram-Account der Schule. Den Token einmal hier eintragen, danach erneuert die Webseite ihn selbst.",
    hidden: ({ user }) => (user as { role?: string } | undefined)?.role !== "admin",
  },
  access: { read: isAdmin, update: isAdmin },
  fields: [
    {
      name: "accessToken",
      label: "Access Token",
      type: "text",
      admin: {
        description:
          "Aus dem Meta-Entwickler-Dashboard: Instagram → API setup with Unified login → „Token generieren“.",
      },
    },
    {
      name: "tokenRefreshedAt",
      label: "Zuletzt erneuert",
      type: "date",
      admin: { readOnly: true, date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "tokenExpiresAt",
      label: "Läuft ab am",
      type: "date",
      admin: {
        readOnly: true,
        date: { pickerAppearance: "dayAndTime" },
        description: "Die Webseite erneuert den Token jede Woche. Ein Datum in der Vergangenheit heißt: neuen Token eintragen.",
      },
    },
    {
      name: "lastError",
      label: "Letzter Fehler",
      type: "textarea",
      admin: { readOnly: true },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, context }) => {
        // A token pasted by hand counts as fresh; renewals from the site set the dates themselves.
        if (!context.instagramRenewal && data.accessToken && data.accessToken !== originalDoc?.accessToken) {
          data.accessToken = String(data.accessToken).trim();
          data.tokenRefreshedAt = new Date().toISOString();
          data.tokenExpiresAt = new Date(Date.now() + SIXTY_DAYS_MS).toISOString();
          data.lastError = null;
        }
        return data;
      },
    ],
    afterChange: [
      ({ context }) => {
        // A new token should show the posts right away, not after the hourly cache runs out.
        if (!context.instagramRenewal) {
          try {
            revalidateTag(INSTAGRAM_CACHE_TAG, { expire: 0 });
          } catch {
            // Outside a Next.js request (e.g. a seed script) there is no cache to clear.
          }
        }
      },
    ],
  },
};
