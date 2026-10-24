# Mobile-first refinement: navigation, photos, dark mode

Date: 2026-10-24 · Status: draft for review

## Goal

Parents, most of them on a phone (more than 80 % of visitors), should be able to:

1. call the school office in one tap,
2. find how and when to register their child,
3. see upcoming dates,
4. read current news.

At the same time the site should show real school life through photos (photos with students are available with parental consent).

## Constraints

- **Brand stays:** Stübi blue (`--primary`), the four accent colours (golden, mint, accent red, primary blue), Plus Jakarta Sans and the overall look. This is a refinement, not a rebrand.
- **Hosting:** the site will move to a Hetzner VPS (separate task, not part of this spec). Uploads stay on the local disk; the media folder must be part of the server backup.
- **Database:** Neon stays. Schema changes only via Payload migrations (`push: false`).
- **CMS editing of departments** (collection `departments`) stays as it is.

## Out of scope

- Moving hosting to Hetzner (own task).
- New typeface, new colours, new logo.
- New CMS content types beyond the photo slots below.

## 1. Navigation and page structure

### Menu (`src/lib/site-navigation.ts`)

```
Bildungswege ▾                     Anmeldung & Kontakt ▾
  Übersicht      /bildungswege       Übersicht            /anmeldung
  Vorschule      #vorschule          So melden Sie an     #ablauf
  Grundschule    #grundschule        Primarstufe          #primarstufe
  Mittelstufe    #mittelstufe        Mittelstufe          #mittelstufe
  Oberstufe      #oberstufe          Oberstufe            #oberstufe
  Abschlüsse     #abschluesse        Schulbüro            #schulbuero
                                     Ansprechpartner      #ansprechpartner
```

The existing entries "Stufen" and "Schullaufbahn" in Bildungswege are replaced by the four Stufen. The Schullaufbahn text moves into the Übersicht part at the top of `/bildungswege`. The entry "Abteilungen" under Anmeldung & Kontakt is removed; the three departments take its place.

### `/bildungswege`

- One section per Stufe (`#vorschule`, `#grundschule`, `#mittelstufe`, `#oberstufe`), each with a photo slot (section 2), 2–3 sentences of text and a button to the matching department on `/anmeldung` (Vorschule and Grundschule → `#primarstufe`).
- Without a photo the section falls back to today's coloured icon tile.
- Section `#abschluesse` stays.
- Where the school has not delivered text yet, the existing `Placeholder` component is used (same as today on other pages).

### `/anmeldung`

Order:

