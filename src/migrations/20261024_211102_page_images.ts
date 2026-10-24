import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_images" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"startseite_hero_id" integer,
  	"startseite_band1_image_id" integer,
  	"startseite_band1_caption" varchar,
  	"startseite_band2_image_id" integer,
  	"startseite_band2_caption" varchar,
  	"bildungswege_vorschule_id" integer,
  	"bildungswege_grundschule_id" integer,
  	"bildungswege_mittelstufe_id" integer,
  	"bildungswege_oberstufe_id" integer,
  	"bildungswege_band_image_id" integer,
  	"bildungswege_band_caption" varchar,
  	"schwerpunkt_sport_id" integer,
  	"schwerpunkt_makerspace_id" integer,
  	"schwerpunkt_abgekocht_id" integer,
  	"ganztag_nachmittag_id" integer,
  	"ganztag_mensa_id" integer,
  	"vision_band_image_id" integer,
  	"vision_band_caption" varchar,
  	"anmeldung_band_image_id" integer,
  	"anmeldung_band_caption" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "media" ADD COLUMN "sizes_small_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_small_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_small_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_small_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_small_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_small_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_filename" varchar;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_startseite_hero_id_media_id_fk" FOREIGN KEY ("startseite_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_startseite_band1_image_id_media_id_fk" FOREIGN KEY ("startseite_band1_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_startseite_band2_image_id_media_id_fk" FOREIGN KEY ("startseite_band2_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_bildungswege_vorschule_id_media_id_fk" FOREIGN KEY ("bildungswege_vorschule_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_bildungswege_grundschule_id_media_id_fk" FOREIGN KEY ("bildungswege_grundschule_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_bildungswege_mittelstufe_id_media_id_fk" FOREIGN KEY ("bildungswege_mittelstufe_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_bildungswege_oberstufe_id_media_id_fk" FOREIGN KEY ("bildungswege_oberstufe_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_bildungswege_band_image_id_media_id_fk" FOREIGN KEY ("bildungswege_band_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_schwerpunkt_sport_id_media_id_fk" FOREIGN KEY ("schwerpunkt_sport_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_schwerpunkt_makerspace_id_media_id_fk" FOREIGN KEY ("schwerpunkt_makerspace_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_schwerpunkt_abgekocht_id_media_id_fk" FOREIGN KEY ("schwerpunkt_abgekocht_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_ganztag_nachmittag_id_media_id_fk" FOREIGN KEY ("ganztag_nachmittag_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_ganztag_mensa_id_media_id_fk" FOREIGN KEY ("ganztag_mensa_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_vision_band_image_id_media_id_fk" FOREIGN KEY ("vision_band_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_images" ADD CONSTRAINT "page_images_anmeldung_band_image_id_media_id_fk" FOREIGN KEY ("anmeldung_band_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_images_startseite_startseite_hero_idx" ON "page_images" USING btree ("startseite_hero_id");
  CREATE INDEX "page_images_startseite_band1_startseite_band1_image_idx" ON "page_images" USING btree ("startseite_band1_image_id");
  CREATE INDEX "page_images_startseite_band2_startseite_band2_image_idx" ON "page_images" USING btree ("startseite_band2_image_id");
  CREATE INDEX "page_images_bildungswege_bildungswege_vorschule_idx" ON "page_images" USING btree ("bildungswege_vorschule_id");
  CREATE INDEX "page_images_bildungswege_bildungswege_grundschule_idx" ON "page_images" USING btree ("bildungswege_grundschule_id");
  CREATE INDEX "page_images_bildungswege_bildungswege_mittelstufe_idx" ON "page_images" USING btree ("bildungswege_mittelstufe_id");
  CREATE INDEX "page_images_bildungswege_bildungswege_oberstufe_idx" ON "page_images" USING btree ("bildungswege_oberstufe_id");
  CREATE INDEX "page_images_bildungswege_band_bildungswege_band_image_idx" ON "page_images" USING btree ("bildungswege_band_image_id");
  CREATE INDEX "page_images_schwerpunkt_schwerpunkt_sport_idx" ON "page_images" USING btree ("schwerpunkt_sport_id");
  CREATE INDEX "page_images_schwerpunkt_schwerpunkt_makerspace_idx" ON "page_images" USING btree ("schwerpunkt_makerspace_id");
  CREATE INDEX "page_images_schwerpunkt_schwerpunkt_abgekocht_idx" ON "page_images" USING btree ("schwerpunkt_abgekocht_id");
  CREATE INDEX "page_images_ganztag_ganztag_nachmittag_idx" ON "page_images" USING btree ("ganztag_nachmittag_id");
  CREATE INDEX "page_images_ganztag_ganztag_mensa_idx" ON "page_images" USING btree ("ganztag_mensa_id");
  CREATE INDEX "page_images_vision_band_vision_band_image_idx" ON "page_images" USING btree ("vision_band_image_id");
  CREATE INDEX "page_images_anmeldung_band_anmeldung_band_image_idx" ON "page_images" USING btree ("anmeldung_band_image_id");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_images" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_images" CASCADE;
  DROP INDEX "media_sizes_small_sizes_small_filename_idx";
  DROP INDEX "media_sizes_medium_sizes_medium_filename_idx";
  DROP INDEX "media_sizes_large_sizes_large_filename_idx";
  ALTER TABLE "media" DROP COLUMN "sizes_small_url";
  ALTER TABLE "media" DROP COLUMN "sizes_small_width";
  ALTER TABLE "media" DROP COLUMN "sizes_small_height";
  ALTER TABLE "media" DROP COLUMN "sizes_small_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_small_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_small_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_url";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_width";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_height";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_large_url";
  ALTER TABLE "media" DROP COLUMN "sizes_large_width";
  ALTER TABLE "media" DROP COLUMN "sizes_large_height";
  ALTER TABLE "media" DROP COLUMN "sizes_large_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_large_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_large_filename";`)
}
