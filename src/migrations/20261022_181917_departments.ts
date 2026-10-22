import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_departments_dates_items_kind" AS ENUM('registration', 'info', 'event');
  CREATE TABLE "departments_registration_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "departments_dates_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"kind" "enum_departments_dates_items_kind" DEFAULT 'event' NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"date_label" varchar,
  	"time" varchar,
  	"location" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "departments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"grades" varchar,
  	"order" numeric DEFAULT 0,
  	"intro" varchar,
  	"registration_info" jsonb,
  	"contact_head_name" varchar,
  	"contact_head_role" varchar DEFAULT 'Abteilungsleitung',
  	"contact_head_email" varchar,
  	"contact_head_phone" varchar,
  	"contact_office_name" varchar DEFAULT 'Schulbüro',
  	"contact_office_email" varchar,
  	"contact_office_phone" varchar,
  	"contact_office_hours" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "departments_id" integer;
  ALTER TABLE "departments_registration_downloads" ADD CONSTRAINT "departments_registration_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "departments_registration_downloads" ADD CONSTRAINT "departments_registration_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_dates_items" ADD CONSTRAINT "departments_dates_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "departments_registration_downloads_order_idx" ON "departments_registration_downloads" USING btree ("_order");
  CREATE INDEX "departments_registration_downloads_parent_id_idx" ON "departments_registration_downloads" USING btree ("_parent_id");
  CREATE INDEX "departments_registration_downloads_file_idx" ON "departments_registration_downloads" USING btree ("file_id");
  CREATE INDEX "departments_dates_items_order_idx" ON "departments_dates_items" USING btree ("_order");
  CREATE INDEX "departments_dates_items_parent_id_idx" ON "departments_dates_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "departments_slug_idx" ON "departments" USING btree ("slug");
  CREATE INDEX "departments_updated_at_idx" ON "departments" USING btree ("updated_at");
  CREATE INDEX "departments_created_at_idx" ON "departments" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_departments_id_idx" ON "payload_locked_documents_rels" USING btree ("departments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "departments_registration_downloads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "departments_dates_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "departments" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "departments_registration_downloads" CASCADE;
  DROP TABLE "departments_dates_items" CASCADE;
  DROP TABLE "departments" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_departments_fk";
  
  DROP INDEX "payload_locked_documents_rels_departments_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "departments_id";
  DROP TYPE "public"."enum_departments_dates_items_kind";`)
}
