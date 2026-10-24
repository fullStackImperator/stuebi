import { getPayloadClient } from "@/lib/get-payload";
import type { PageImage } from "@/payload-types";

/** Loads all photo slots (global "Seitenbilder") with their media populated. */
export async function getPageImages(): Promise<Partial<PageImage>> {
  try {
    const payload = await getPayloadClient();
    return await payload.findGlobal({ slug: "page-images", depth: 1, overrideAccess: true });
  } catch (err) {
    // Ohne Datenbank (z. B. beim Build) bleiben die Fotoplätze leer; revalidate füllt sie nach.
    console.error("getPageImages: Seitenbilder konnten nicht geladen werden", err);
    return {};
  }
}
