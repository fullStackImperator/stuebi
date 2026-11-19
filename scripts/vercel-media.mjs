/**
 * Vercel only: Payload reads uploads from media/ on disk, but a Vercel function bundle doesn't contain that folder
 * (and at ~400 MB it would exceed the 250 MB limit). So the build copies media/ into public/media/, and next.config
 * rewrites /api/media/file/* there, served as static files. On Hetzner (or locally) nothing happens.
 * Uploads made in the CMS on Vercel do not persist; photos are swapped locally or on Hetzner.
 */
import { cpSync, rmSync } from "node:fs";

if (process.env.VERCEL) {
  rmSync("public/media", { recursive: true, force: true });
  cpSync("media", "public/media", { recursive: true });
  console.log("vercel-media: media/ → public/media/ kopiert");
}
