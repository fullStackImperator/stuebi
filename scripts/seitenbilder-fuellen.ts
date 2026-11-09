/**
 * One-off (November 2026): fills all empty „Seitenbilder“ slots so the school can swap every photo in the CMS.
 * New photos come from the school's IServ archive (Bilder/2026, 2024, 2025, Stübi Makerspace, Ganztag_Kurse), which
 * Herr Herpe named for the website; the others are the photos the site showed in code until now (public/images/fotos).
 *
 * Runs against DATABASE_URL. Fills only empty slots and empty galleries, and reuses an upload with the same file
 * name, so running it again changes nothing. The new photos are passed as a folder:
 *
 *   npx payload run scripts/seitenbilder-fuellen.ts -- /pfad/zum/ordner
 */
import path from "node:path";
import config from "@payload-config";
import { getPayload } from "payload";

const dir = process.argv.at(-1);
if (!dir || dir.endsWith(".ts")) throw new Error("Ordner mit den Fotos angeben");
const site = path.resolve("public/images/fotos");

type Foto = { file: string; alt: string; from?: "site" };
const neu = (file: string, alt: string): Foto => ({ file, alt });
const alt = (file: string, alt: string): Foto => ({ file, alt, from: "site" });

const slots = {
  startseite: {
    band2: neu("schulhof-gebaeude.jpg", "Der Schulhof mit Kletterbalken im Sand vor dem blauen Schulgebäude"),
  },
  bildungswege: {
    vorschule: neu("vorschule-bienen.jpg", "Vorschulkinder halten beim Bienenprojekt Bienenwaben in den Händen"),
    grundschule: neu("grundschule-holzwerkstatt.jpg", "Ein Junge mit Schutzbrille hämmert in der Holzwerkstatt einen Nagel ein"),
    mittelstufe: neu("mittelstufe-graffiti.jpg", "Ein Schüler sprüht im Graffitikurs „Ihr seid Power“ auf einen Container"),
    oberstufe: neu("oberstufe-abitur-schiff.jpg", "Der Abiturjahrgang vor dem Museumsschiff Peking im Hamburger Hafen"),
    band: alt("abitur-2025.jpg", "Der Abiturjahrgang 2025 jubelt mit Zeugnissen und Rosen in der Halle"),
  },
  schwerpunkt: {
    sport: neu("sport-akrobatik.jpg", "Schülerinnen bauen im Sportunterricht eine Akrobatik-Figur auf der Matte"),
    sportGalerie: [
      neu("sport-kletterwand.jpg", "Ein Schüler klettert an der Boulderwand in der Sporthalle"),
      neu("sport-osw-cup-basketball.jpg", "Basketball beim OSW-Cup in der Sporthalle"),
      alt("sport-judo.jpg", "Zwei Schülerinnen im Judoanzug beim Training"),
      neu("sport-nba-trikots.jpg", "Bunte NBA-Trikots vom Junior-NBA-Projekt mit den Hamburg Towers"),
      alt("sport-basketball.jpg", "Basketballteam der Stübi in Trikots in einer Reihe"),
      neu("sport-judo-wurf.jpg", "Judotag der Jahrgänge 1 bis 4: Trainer zeigen einen Wurf, die Kinder schauen am Mattenrand zu"),
    ],
    makerspace: neu("makerspace-3d-drucker-raum.jpg", "Schülerinnen und Schüler arbeiten im Makerspace an einer Reihe von 3D-Druckern"),
    makerspaceGalerie: [
      neu("makerspace-3d-druck-nah.jpg", "Nahaufnahme: Ein 3D-Drucker druckt eine grüne Figur"),
      neu("makerspace-modell.jpg", "Vier Schüler zeigen stolz ihr selbst gebautes Modell eines Klassenraums"),
      neu("makerspace-codeweek.jpg", "Kinder programmieren bei der Code Week einen Lernroboter auf einem Spielfeld aus Papier"),
      alt("makerspace-elektronik.jpg", "Zwei Kinder bauen gemeinsam an einer kleinen Elektronikschaltung"),
      neu("makerspace-lego-kinderrechte.jpg", "Eine Stadt aus Lego mit Figuren, gebaut im Workshop zu den Kinderrechten"),
      neu("makerspace-roboter-3d-druck.jpg", "Kleine Roboter mit Gehäusen aus dem 3D-Drucker und Elektronikteilen auf einem Tisch"),
    ],
    abgekocht: neu("abgekocht-teller.jpg", "Kinder der Klasse 4b haben in der Schulküche viele Teller mit Essen angerichtet"),
    abgekochtGalerie: [
      neu("abgekocht-lachs.jpg", "Ein Schüler mit Handschuhen schneidet in der Schulküche Lachs in Stücke"),
      neu("abgekocht-kueche-4b.jpg", "Kinder kochen gemeinsam in der Schulküche"),
      neu("abgekocht-tafel.jpg", "Schülerinnen und Schüler essen gemeinsam an einer langen Tafel"),
      neu("abgekocht-waffeln.jpg", "Waffeln backen im Jahrgang 5: frische Waffeln im Waffeleisen"),
      alt("abgekocht-schulgarten.jpg", "Schüler pflanzen Setzlinge in ein Hochbeet im Schulgarten"),
    ],
  },
  ganztag: {
    mensaGalerie: [
      neu("mensa-bistro-theke.jpg", "Die Theke des Schulbistros „Twenty Five“"),
      neu("mensa-kakao.jpg", "Zwei Töpfe heißer Kakao für die Kakaopause der Primarstufe"),
      neu("mensa-pause.jpg", "Kinder sitzen in der Kakaopause an langen Tischen in der Mensa"),
    ],
  },
  vision: {
    band: alt("kollegium.jpg", "Das Kollegium der Schule Stübenhofer Weg auf dem Schulhof, vorne der Schulhund"),
  },
  anmeldung: {
    band: alt("grundschule-lehrer.jpg", "Ein Lehrer und zwei Grundschulkinder lachen gemeinsam am Lerntisch"),
  },
} satisfies Record<string, Record<string, Foto | Foto[]>>;

