/**
 * Imports the posts from a WordPress WXR export into the `news` collection.
 *
 *   npx payload run scripts/import-wordpress-news.ts
 *
 * Env:
 *   WXR_FILE         path to the export (default: news_wordpress_export/*.xml)
 *   IMPORT_DRY_RUN=1 parse and convert only, write nothing
 *   WP_CACHE_DIR     where downloaded media is cached (default: .wp-import-cache)
 *
 * Images and videos are downloaded from the old site and stored as Media; posts whose
 * slug already exists are skipped, so the script can be re-run safely.
 */
import { createHash, randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import { Window } from "happy-dom";
import { getPayload } from "payload";
import sharp from "sharp";

import config from "../src/payload.config";

const DRY_RUN = process.env.IMPORT_DRY_RUN === "1";
const CACHE_DIR = path.resolve(process.env.WP_CACHE_DIR || ".wp-import-cache");
const MAX_IMAGE_EDGE = 2400;
const EXCERPT_LENGTH = 220;

type Segment =
  | { kind: "html"; html: string }
  | { kind: "media"; src: string; alt: string; wpId?: number; caption?: string };

type Post = {
  wpId: number;
  title: string;
  slug: string;
  publishedAt: string;
  html: string;
  thumbnailId?: number;
};

// ---------- WXR parsing ----------

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function tag(item: string, name: string): string {
  const m = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  if (!m) return "";
  const cdata = m[1].match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return cdata ? cdata[1] : decodeEntities(m[1]);
}

function parseWxr(xml: string): Post[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items
    .filter((i) => tag(i, "wp:post_type") === "post" && tag(i, "wp:status") === "publish")
    .map((i) => {
      const thumb = i.match(
        /<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(\d+)\]\]>/,
      );
      return {
        wpId: Number(tag(i, "wp:post_id")),
        title: tag(i, "title").trim(),
        slug: tag(i, "wp:post_name"),
        publishedAt: new Date(tag(i, "wp:post_date_gmt").replace(" ", "T") + "Z").toISOString(),
        html: tag(i, "content:encoded"),
        thumbnailId: thumb ? Number(thumb[1]) : undefined,
      };
    });
}

// ---------- HTML → segments ----------

const TEXT_BLOCKS = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "BLOCKQUOTE", "TABLE"]);

function wpIdOf(el: Element): number | undefined {
  const m = el.getAttribute("class")?.match(/wp-image-(\d+)/);
  const id = m?.[1] ?? el.getAttribute("data-id");
  return id ? Number(id) : undefined;
}

/** Strips WordPress styling so only semantic markup reaches Lexical. */
function cleanBlock(el: Element): string | null {
  el.querySelectorAll("span, font").forEach((s) => s.replaceWith(...Array.from(s.childNodes)));
  el.querySelectorAll("*").forEach((n) => {
    n.removeAttribute("style");
    n.removeAttribute("class");
  });
  el.removeAttribute("style");
  el.removeAttribute("class");
  if (el.tagName !== "TABLE" && !el.textContent?.replace(/ /g, " ").trim()) return null;
  // Trailing <br> in WordPress paragraphs only adds empty lines.
  return el.outerHTML.replace(/(<br\s*\/?>\s*)+(<\/(p|h\d)>)$/i, "$2");
}

