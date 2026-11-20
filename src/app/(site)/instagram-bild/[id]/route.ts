import { getInstagramPosts } from "@/lib/social/instagram";

// Serves the Instagram pictures from our own server, so visitors' browsers never contact Meta
// (see Datenschutz: no embedded third-party content). Only ids of the current posts are allowed.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = (await getInstagramPosts()).find((p) => p.id === id);
  if (!post?.imageUrl) return new Response("Not found", { status: 404 });

  const upstream = await fetch(post.imageUrl, { cache: "no-store" });
  const type = upstream.headers.get("content-type") ?? "";
  if (!upstream.ok || !type.startsWith("image/")) return new Response("Bad gateway", { status: 502 });

  return new Response(upstream.body, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
