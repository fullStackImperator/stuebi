import type { SocialPost } from "./types";

export async function fetchFacebookGraphPosts(): Promise<SocialPost[]> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!token || !pageId) return [];

  const url = new URL(`https://graph.facebook.com/v21.0/${pageId}/feed`);
  url.searchParams.set(
    "fields",
    "id,message,permalink_url,full_picture,created_time",
  );
  url.searchParams.set("limit", "6");
  url.searchParams.set("access_token", token);

  const res = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!res.ok) return [];
  const json = (await res.json()) as {
    data?: Array<{
      id: string;
      message?: string;
      permalink_url?: string;
      full_picture?: string;
    }>;
  };
  if (!json.data) return [];
  return json.data.map((p) => ({
    id: p.id,
    caption: p.message,
    imageUrl: p.full_picture,
    permalink: p.permalink_url || `https://www.facebook.com/${p.id}`,
    source: "facebook" as const,
  }));
}
