/**
 * One-off (November 2026): photos from the school's IServ archive („Bilder/2026“), which Herr Herpe sent for the
 * website. Uploads three photos to Media and puts them into empty slots of „Seitenbilder“. Runs against
 * DATABASE_URL; fills only empty slots and reuses an upload with the same file name, so running it again changes
 * nothing. The photo files are passed as a folder:
 *
 *   npx payload run scripts/iserv-fotos.ts -- /pfad/zum/ordner
 */
import path from "node:path";
import config from "@payload-config";
import { getPayload } from "payload";

const dir = process.argv.at(-1);
if (!dir || dir.endsWith(".ts")) throw new Error("Ordner mit den Fotos angeben");

const payload = await getPayload({ config });

const photos = {
  band1: {
    file: "mensa-fruehstueck-raum.jpg",
    alt: "Frühstück in der Mensa: Kinder sitzen an langen Holztischen, ein Helfer in roter Schürze ist bei ihnen",
  },
  nachmittag: {
    file: "legokurs-fussballfelder.jpg",
    alt: "Im Legokurs gebaute Fußballfelder aus Legosteinen auf dem Boden, dahinter die Füße der Kinder",
  },
  mensa: {
    file: "mensa-fruehstueck.jpg",
    alt: "Blick über Obst und Müsli in die Mensa, wo Kinder an langen Tischen frühstücken",
  },
};

async function upload({ file, alt }: { file: string; alt: string }) {
  const found = await payload.find({ collection: "media", where: { filename: { equals: file } }, limit: 1, overrideAccess: true });
  if (found.docs[0]) return found.docs[0].id;
  const doc = await payload.create({ collection: "media", data: { alt }, filePath: path.join(dir!, file), overrideAccess: true });
  return doc.id;
}

const current = await payload.findGlobal({ slug: "page-images", depth: 0, overrideAccess: true });
const startseite = current.startseite ?? {};
const ganztag = current.ganztag ?? {};
const done: string[] = [];

const band1 = startseite.band1?.image ? startseite.band1 : (done.push("Startseite → Breites Foto 1"), { ...startseite.band1, image: await upload(photos.band1) });
const nachmittag = ganztag.nachmittag ?? (done.push("Ganztag → Nachmittag"), await upload(photos.nachmittag));
const mensa = ganztag.mensa ?? (done.push("Ganztag → Mensa"), await upload(photos.mensa));

await payload.updateGlobal({
  slug: "page-images",
  data: { startseite: { ...startseite, band1 }, ganztag: { ...ganztag, nachmittag, mensa } },
  overrideAccess: true,
});
payload.logger.info(done.length ? `Seitenbilder gefüllt: ${done.join(", ")}` : "Alle drei Plätze waren schon belegt.");

process.exit(0);
