/**
 * Test fixture: fills a few photo slots so e2e tests can check filled and empty slots.
 * Writes to the database in DATABASE_URL — only run against a throwaway Neon branch:
 *
 *   ALLOW_FIXTURE_SEED=1 DATABASE_URL=<test branch> npx payload run e2e/fixtures/seed-page-images.ts
 */
import config from "@payload-config";
import path from "path";
import { getPayload } from "payload";

if (process.env.ALLOW_FIXTURE_SEED !== "1") {
  console.error("Refusing to seed: set ALLOW_FIXTURE_SEED=1 and point DATABASE_URL at a test branch.");
  process.exit(1);
}

const payload = await getPayload({ config });
const media = await payload.create({
  collection: "media",
  data: { alt: "Testfoto Schulhof", focalX: 30, focalY: 20 },
  filePath: path.resolve(process.cwd(), "public/images/hero-school.jpg"),
  overrideAccess: true,
});

await payload.updateGlobal({
  slug: "page-images",
  data: {
    startseite: { band1: { image: media.id, caption: "Testunterschrift" } },
    bildungswege: { vorschule: media.id },
    schwerpunkt: { sport: media.id },
  },
  overrideAccess: true,
});
payload.logger.info(`Fixture media ${media.id} set on startseite.band1, bildungswege.vorschule, schwerpunkt.sport`);
process.exit(0);