function toSegments(html: string): Segment[] {
  const window = new Window();
  const doc = window.document;
  doc.body.innerHTML = html;
  const out: Segment[] = [];

  const walk = (parent: Node) => {
    for (const node of Array.from(parent.childNodes)) {
      if (node.nodeType === 3) {
        const text = node.textContent?.trim();
        if (text) out.push({ kind: "html", html: `<p>${text}</p>` });
        continue;
      }
      if (node.nodeType !== 1) continue;
      const el = node as unknown as Element;
      const name = el.tagName;

      if (name === "IMG") {
        const src = el.getAttribute("src");
        if (src) out.push({ kind: "media", src, alt: el.getAttribute("alt") ?? "", wpId: wpIdOf(el) });
      } else if (name === "VIDEO") {
        const src = el.getAttribute("src") ?? el.querySelector("source")?.getAttribute("src");
        if (src) out.push({ kind: "media", src, alt: "" });
      } else if (name === "FIGCAPTION") {
        const caption = cleanBlock(el);
        if (caption) out.push({ kind: "html", html: `<p><em>${caption.replace(/^<figcaption>|<\/figcaption>$/g, "")}</em></p>` });
      } else if (name === "HR") {
        out.push({ kind: "html", html: "<hr>" });
      } else if (TEXT_BLOCKS.has(name) && !el.querySelector("img, video")) {
        const block = cleanBlock(el);
        if (block) out.push({ kind: "html", html: block });
      } else {
        // Layout wrappers (columns, media-text, galleries, figures, links around images).
        walk(el);
      }
    }
  };
  walk(doc.body as unknown as Node);
  window.close();

  // Merge neighbouring text so Lexical converts it in one pass.
  const merged: Segment[] = [];
  for (const s of out) {
    const last = merged[merged.length - 1];
    if (s.kind === "html" && last?.kind === "html") last.html += s.html;
    else merged.push(s);
  }
  // Drop separators at the start/end and directly after another separator.
  return merged
    .map((s) => (s.kind === "html" ? { ...s, html: s.html.replace(/^(<hr>)+|(<hr>)+$/g, "").replace(/(<hr>){2,}/g, "<hr>") } : s))
    .filter((s) => s.kind !== "html" || s.html.length > 0);
}

function excerptFrom(segments: Segment[]): string {
  const window = new Window();
  const html = segments.filter((s) => s.kind === "html").map((s) => (s as { html: string }).html).join("");
  window.document.body.innerHTML = html.replace(/<br\s*\/?>/gi, " ");
  // WordPress authors often wrote the lead as a heading; image captions (<p><em>) are skipped.
  const paragraphs = Array.from(window.document.querySelectorAll("p, h2, h3, h4"))
    .filter((p) => !(p.children.length === 1 && p.firstElementChild?.tagName === "EM" && p.textContent === p.firstElementChild.textContent))
    .map((p) => p.textContent?.replace(/\s+/g, " ").trim() ?? "")
    .filter((t) => t.length > 80);
  window.close();
  const text = paragraphs[0] ?? "";
  if (text.length <= EXCERPT_LENGTH) return text;
  return text.slice(0, text.lastIndexOf(" ", EXCERPT_LENGTH)).replace(/[,;:–-]$/, "") + " …";
}

// ---------- media ----------

/** WordPress serves resized variants (`foo-763x1080.png`); the original sits next to it. */
function originalUrl(src: string): string {
  return src.replace(/-\d+x\d+(\.[a-z0-9]+)$/i, "$1");
}

async function download(url: string): Promise<{ data: Buffer; mimetype: string } | null> {
  const file = path.join(CACHE_DIR, createHash("sha1").update(url).digest("hex"));
  try {
    const [data, mimetype] = await Promise.all([fs.readFile(file), fs.readFile(file + ".type", "utf8")]);
    return { data, mimetype };
  } catch {}
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = Buffer.from(await res.arrayBuffer());
  const mimetype = res.headers.get("content-type")?.split(";")[0] ?? "application/octet-stream";
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(file, data);
  await fs.writeFile(file + ".type", mimetype);
  return { data, mimetype };
}

async function shrink(data: Buffer, mimetype: string): Promise<Buffer> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(mimetype)) return data;
  const img = sharp(data, { failOn: "none" }).rotate();
  const meta = await img.metadata();
  if (Math.max(meta.width ?? 0, meta.height ?? 0) <= MAX_IMAGE_EDGE) return data;
  const resized = img.resize(MAX_IMAGE_EDGE, MAX_IMAGE_EDGE, { fit: "inside" });
  return mimetype === "image/png" ? resized.png().toBuffer() : resized.jpeg({ quality: 85 }).toBuffer();
}

