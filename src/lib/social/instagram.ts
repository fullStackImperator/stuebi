import type { SocialPost } from "./types";

export async function fetchInstagramGraphPosts(): Promise<SocialPost[]> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const igUserId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!token || !igUserId) return [];

  const url = new URL(
    `https://graph.facebook.com/v21.0/${igUserId}/media`,
  );
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,permalink,thumbnail_url",
  );
  url.searchParams.set("limit", "8");
  url.searchParams.set("access_token", token);

  const res = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!res.ok) return [];
  const json = (await res.json()) as {
    data?: Array<{
      id: string;
      caption?: string;
      media_url?: string;
      permalink?: string;
      thumbnail_url?: string;
    }>;
  };
  if (!json.data) return [];
  return json.data.map((p) => ({
    id: p.id,
    caption: p.caption,
    imageUrl: p.media_url || p.thumbnail_url,
    permalink: p.permalink || `https://www.instagram.com/p/${p.id}/`,
    source: "instagram" as const,
  }));
}
