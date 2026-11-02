/**
 * One-off (Mail der Schulleitung vom 2.11.2026): „Winterfest“ heißt „Tag der offenen Tür – Winterfest“
 * und steht auch bei Mittel- und Oberstufe. Läuft gegen DATABASE_URL; mehrfaches Ausführen ändert nichts mehr.
 *
 *   npx payload run scripts/rename-winterfest.ts
 */
import config from "@payload-config";
import { getPayload } from "payload";

const TITLE = "Tag der offenen Tür – Winterfest";
const TIME = "15:00 – 18:00 Uhr";

const payload = await getPayload({ config });

const find = async (slug: string) =>
  (await payload.find({ collection: "departments", where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true })).docs[0];

const primar = await find("primarstufe");
const fest = primar?.dates?.items?.find((i) => i.title === "Winterfest" || i.title === TITLE);
if (!primar || !fest) throw new Error("Winterfest in der Primarstufe nicht gefunden");

await payload.update({
  collection: "departments",
  id: primar.id,
  data: { dates: { items: (primar.dates?.items ?? []).map((i) => (i.id === fest.id ? { ...i, title: TITLE, time: i.time || TIME } : i)) } },
  overrideAccess: true,
});
payload.logger.info(`Primarstufe: „${fest.title}“ → „${TITLE}“`);

for (const slug of ["mittelstufe", "oberstufe"]) {
  const department = await find(slug);
  if (!department) throw new Error(`Abteilung ${slug} nicht gefunden`);
  const items = department.dates?.items ?? [];
  if (items.some((i) => i.title === TITLE)) {
    payload.logger.info(`${slug}: Termin existiert bereits – übersprungen.`);
    continue;
  }
  await payload.update({
    collection: "departments",
    id: department.id,
    data: { dates: { items: [...items, { title: TITLE, kind: "event", startDate: fest.startDate, time: TIME }] } },
    overrideAccess: true,
  });
  payload.logger.info(`${slug}: Termin angelegt.`);
}

process.exit(0);
