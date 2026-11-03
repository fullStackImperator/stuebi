/**
 * One-off (Mail von Ljubica Sabadija vom 3.11.2026): Anmeldung für Klasse 5 und 7, Anmeldewoche, Schulführung
 * und das Treffen am Tag der offenen Tür für die Mittelstufe. Läuft gegen DATABASE_URL; fills only what is still
 * empty, so running it again changes nothing.
 *
 *   npx payload run scripts/mittelstufe-anmeldung.ts
 */
import config from "@payload-config";
import { getPayload } from "payload";

import { newDates, OPEN_DAY, openDayNote, registrationInfo } from "../src/seed/mittelstufe-anmeldung";

const payload = await getPayload({ config });

const department = (
  await payload.find({ collection: "departments", where: { slug: { equals: "mittelstufe" } }, limit: 1, depth: 0, overrideAccess: true })
).docs[0];
if (!department) throw new Error("Abteilung mittelstufe nicht gefunden");

const items = department.dates?.items ?? [];
const missing = newDates.filter((d) => !items.some((i) => i.title === d.title));
const dates = [...items.map((i) => (i.title === OPEN_DAY && !i.note ? { ...i, note: openDayNote } : i)), ...missing];

await payload.update({
  collection: "departments",
  id: department.id,
  data: {
    registration: { ...department.registration, info: department.registration?.info ?? registrationInfo },
    dates: { items: dates },
  },
  overrideAccess: true,
});
payload.logger.info(
  `Mittelstufe: Anmeldetext ${department.registration?.info ? "war schon da" : "angelegt"}, ${missing.length} Termin(e) neu.`,
);

process.exit(0);
