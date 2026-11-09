/**
 * One-off (November 2026): replaces the photo in „Seitenbilder → Bildungswege → Mittelstufe“ (graffiti) with a photo
 * from the Baufestival of Jahrgang 8 (IServ archive). The graffiti photo stays in the media library. Running it again
 * changes nothing.
 *
 *   npx payload run scripts/mittelstufe-foto.ts -- /pfad/zum/ordner
 */
import path from "node:path";
import config from "@payload-config";
import { getPayload } from "payload";

const dir = process.argv.at(-1);
if (!dir || dir.endsWith(".ts")) throw new Error("Ordner mit dem Foto angeben");

const file = "mittelstufe-baufestival.jpg";
const alt = "Baufestival im Jahrgang 8: Schülerinnen und Schüler bauen mit einem Handwerker Vogelhäuser aus Holz";

const payload = await getPayload({ config });
const found = await payload.find({ collection: "media", where: { filename: { equals: file } }, limit: 1, overrideAccess: true });
const media = found.docs[0] ?? (await payload.create({ collection: "media", data: { alt }, filePath: path.join(dir, file), overrideAccess: true }));

const g = await payload.findGlobal({ slug: "page-images", depth: 0, overrideAccess: true });
await payload.updateGlobal({
  slug: "page-images",
  data: { bildungswege: { ...g.bildungswege, mittelstufe: media.id } },
  overrideAccess: true,
});
payload.logger.info(`Bildungswege → Mittelstufe: ${file}`);
process.exit(0);