1. `PageIntro` (unchanged)
2. `#ablauf`: "So melden Sie an", general steps that apply to all departments (static text, replaces the intro part of today's `#formulare`)
3. `#primarstufe`, `#mittelstufe`, `#oberstufe`: one section per department, rendered from the CMS (existing components `RegistrationSection`, `DatesSection`, `ContactBlock` in `src/components/departments/department-sections.tsx`). Section id = department `slug`.
4. `#schulbuero` (unchanged content)
5. `#ansprechpartner` (unchanged content)

The four static registration cards (Vorschule, 1. Klasse, 5. Klasse, Oberstufe) are removed; their content lives in the CMS departments. Before removing them, any text that exists only in those cards (e.g. Vorschule/1. Klasse deadlines) must be checked against the CMS data so nothing is lost.

The page becomes dynamic (`await connection()`), because past dates are filtered per request, like the department pages today.

### Old URLs

| From | To (permanent) |
| --- | --- |
| `/abteilungen` | `/anmeldung#ablauf` |
| `/abteilungen/primarstufe` | `/anmeldung#primarstufe` |
| `/abteilungen/mittelstufe` | `/anmeldung#mittelstufe` |
| `/abteilungen/oberstufe` | `/anmeldung#oberstufe` |

Implementation: `redirects()` in `next.config.ts`. **Verify** that the `#fragment` survives in the `Location` header with Next.js 16. If it does not, fall back to small route handlers at those paths that call `permanentRedirect()`.

The removed anchors `#formulare`, `#stufen` and `#schullaufbahn` are only referenced from the menu, so no other links need updating. The pages under `src/app/(site)/(unterseiten)/abteilungen/` are deleted. `"abteilungen"` stays in the reserved-slug list of the CMS page route. Links in `footer.tsx` and `parents-section.tsx` point directly to the new targets. The `Departments` collection comment ("Rendered at /abteilungen/[slug]") is updated.

## 2. Photo slots (CMS)

### Data model

- New Payload **Global** `page-images` (label "Seitenbilder"), one `upload` field (relation to `media`) per slot, grouped by page with `group` fields:

| Group | Slots |
| --- | --- |
| Startseite | `hero`, `band1`, `band2` |
| Bildungswege | `vorschule`, `grundschule`, `mittelstufe`, `oberstufe`, `band` |
| Schwerpunkt | `sport`, `makerspace`, `abgekocht` |
| Ganztag | `nachmittag`, `mensa` |
| Vision | `band` |
| Anmeldung | `band` |

  Each band slot also has an optional `caption` text field (one line).
- Access: `read` public; `update` for roles `admin` and `teacher`.
- `Media` collection: add `focalPoint: true` and `imageSizes` with widths 640, 1280 and 1920 (WebP). `alt` stays required.
- One migration for the global and the media size columns (`npx payload migrate:create`), tested on a Neon branch first, then applied to the main branch.

### Components

- `PhotoBand`: full-width image between sections; aspect about 4:3 on phones and about 21:9 from `lg` up; optional caption below. Renders nothing when the slot is empty.
- `StagePhoto` (or a prop on the Stufe section): photo above the text on phones, beside it from `lg` up.
- Both use `next/image` with `sizes` matching the layout and the focal point as `object-position`, so faces stay in frame in both crops.
- The hero keeps `/images/hero-school.jpg` as fallback when the `hero` slot is empty.

### Data access

One helper `getPageImages()` in `src/lib/` that loads the global with `depth: 1` via the Local API and is called by the pages that need it.

## 3. Dark mode

### Cause

The `.dark` palette in `globals.css` exists, but about 30 places use fixed colours: `bg-white`, `bg-[#f5f0e8]`, `bg-[#1e2a35]`, `bg-[#0f1f2e]`, `text-black`. In addition, text on golden/mint backgrounds uses `text-foreground`, which turns light in dark mode and becomes unreadable on yellow.

### Fix

- New tokens in `globals.css`, registered in `@theme inline`:
  - `--surface`: light `#ffffff`, dark `#0f1f2e`
  - `--surface-sand`: light `#f5f0e8`, dark `#162536`
  - `--surface-ink`: light `#1e2a35`, dark `#0b1824`
  - `--on-bright`: fixed `#1a2e3d` (text on golden and mint, same in both modes)
- Replace every fixed colour in `src/app/(site)` and `src/components` with these tokens (`bg-surface`, `bg-surface-sand`, …). `PageSection` and `InfoCard` in `page-parts.tsx` switch their tone classes to the tokens.
- Accent colours (`golden`, `mint`, `accent`, `primary`) are not changed.

### Acceptance

- `grep` for `bg-white`, `bg-[#` and `text-black` in the site code finds no remaining uses without a reason (white overlays like `bg-white/10` on photos are fine).
- Screenshots of every public page in light and dark at 390 px and 1400 px.
- Text contrast at least WCAG AA (4.5:1 body, 3:1 large text) in both modes.

## 4. Phones

### Bottom action bar

- New client component `MobileActionBar`, shown below `lg` only, fixed to the bottom, in both the home page and `(unterseiten)` layouts.
- Four buttons with icon and label: **Anrufen**, **Anmeldung** (`/anmeldung#ablauf`), **Termine** (`/termine`), **News** (`/news`).
- **Anrufen** opens a small panel above the bar with two `tel:` links: Schulbüro `040 / 428 76 19 – 10`, Schulbüro Primarstufe `040 / 428 96 66 – 0`. Closes on outside tap or Escape.
- Respects `env(safe-area-inset-bottom)`; hidden while the mobile menu is open; the footer gets bottom padding equal to the bar height so nothing is covered.
- Keyboard-accessible, visible focus, `aria-expanded` on Anrufen.

### Home page on phones

- Hero no longer `min-h-screen` on phones (about 70 svh), so the start of the news is visible without scrolling far.
- New small "Nächste Termine" strip below the news: the next three upcoming dates across all departments (reuses `upcomingDates()`), linking to `/termine`.

### Touch and reading

- Tap targets at least 44 px high, including items in the mobile menu accordion.
- Body text at least 16 px.
- Anchor jumps keep headings below the sticky header (`scroll-mt` on every section that is a menu target).
- No horizontal scrolling at 360 px width.

## Design direction (frontend-design pass, within the brand)

- Photos are the one bold element: full-width bands and large Stufe photos. Everything around them gets calmer.
- Trim template habits where pages are touched anyway: the all-caps eyebrow label above every heading (keep it only where it carries information, e.g. the Stufe grades), the gold line before eyebrows, and identical rounded cards for every block (cards only where content is a set of comparable items).
- Copy in plain German, sentence case, button labels say what happens ("Primarstufe anmelden", not "Mehr").

## Order of work

1. Dark mode tokens and replacements (no dependencies; ships alone).
2. Navigation, `/bildungswege` and `/anmeldung` restructure, redirects.
3. Photo slots: global, media sizes, migration, components.
4. Phones: action bar, home page order, touch sizes.

Each step is its own PR.

## Testing

- `npx tsc --noEmit`, `npm run lint`, `npm run build` for every step.
- Migrations tested on a throwaway Neon branch before the main branch (see memory note on the shared database).
- Playwright screenshots at 360, 390 and 1400 px, light and dark, for: `/`, `/bildungswege`, `/anmeldung`, `/vision`, `/schwerpunkt`, `/ganztag`, `/termine`, `/news`.
- Manual checks: menu anchors land on the right section with heading visible; old `/abteilungen` URLs redirect to the right section; Anrufen panel opens, calls, closes; empty photo slots render nothing.
