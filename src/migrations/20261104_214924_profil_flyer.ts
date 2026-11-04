import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "departments" ADD COLUMN "profile_flyers_fair_play_file_id" integer;
  ALTER TABLE "departments" ADD COLUMN "profile_flyers_fair_play_preview_id" integer;
  ALTER TABLE "departments" ADD COLUMN "profile_flyers_start_up_file_id" integer;
  ALTER TABLE "departments" ADD COLUMN "profile_flyers_start_up_preview_id" integer;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_profile_flyers_fair_play_file_id_media_id_fk" FOREIGN KEY ("profile_flyers_fair_play_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_profile_flyers_fair_play_preview_id_media_id_fk" FOREIGN KEY ("profile_flyers_fair_play_preview_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_profile_flyers_start_up_file_id_media_id_fk" FOREIGN KEY ("profile_flyers_start_up_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments" ADD CONSTRAINT "departments_profile_flyers_start_up_preview_id_media_id_fk" FOREIGN KEY ("profile_flyers_start_up_preview_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "departments_profile_flyers_fair_play_profile_flyers_fair_idx" ON "departments" USING btree ("profile_flyers_fair_play_file_id");
  CREATE INDEX "departments_profile_flyers_fair_play_profile_flyers_fa_1_idx" ON "departments" USING btree ("profile_flyers_fair_play_preview_id");
  CREATE INDEX "departments_profile_flyers_start_up_profile_flyers_start_idx" ON "departments" USING btree ("profile_flyers_start_up_file_id");
  CREATE INDEX "departments_profile_flyers_start_up_profile_flyers_sta_1_idx" ON "departments" USING btree ("profile_flyers_start_up_preview_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "departments" DROP CONSTRAINT "departments_profile_flyers_fair_play_file_id_media_id_fk";
  
  ALTER TABLE "departments" DROP CONSTRAINT "departments_profile_flyers_fair_play_preview_id_media_id_fk";
  
  ALTER TABLE "departments" DROP CONSTRAINT "departments_profile_flyers_start_up_file_id_media_id_fk";
  
  ALTER TABLE "departments" DROP CONSTRAINT "departments_profile_flyers_start_up_preview_id_media_id_fk";
  
  DROP INDEX "departments_profile_flyers_fair_play_profile_flyers_fair_idx";
  DROP INDEX "departments_profile_flyers_fair_play_profile_flyers_fa_1_idx";
  DROP INDEX "departments_profile_flyers_start_up_profile_flyers_start_idx";
  DROP INDEX "departments_profile_flyers_start_up_profile_flyers_sta_1_idx";
  ALTER TABLE "departments" DROP COLUMN "profile_flyers_fair_play_file_id";
  ALTER TABLE "departments" DROP COLUMN "profile_flyers_fair_play_preview_id";
  ALTER TABLE "departments" DROP COLUMN "profile_flyers_start_up_file_id";
  ALTER TABLE "departments" DROP COLUMN "profile_flyers_start_up_preview_id";`)
}
