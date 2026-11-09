/**
 * One-off (November 2026): puts the Sport and Makerspace galleries in the order of scripts/seitenbilder-fuellen.ts,
 * so a wide, sharp photo ends up in the wide last cell of the bento. Changes only the order of photos already there.
 *
 *   npx payload run scripts/seitenbilder-reihenfolge.ts
 */
import config from "@payload-config";
import { getPayload } from "payload";

const order: Record<"sportGalerie" | "makerspaceGalerie", string[]> = {
  sportGalerie: ["sport-kletterwand.jpg", "sport-osw-cup-basketball.jpg", "sport-judo.jpg", "sport-nba-trikots.jpg", "sport-basketball.jpg", "sport-judo-wurf.jpg"],
  makerspaceGalerie: ["makerspace-3d-druck-nah.jpg", "makerspace-modell.jpg", "makerspace-codeweek.jpg", "makerspace-elektronik.jpg", "makerspace-lego-kinderrechte.jpg", "makerspace-roboter-3d-druck.jpg"],
};

const payload = await getPayload({ config });
const g = await payload.findGlobal({ slug: "page-images", depth: 1, overrideAccess: true });
const schwerpunkt = { ...(g.schwerpunkt ?? {}) } as Record<string, unknown>;
const ids = (v: unknown) => (Array.isArray(v) ? v.map((m) => (m && typeof m === "object" ? (m as { id: number }).id : m)) : v);
for (const k of Object.keys(schwerpunkt)) schwerpunkt[k] = Array.isArray(schwerpunkt[k]) ? ids(schwerpunkt[k]) : (schwerpunkt[k] as { id?: number } | null)?.id ?? schwerpunkt[k];

for (const [field, files] of Object.entries(order)) {
  const docs = ((g.schwerpunkt as Record<string, unknown>)?.[field] as { id: number; filename?: string }[]) ?? [];
  const rank = (d: { filename?: string }) => { const i = files.indexOf(d.filename ?? ""); return i === -1 ? files.length : i };
  schwerpunkt[field] = [...docs].sort((a, b) => rank(a) - rank(b)).map((d) => d.id);
}

await payload.updateGlobal({ slug: "page-images", data: { schwerpunkt }, overrideAccess: true });
payload.logger.info("Reihenfolge der Galerien Sport und Makerspace gesetzt.");
process.exit(0);
