import type { Media } from "@/payload-types";

export type Photo = { src: string; alt: string; width: number; height: number; objectPosition: string };

/**
 * Turns a media relation into image props, or null when the slot is empty, the relation is not
 * populated (bare id) or the file has no URL. URLs stay relative so next/image treats them as
 * local images on any domain.
 */
export function toPhoto(media: number | Media | null | undefined): Photo | null {
  if (!media || typeof media === "number") return null;
  const large = media.sizes?.large;
  const url = large?.url ?? media.url;
  if (!url) return null;
  // Payload prefixes serverURL; next/image would then treat the file as remote (and Next 16 blocks
  // local IPs), so keep only the path.
  const src = /^https?:\/\//.test(url) ? new URL(url).pathname : url;
  return {
    src,
    alt: media.alt,
    width: (large?.url ? large.width : media.width) ?? 1600,
    height: (large?.url ? large.height : media.height) ?? 1200,
    objectPosition: `${media.focalX ?? 50}% ${media.focalY ?? 50}%`,
  };
}

/** Turns a gallery (hasMany upload) into image props, skipping empty or file-less entries. */
export function toPhotos(media: (number | Media)[] | null | undefined): Photo[] {
  return (media ?? []).map(toPhoto).filter((p): p is Photo => p !== null);
}
