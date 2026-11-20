import { unstable_cache } from "next/cache";

import { getPayloadClient } from "@/lib/get-payload";
import { INSTAGRAM_CACHE_TAG, INSTAGRAM_PROFILE_URL } from "./instagram-config";
import type { SocialPost } from "./types";

// Instagram API with Instagram Login: the account holder signs in once, the token is kept in the
// "Instagram" global in the CMS. Long-lived tokens last 60 days and can be renewed once they are a day old.
const GRAPH = "https://graph.instagram.com";
const RENEW_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
const POST_COUNT = 6;

type Settings = {
  accessToken?: string | null;
  tokenRefreshedAt?: string | null;
};

type Payload = Awaited<ReturnType<typeof getPayloadClient>>;

async function saveSettings(payload: Payload, data: Record<string, unknown>) {
  await payload.updateGlobal({
    slug: "instagram",
    data,
    overrideAccess: true,
    context: { instagramRenewal: true },
  });
}

/** Renews the token once a week, so it never reaches its 60-day expiry. Returns the token to use. */
async function renewIfDue(payload: Payload, settings: Settings): Promise<string> {
  const token = settings.accessToken!;
  const refreshedAt = settings.tokenRefreshedAt ? Date.parse(settings.tokenRefreshedAt) : 0;
  if (Date.now() - refreshedAt < RENEW_AFTER_MS) return token;

  const url = new URL(`${GRAPH}/refresh_access_token`);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", token);
  const res = await fetch(url, { cache: "no-store" });
  const json = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: { message?: string };
  };

  if (!res.ok || !json.access_token) {
    await saveSettings(payload, {
      lastError: `Token-Erneuerung fehlgeschlagen (${new Date().toISOString()}): ${json.error?.message ?? res.status}`,
    });
    return token;
  }

  await saveSettings(payload, {
    accessToken: json.access_token,
    tokenRefreshedAt: new Date().toISOString(),
    tokenExpiresAt: new Date(Date.now() + (json.expires_in ?? 60 * 24 * 60 * 60) * 1000).toISOString(),
    lastError: null,
  });
  return json.access_token;
}

async function loadPosts(): Promise<SocialPost[]> {
  try {
    const payload = await getPayloadClient();
    const settings = (await payload.findGlobal({ slug: "instagram", overrideAccess: true })) as Settings;
    if (!settings.accessToken) return [];

    const token = await renewIfDue(payload, settings);

    const url = new URL(`${GRAPH}/me/media`);
    url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
    url.searchParams.set("limit", String(POST_COUNT));
    url.searchParams.set("access_token", token);
    const res = await fetch(url, { cache: "no-store" });
    const json = (await res.json().catch(() => ({}))) as {
      data?: Array<{
        id: string;
        caption?: string;
        media_type?: string;
        media_url?: string;
        thumbnail_url?: string;
        permalink?: string;
      }>;
      error?: { message?: string };
    };

    if (!res.ok || !json.data) {
      await saveSettings(payload, {
        lastError: `Posts konnten nicht geladen werden (${new Date().toISOString()}): ${json.error?.message ?? res.status}`,
      });
      return [];
    }

    return json.data
      .map((p) => ({
        id: p.id,
        caption: p.caption,
        // Videos have their still image in thumbnail_url.
        imageUrl: p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url,
        permalink: p.permalink || INSTAGRAM_PROFILE_URL,
        source: "instagram" as const,
      }))
      .filter((p) => p.imageUrl);
  } catch (err) {
    // Without a database (e.g. during the build) the page still renders, just without posts.
    console.error("Instagram: Posts konnten nicht geladen werden", err);
    return [];
  }
}

/** The latest posts of the school's account, fetched at most once an hour. */
export const getInstagramPosts = unstable_cache(loadPosts, ["instagram-posts"], {
  revalidate: 3600,
  tags: [INSTAGRAM_CACHE_TAG],
});

/** Kept for the older social section; same data. */
export const fetchInstagramGraphPosts = getInstagramPosts;
