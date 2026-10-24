import { getPayloadClient } from "@/lib/get-payload";
import type { PageImage } from "@/payload-types";

/** Loads all photo slots (global "Seitenbilder") with their media populated. */
export async function getPageImages(): Promise<PageImage> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "page-images", depth: 1, overrideAccess: true });
}