const captions: Record<string, string> = { vision: "Unser Kollegium" };

const payload = await getPayload({ config });

async function upload({ file, alt, from }: Foto): Promise<number> {
  const found = await payload.find({ collection: "media", where: { filename: { equals: file } }, limit: 1, overrideAccess: true });
  if (found.docs[0]) return found.docs[0].id;
  const filePath = path.join(from === "site" ? site : dir!, file);
  return (await payload.create({ collection: "media", data: { alt }, filePath, overrideAccess: true })).id;
}

const id = (v: unknown) => (v && typeof v === "object" ? (v as { id: number }).id : (v as number | null | undefined));
const current = (await payload.findGlobal({ slug: "page-images", depth: 0, overrideAccess: true })) as unknown as Record<string, Record<string, unknown>>;
const data: Record<string, Record<string, unknown>> = {};
const done: string[] = [];

for (const [group, fields] of Object.entries(slots)) {
  const now = { ...(current[group] ?? {}) };
  for (const [field, value] of Object.entries(fields as Record<string, Foto | Foto[]>)) {
    const label = `${group} → ${field}`;
    if (Array.isArray(value)) {
      const have = ((now[field] as unknown[]) ?? []).map(id).filter(Boolean);
      if (have.length > 0) continue;
      const ids: number[] = [];
      for (const f of value) ids.push(await upload(f));
      now[field] = ids;
    } else if (field === "band" || field === "band1" || field === "band2") {
      const band = (now[field] as { image?: unknown; caption?: string | null }) ?? {};
      if (id(band.image)) continue;
      now[field] = { ...band, image: await upload(value), caption: band.caption ?? captions[group] ?? null };
    } else {
      if (id(now[field])) continue;
      now[field] = await upload(value);
    }
    done.push(label);
  }
  // Leave other fields of the group as they are (ids only, so nothing is re-saved populated).
  for (const [k, v] of Object.entries(now)) {
    if (Array.isArray(v)) now[k] = v.map(id);
    else if (v && typeof v === "object" && "image" in (v as object)) now[k] = { ...(v as object), image: id((v as { image: unknown }).image) };
    else if (v && typeof v === "object" && "id" in (v as object) && !("image" in (v as object))) now[k] = id(v);
  }
  data[group] = now;
}

await payload.updateGlobal({ slug: "page-images", data, overrideAccess: true });
payload.logger.info(done.length ? `Seitenbilder gefüllt (${done.length}): ${done.join(", ")}` : "Alle Plätze waren schon belegt.");

process.exit(0);
