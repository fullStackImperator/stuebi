# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Public school website for Stadtteilschule Stübenhofer Weg (Hamburg). Stack: **Next.js 16**, **React 19**, **Payload CMS 3**, **PostgreSQL** (via `@payloadcms/db-postgres`), **Tailwind CSS v4**, **shadcn/ui**.

## Commands

```bash
npm run dev                   # dev server → http://localhost:3000, CMS at /admin
npm run build                 # production build
npm run lint                  # ESLint
npm run generate:importmap    # regenerate Payload admin importmap (run after changing Payload components)
npm run generate:types        # regenerate src/payload-types.ts (run after changing collections)
npx payload migrate           # apply DB migrations (run against DATABASE_URL)
npm run db:up                 # start local PostgreSQL via Docker
```

## Architecture

### Route groups

| Group | Path | Purpose |
|---|---|---|
| `(payload)` | `/admin`, `/api/[...slug]`, `/graphql` | Payload CMS admin + REST/GraphQL APIs |
| `(site)` | `/`, `/[slug]`, `/news`, `/news/[slug]`, `/impressum`, `/datenschutz` | Public website |

The two groups have separate `layout.tsx` files. The `(site)` layout wraps everything in `ThemeProvider` (dark-mode support via `next-themes`).

### Data fetching — Payload Local API

Public pages use the **Payload Local API** (no HTTP). Import `getPayloadClient` from `@/lib/get-payload` (re-exports `getPayloadLocal` from `@/lib/payload-local-api.ts`):

```ts
const payload = await getPayloadClient();
const docs = await payload.find({ collection: "news", limit: 10 });
```

Use `overrideAccess: true` in Server Components; access control is for the CMS admin.

### Payload collections (`src/collections/`)

- **Users** — `admin` / `teacher` roles; first user auto-promoted to admin; role saved to JWT (`saveToJWT: true`)
- **Media** — file uploads (images)
- **Pages** — CMS-managed pages; rendered by `src/app/(site)/[slug]/page.tsx` via `slug` field; reserved slugs (`news`, `admin`, `api`, …) return 404
- **News** — articles; writable by teachers and admins
- **SocialHighlights** — manual social media highlights for the landing page

After modifying any collection, run `npm run generate:types` to update `src/payload-types.ts`.

### Rich text

Payload uses the Lexical editor. Render rich text with `<RichContent data={doc.content} />` (`src/components/rich-content.tsx`), which calls `convertLexicalToHTML` and outputs a `prose` div.

### Styling

Tailwind CSS v4 (PostCSS plugin, `@import 'tailwindcss'` in `globals.css` — no `tailwind.config.*`). Design tokens are CSS custom properties in `globals.css` using `oklch()`. Component variants use `class-variance-authority` with shared variants in `src/components/ui/button-variants.ts`.

### Social integrations (`src/lib/social/`)

- Facebook: Page Plugin embed + optional Graph API (`FACEBOOK_PAGE_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID`)
- Instagram: Graph API (`INSTAGRAM_BUSINESS_ACCOUNT_ID`) or manual `SocialHighlights` from CMS

### Environment variables

See `.env.example`. Required: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`.  
`NEXT_PUBLIC_SERVER_URL` must exactly match the URL in the browser (e.g. `http://localhost:3000`) — mismatch breaks CMS cookie/logout.
