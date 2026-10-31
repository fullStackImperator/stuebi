import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_images_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "page_images_rels" ADD CONSTRAINT "page_images_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_images_rels" ADD CONSTRAINT "page_images_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_images_rels_order_idx" ON "page_images_rels" USING btree ("order");
  CREATE INDEX "page_images_rels_parent_idx" ON "page_images_rels" USING btree ("parent_id");
  CREATE INDEX "page_images_rels_path_idx" ON "page_images_rels" USING btree ("path");
  CREATE INDEX "page_images_rels_media_id_idx" ON "page_images_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "page_images_rels" CASCADE;`)
}
