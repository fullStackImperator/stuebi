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
  const src = large?.url ?? media.url;
  if (!src) return null;
  return {
    src,
    alt: media.alt,
    width: (large?.url ? large.width : media.width) ?? 1600,
    height: (large?.url ? large.height : media.height) ?? 1200,
    objectPosition: `${media.focalX ?? 50}% ${media.focalY ?? 50}%`,
  };
}