/** `…/files/2024/12/IMG_3948.jpeg` → `wp-2024-12-IMG_3948.jpeg` (WordPress reuses names across months). */
function mediaFilename(url: string): string {
  const m = url.match(/\/(\d{4})\/(\d{2})\/([^/?#]+)$/);
  const base = m ? `wp-${m[1]}-${m[2]}-${m[3]}` : `wp-${path.basename(new URL(url).pathname)}`;
  return decodeURIComponent(base).replace(/[^\w.-]+/g, "-");
}

// ---------- main ----------

async function main() {
  const file =
    process.env.WXR_FILE ??
    path.join("news_wordpress_export", (await fs.readdir("news_wordpress_export")).find((f) => f.endsWith(".xml"))!);
  const posts = parseWxr(await fs.readFile(file, "utf8"));
  console.log(`${posts.length} posts in ${file}${DRY_RUN ? " (dry run)" : ""}`);

  const payload = await getPayload({ config });
  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  class HappyDOM {
    window: { document: Document };
    constructor(html: string) {
      const w = new Window();
      w.document.body.innerHTML = html;
      this.window = w as unknown as { document: Document };
    }
  }

  const admin = await payload.find({
    collection: "users",
    where: { role: { equals: "admin" } },
    sort: "id",
    limit: 1,
    overrideAccess: true,
  });
  const authorId = admin.docs[0]?.id;

  const mediaIds = new Map<string, number>();
  async function mediaFor(src: string, alt: string): Promise<number | null> {
    let url = originalUrl(src);
    const filename = mediaFilename(url);
    if (mediaIds.has(filename)) return mediaIds.get(filename)!;
    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: filename } },
      limit: 1,
      overrideAccess: true,
    });
    if (existing.docs[0]) {
      mediaIds.set(filename, existing.docs[0].id);
      return existing.docs[0].id;
    }
    let file = await download(url);
    if (!file && url !== src) file = await download((url = src));
    if (!file) {
      console.warn(`  ! could not download ${src}`);
      return null;
    }
    if (DRY_RUN) return -1;
    const data = await shrink(file.data, file.mimetype);
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      file: { data, mimetype: file.mimetype, name: filename, size: data.length },
      overrideAccess: true,
    });
    mediaIds.set(filename, doc.id);
    return doc.id;
  }

  let created = 0;
  for (const post of posts) {
    const exists = await payload.find({
      collection: "news",
      where: { slug: { equals: post.slug } },
      limit: 1,
      overrideAccess: true,
    });
    if (exists.docs[0]) {
      console.log(`- skip (exists) ${post.slug}`);
      continue;
    }

    const segments = toSegments(post.html);
    const media = segments.filter((s) => s.kind === "media");
    const featured = media.find((s) => s.wpId && s.wpId === post.thumbnailId) ?? media[0];
    // The article page shows the featured image above the text, so don't repeat it as the first image.
    const body = featured === media[0] ? segments.filter((s) => s !== featured) : segments;

    const children: unknown[] = [];
    for (const s of body) {
      if (s.kind === "html") {
        const state = convertHTMLToLexical({ editorConfig, html: s.html, JSDOM: HappyDOM });
        children.push(...state.root.children);
      } else {
        const id = await mediaFor(s.src, s.alt || post.title);
        if (id === null) continue;
        children.push({
          type: "upload",
          version: 3,
          format: "",
          id: randomUUID().replace(/-/g, "").slice(0, 24),
          fields: null,
          relationTo: "media",
          value: id,
        });
      }
    }
    const featuredId = featured ? await mediaFor(featured.src, featured.alt || post.title) : null;

    console.log(
      `+ ${post.slug}: ${children.length} blocks, ${media.length} media${featured ? "" : ", no featured image"}`,
    );
    if (DRY_RUN) continue;

    await payload.create({
      collection: "news",
      data: {
        title: post.title,
        slug: post.slug,
        publishedAt: post.publishedAt,
        excerpt: excerptFrom(segments),
        featuredImage: featuredId ?? undefined,
        status: "published",
        author: authorId,
        content: {
          root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr", children },
        } as never,
      },
      overrideAccess: true,
    });
    created++;
  }

  console.log(`done: ${created} news created, ${mediaIds.size} media used`);
  process.exit(0);
}

// `payload run` exits once the module has loaded, so keep it waiting for the import.
await main().catch((err) => {
  console.error(err);
  process.exit(1);
});
