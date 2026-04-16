import type { Media } from "@/payload-types";

const base = () => process.env.NEXT_PUBLIC_SERVER_URL || "";

export function mediaUrl(media: number | Media | null | undefined): string | null {
  if (!media || typeof media === "number") return null;
  const u = media.url;
  if (!u) return null;
  if (u.startsWith("http")) return u;
  return `${base().replace(/\/$/, "")}${u}`;
}
