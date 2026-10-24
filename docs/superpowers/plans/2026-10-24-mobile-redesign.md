# Mobile-first Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix dark mode, restructure the Bildungswege/Anmeldung navigation, add CMS-managed photo slots and make the site phone-first, without changing the Stübi brand.

**Architecture:** Four phases, each merged as its own PR (A dark mode → B navigation → C photos → D phones). Theme colours move into CSS tokens in `globals.css`; navigation stays data-driven in `src/lib/site-navigation.ts`; photos come from one Payload global `page-images` read through a single helper; phone features are self-contained client components.

**Tech Stack:** Next.js 16.2 (App Router), React 19, Payload CMS 3.80 (Postgres/Neon), Tailwind CSS v4, next-themes, lucide-react, Playwright Test (new, dev only).

**Spec:** `docs/superpowers/specs/2026-10-24-mobile-redesign-design.md`

## Global Constraints

- Brand stays: `--primary` (#26547c light / #4a90c4 dark), `--color-golden` #ffd166, `--color-mint` #06d6a0, `--accent` #ef476f, font Plus Jakarta Sans. Do not change these values.
- Before using a Next.js API, read the matching guide in `node_modules/next/dist/docs/` (AGENTS.md).
- Schema changes only via Payload migrations (`push: false`). Test every migration on a throwaway Neon branch (project `blue-boat-22820038`) before the main branch; ask the user before applying to the main branch and before deleting the test branch.
- Local `.env` points at the production database: tests and dev server only *read*; never run seeds or migrations against it without the user's OK.
- Site copy in German, sentence case, buttons say what happens ("Primarstufe anmelden", not "Mehr").
- Tap targets ≥ 44 px, body text ≥ 16 px, no horizontal scroll at 360 px.
- Each phase is one branch + PR: `fix/dark-mode` (branched from `design/mobile-redesign`, so spec and plan ship with it), then `feat/navigation-stufen`, `feat/page-images`, `feat/mobile-actions`, each branched from `main` after the previous PR is merged. Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Verification for every task: `npx tsc --noEmit` (ignore errors under `.next/`), `npm run lint` (0 errors), relevant `npx playwright test` specs green.

## Review Focus

1. A department with no upcoming dates and empty registration info (Oberstufe in the seed data) must still render its `/anmeldung` section with the empty-state text, not crash or disappear. → Task 4 test `oberstufe section renders without dates`.
2. A photo slot whose media was deleted (relation is `null`) or not populated (a bare id number) must render nothing, not a broken image. → Task 6 tests on `toPhoto()`.
3. Arriving through a redirect or menu link with a `#hash` must show the section heading below the sticky header, not under it. → Task 5 test `redirected anchor heading is visible`.
4. On phones the fixed action bar must not cover the last footer links. → Task 8 test `action bar does not cover footer`.
5. A visitor whose phone is set to dark mode (no stored preference) must get dark backgrounds on first load. → Task 1 test `system dark preference applies`.

---

## Phase A: Dark mode (branch `fix/dark-mode`)

### Task 1: Test harness, theme tokens, shared page parts

**Files:**
- Create: `playwright.config.ts`, `e2e/helpers.ts`, `e2e/dark-mode.spec.ts`
- Modify: `package.json` (devDependency `@playwright/test`, script `"test:e2e": "playwright test"`), `.gitignore` (`/test-results`, `/playwright-report`), `src/app/globals.css`, `src/components/sections/page-parts.tsx`

**Interfaces:**
- Produces:
  - Tailwind utilities `bg-surface`, `bg-surface-sand`, `bg-surface-ink`, `text-on-bright` (from tokens `--surface`, `--surface-sand`, `--surface-ink`, `--on-bright`).
  - `e2e/helpers.ts`: `PAGES: string[]` = `['/', '/bildungswege', '/anmeldung', '/vision', '/schwerpunkt', '/ganztag', '/termine', '/news']`; `setTheme(page: Page, theme: 'light' | 'dark'): Promise<void>` (writes `localStorage.theme` via `addInitScript`, the next-themes default key); `lightBackgroundsIn(page: Page, selector = 'main'): Promise<string[]>` returns descriptions of elements whose computed `background-color` is `rgb(255, 255, 255)` or `rgb(245, 240, 232)`.

- [ ] **Step 1: Install and configure Playwright**

`npm i -D @playwright/test && npx playwright install chromium`. `playwright.config.ts`: `testDir: 'e2e'`, `baseURL: 'http://localhost:3000'`, `webServer: { command: 'npm run dev', url: 'http://localhost:3000', reuseExistingServer: true, timeout: 180_000 }`, projects `phone` (viewport 390×844, `hasTouch: true`) and `desktop` (1400×900).

- [ ] **Step 2: Write the failing tests** in `e2e/dark-mode.spec.ts`

```ts
for (const path of PAGES) {
  test(`no light backgrounds in dark mode: ${path}`, async ({ page }) => {
    await setTheme(page, 'dark')
    await page.goto(path)
    expect(await lightBackgroundsIn(page)).toEqual([])
  })
}

test('system dark preference applies', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/vision')
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(await lightBackgroundsIn(page)).toEqual([])
})

test('text on golden stays dark in dark mode', async ({ page }) => {
  await setTheme(page, 'dark')
  await page.goto('/bildungswege')
  const color = await page.locator('.bg-golden').first().evaluate((el) => getComputedStyle(el).color)
  expect(color).toBe('rgb(26, 46, 61)') // #1a2e3d
})
```

- [ ] **Step 3: Run to verify failure**

Run: `npx playwright test e2e/dark-mode.spec.ts --project=phone`
Expected: FAIL, lists of `rgb(255, 255, 255)` / `rgb(245, 240, 232)` elements on most pages.

- [ ] **Step 4: Add tokens to `globals.css`**

`:root`: `--surface: #ffffff; --surface-sand: #f5f0e8; --surface-ink: #1e2a35; --on-bright: #1a2e3d;` `.dark`: `--surface: #0f1f2e; --surface-sand: #162536; --surface-ink: #0b1824;` (`--on-bright` unchanged). In `@theme inline`: `--color-surface`, `--color-surface-sand`, `--color-surface-ink`, `--color-on-bright` mapped to the variables.

- [ ] **Step 5: Switch `page-parts.tsx`**

`PageSection` tone classes → `bg-surface` / `bg-surface-sand`; `InfoCard` → `bg-surface-sand in-data-[tone=sand]:bg-surface`.

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts e2e package.json package-lock.json .gitignore src/app/globals.css src/components/sections/page-parts.tsx
git commit -m "fix(dark-mode): Theme-Tokens für Flächen, Playwright-Tests"
```

### Task 2: Replace remaining fixed colours

**Files:**
- Modify: every file listed by `grep -rnE "bg-white([^/]|$)|bg-\[#(f5f0e8|1e2a35|0f1f2e)\]|text-black" src/app/\(site\) src/components` (at time of writing: `termine`, `anmeldung`, `schwerpunkt`, `bildungswege` pages; `news-section`, `parents-section`, `sponsors-section`, `vision-section`, `school-life-section`, `contact-section` in `src/components/landingpage/`)
- Delete: `src/app/(site)/page copy.tsx` (unused copy of the home page, keeps the grep clean)

**Interfaces:**
- Consumes: the utilities from Task 1.

- [ ] **Step 1: Replace classes**

`bg-white` → `bg-surface`; `bg-[#f5f0e8]` → `bg-surface-sand`; `bg-[#1e2a35]` → `bg-surface-ink`; `bg-[#0f1f2e]` → `bg-surface` only where it is a page background (keep where it is the intentionally dark footer/sponsor band and add a comment). Text on `bg-golden` / `bg-mint` (classes `text-foreground` next to those) → `text-on-bright`. `bg-white/10`, `bg-white/20` on dark bands stay. Remove now-redundant `dark:bg-…` overrides that the token covers.

- [ ] **Step 2: Run tests**

Run: `npx playwright test e2e/dark-mode.spec.ts`
Expected: PASS on both projects.

- [ ] **Step 3: Visual check**

Screenshots of all `PAGES` in light and dark at 390 and 1400 px (`page.screenshot({ fullPage: true })` into `.playwright-mcp/`, not committed). Light mode must look unchanged compared to `main`.

- [ ] **Step 4: Commit and open PR `fix/dark-mode`**

---

## Phase B: Navigation and page structure (branch `feat/navigation-stufen`)

### Task 3: Bildungswege menu and Stufe sections

**Files:**
- Modify: `src/lib/site-navigation.ts`, `src/app/(site)/(unterseiten)/bildungswege/page.tsx`
- Create: `e2e/navigation.spec.ts`

**Interfaces:**
- Produces: section ids `vorschule`, `grundschule`, `mittelstufe`, `oberstufe`, `abschluesse` on `/bildungswege`; component `StageSection` (local to the page file) with props `{ id: string; name: string; years: string; icon: LucideIcon; color: string; registerHref: string; registerLabel: string; photo?: React.ReactNode; children: React.ReactNode }`. Task 7 passes `photo`.

- [ ] **Step 1: Write the failing tests**

```ts
test('Bildungswege menu lists every Stufe', async ({ page }) => {
  await page.goto('/')
  await openMenuSection(page, 'Bildungswege')
  for (const hash of ['vorschule','grundschule','mittelstufe','oberstufe','abschluesse'])
    await expect(page.locator(`header a[href="/bildungswege#${hash}"]`).first()).toBeVisible()
  await expect(page.locator('header a[href="/bildungswege#stufen"]')).toHaveCount(0)
})

test('Bildungswege has one section per Stufe', async ({ page }) => {
  await page.goto('/bildungswege')
  for (const id of ['vorschule','grundschule','mittelstufe','oberstufe','abschluesse'])
    await expect(page.locator(`section#${id}`)).toBeVisible()
  await expect(page.locator('#vorschule a[href="/anmeldung#primarstufe"]')).toBeVisible()
  await expect(page.locator('#oberstufe a[href="/anmeldung#oberstufe"]')).toBeVisible()
})
```

Add `openMenuSection(page, label)` to `e2e/helpers.ts`: on phone clicks "Menü öffnen" then the accordion button `label`; on desktop clicks the navigation trigger `label`.

- [ ] **Step 2: Run to verify failure** — `npx playwright test e2e/navigation.spec.ts` → FAIL (old `#stufen` links).

- [ ] **Step 3: Update `mainNav`** — Bildungswege children exactly as in spec §1 (title, href, desc: Vorschule "ab 5 Jahren", Grundschule "Klasse 1–4", Mittelstufe "Klasse 5–10", Oberstufe "Klasse 11–13", Abschlüsse "ESA, MSA und Abitur").

- [ ] **Step 4: Rebuild `/bildungswege`** — keep `PageIntro`; an overview paragraph with the former Schullaufbahn text; four `StageSection`s (alternating `tone` light/sand), registration buttons "Primarstufe anmelden" (Vorschule, Grundschule), "Mittelstufe anmelden", "Oberstufe anmelden"; text per Stufe as `Placeholder` where none exists; `#abschluesse` unchanged. Without `photo` the section shows the existing coloured icon tile.

- [ ] **Step 5: Run tests** → PASS. **Step 6: Commit.**

### Task 4: `/anmeldung` with department sections from the CMS

**Files:**
- Modify: `src/app/(site)/(unterseiten)/anmeldung/page.tsx`, `src/lib/site-navigation.ts`
- Create: `src/components/departments/department-section.tsx`
- Modify: `e2e/navigation.spec.ts`

**Interfaces:**
- Consumes: `RegistrationSection`, `DatesSection`, `ContactBlock`, `upcomingDates` from `src/components/departments/department-sections.tsx`.
- Produces: `DepartmentSection({ department, tone }: { department: Department; tone: 'light' | 'sand' })` rendering `<section id={department.slug}>`; `/anmeldung` ids `ablauf`, `primarstufe`, `mittelstufe`, `oberstufe`, `schulbuero`, `ansprechpartner`.

- [ ] **Step 1: Check content before removing static cards** — compare the four static cards in `anmeldung/page.tsx` with the department rows in the database (read-only query via Neon MCP `run_sql` on `departments` / `departments_dates_items`). List any deadline or sentence that exists only in the cards and report it to the user; carry it into the `#ablauf` text or ask the user to add it in the CMS. Do not continue past this step until the user answered.

- [ ] **Step 2: Write the failing tests**

```ts
test('Anmeldung has one section per department', async ({ page }) => {
  await page.goto('/anmeldung')
  for (const id of ['ablauf','primarstufe','mittelstufe','oberstufe','schulbuero','ansprechpartner'])
    await expect(page.locator(`section#${id}`)).toBeVisible()
})

test('oberstufe section renders without dates', async ({ page }) => {
  await page.goto('/anmeldung#oberstufe')
  await expect(page.locator('section#oberstufe h2')).toContainText('Oberstufe')
  await expect(page.locator('section#oberstufe')).toContainText(/keine|Termine/i)
})

test('Anmeldung menu lists departments, not "Abteilungen"', async ({ page }) => {
  await page.goto('/')
  await openMenuSection(page, 'Anmeldung & Kontakt')
  for (const hash of ['ablauf','primarstufe','mittelstufe','oberstufe','schulbuero','ansprechpartner'])
    await expect(page.locator(`a[href="/anmeldung#${hash}"]`).first()).toBeVisible()
  await expect(page.locator('a[href="/abteilungen"]')).toHaveCount(0)
})
```

- [ ] **Step 3: Run to verify failure.**
- [ ] **Step 4: Implement** — `await connection()` at the top of the page; load departments (`sort: 'order'`, `depth: 1`, `overrideAccess: true`); order `PageIntro` → `#ablauf` ("So melden Sie an", general steps) → one `DepartmentSection` per department (alternating tone) → `#schulbuero` → `#ansprechpartner`. Remove the static cards and the `NextLink` to `/abteilungen`. Menu children as in spec §1 (desc: "Ablauf und Fristen", "Vorschule bis Klasse 4", "Klasse 5 bis 10", "Klasse 11 bis 13", "Adresse, Telefon & E-Mail", "Ihre Kontakte an der Stübi").
- [ ] **Step 5: Run tests** → PASS. **Step 6: Commit.**

### Task 5: Redirect old department URLs, remove old pages

**Files:**
- Modify: `next.config.ts`, `src/components/landingpage/footer.tsx`, `src/components/landingpage/parents-section.tsx`, `src/collections/Departments.ts` (comment)
- Delete: `src/app/(site)/(unterseiten)/abteilungen/`
- Create: `e2e/redirects.spec.ts`

**Interfaces:**
- Produces: exported `departmentRedirects` array in `next.config.ts` (source, destination, `permanent: true`) exactly per the spec §1 table.

- [ ] **Step 1: Write the failing tests**

```ts
const cases = [
  ['/abteilungen', '/anmeldung#ablauf'],
  ['/abteilungen/primarstufe', '/anmeldung#primarstufe'],
  ['/abteilungen/mittelstufe', '/anmeldung#mittelstufe'],
  ['/abteilungen/oberstufe', '/anmeldung#oberstufe'],
]
for (const [from, to] of cases) {
  test(`redirect ${from}`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 })
    expect(res.status()).toBe(308)
    expect(res.headers()['location']).toBe(to)
  })
}

test('redirected anchor heading is visible', async ({ page }) => {
  await page.goto('/abteilungen/mittelstufe')
  const header = await page.locator('header').boundingBox()
  const heading = await page.locator('section#mittelstufe h2').boundingBox()
  expect(heading!.y).toBeGreaterThanOrEqual(header!.y + header!.height)
})
```

- [ ] **Step 2: Run to verify failure.**
- [ ] **Step 3: Implement** — `redirects()` in `next.config.ts` (read `node_modules/next/dist/docs/01-app/02-guides/redirecting.md` first). If the `location` header loses or encodes the `#` (test fails with `%23` or no hash), replace with route handlers `src/app/(site)/abteilungen/route.ts` and `src/app/(site)/abteilungen/[slug]/route.ts` returning `Response` 308 with the exact `Location`. Delete the old pages; point footer and parents-section links to the new targets (`/anmeldung#primarstufe` etc.; parents-section "all departments" link → `/anmeldung#ablauf`).
- [ ] **Step 4: Run all e2e** — `npx playwright test` → PASS. **Step 5: Commit, open PR `feat/navigation-stufen`.**

---

## Phase C: Photo slots (branch `feat/page-images`)

### Task 6: Media sizes, `page-images` global, migration, helper

**Files:**
- Modify: `src/collections/Media.ts`, `src/payload.config.ts`, `src/payload-types.ts` (generated)
- Create: `src/globals/PageImages.ts`, `src/lib/page-images.ts`, `src/migrations/<timestamp>_page_images.ts` (generated), `e2e/page-images.unit.spec.ts`

**Interfaces:**
- Produces:
  - Global slug `page-images`, label "Seitenbilder"; groups and slot names exactly per spec §2 (`startseite.hero|band1|band2`, `bildungswege.vorschule|grundschule|mittelstufe|oberstufe|band`, `schwerpunkt.sport|makerspace|abgekocht`, `ganztag.nachmittag|mensa`, `vision.band`, `anmeldung.band`); each band slot is a group `{ image: upload(media), caption: text }`, other slots are plain `upload` fields.
  - `type Photo = { src: string; alt: string; width: number; height: number; objectPosition: string }`
  - `toPhoto(media: number | Media | null | undefined): Photo | null` — uses `media.sizes.large.url` (1920) if present, else `media.url`; keeps the URL relative (no `mediaUrl()`), so `next/image` treats it as a local image; `objectPosition` = `` `${focalX ?? 50}% ${focalY ?? 50}%` ``.
  - `getPageImages(): Promise<PageImage>` (Local API `findGlobal`, `depth: 1`, `overrideAccess: true`).

- [ ] **Step 1: Write the failing unit tests** (Playwright test runner, no browser)

```ts
test('toPhoto returns null for missing or unpopulated media', () => {
  expect(toPhoto(null)).toBeNull()
  expect(toPhoto(undefined)).toBeNull()
  expect(toPhoto(12)).toBeNull()
})
test('toPhoto prefers the large size and uses the focal point', () => {
  const p = toPhoto({ id: 1, alt: 'Kinder im Makerspace', url: '/api/media/file/a.jpg', width: 4000, height: 3000, focalX: 30, focalY: 20,
    sizes: { large: { url: '/api/media/file/a-1920x1440.webp', width: 1920, height: 1440 } } } as Media)
  expect(p).toEqual({ src: '/api/media/file/a-1920x1440.webp', alt: 'Kinder im Makerspace', width: 1920, height: 1440, objectPosition: '30% 20%' })
})
test('toPhoto centers when no focal point', () => {
  expect(toPhoto({ id: 2, alt: 'x', url: '/a.jpg', width: 800, height: 600 } as Media)!.objectPosition).toBe('50% 50%')
})
```

- [ ] **Step 2: Run to verify failure** — `npx playwright test e2e/page-images.unit.spec.ts` → FAIL (module missing).
- [ ] **Step 3: Implement** — `Media`: `upload: { focalPoint: true, imageSizes: [ { name: 'small', width: 640 }, { name: 'medium', width: 1280 }, { name: 'large', width: 1920 } ], formatOptions: { format: 'webp' } }` (check Payload docs via Context7 for the exact option names first). `PageImages` global with access `read: () => true`, `update` for `admin` and `teacher` roles (same role check style as `Media.ts`). Register in `payload.config.ts` (`globals: [PageImages]`). `npm run generate:types`, then `src/lib/page-images.ts`.
- [ ] **Step 4: Run tests** → PASS.
- [ ] **Step 5: Create and test the migration** — `DATABASE_URL='postgresql://x:x@127.0.0.1:1/none' PAYLOAD_SECRET=dummy NODE_ENV=production npx payload migrate:create page_images` (generating needs no database connection); inspect the SQL (only new tables/columns for the global and media sizes, no drops); create Neon branch, run `npx payload migrate` against it, check `migrate:status`; report to the user and ask before running on the main branch and before deleting the test branch.
- [ ] **Step 6: Commit.**

### Task 7: Photo components and placement

**Files:**
- Create: `src/components/photos/photo-band.tsx`, `src/components/photos/stage-photo.tsx`, `e2e/photos.spec.ts`
- Modify: `src/app/(site)/page.tsx`, `src/components/landingpage/hero.tsx`, pages `bildungswege`, `schwerpunkt`, `ganztag`, `vision`, `anmeldung`

**Interfaces:**
- Consumes: `getPageImages()`, `toPhoto()`, `Photo` (Task 6); `StageSection.photo` (Task 3).
- Produces: `PhotoBand({ photo, caption }: { photo: Photo | null; caption?: string | null })` → `null` when `photo` is null, else `<figure data-photo-band>` full-bleed, `aspect-[4/3] lg:aspect-[21/9]`, `next/image` with `fill`, `sizes="100vw"`, `style={{ objectPosition }}`; `StagePhoto({ photo }: { photo: Photo | null })` → `null` or rounded image, `sizes="(min-width: 1024px) 50vw, 100vw"`.

- [ ] **Step 1: Write the failing tests**

```ts
test('empty photo slots render nothing', async ({ page }) => {
  // production DB has no page images yet
  for (const path of ['/', '/bildungswege', '/schwerpunkt', '/ganztag', '/vision', '/anmeldung']) {
    await page.goto(path)
    await expect(page.locator('[data-photo-band]')).toHaveCount(0)
    await expect(page.locator('img[src=""]')).toHaveCount(0)
  }
})
test('hero falls back to the default photo', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('img[src*="hero-school"]').first()).toBeVisible()
})
test('Stufe without photo shows icon tile', async ({ page }) => {
  await page.goto('/bildungswege')
  await expect(page.locator('#vorschule .bg-golden')).toBeVisible()
})
```

Plus a manual check (not automated, DB write): on the Neon test branch from Task 6, upload one photo per kind, confirm band and Stufe photo render with the focal point at 390 and 1400 px, then report.

- [ ] **Step 2: Run to verify failure** (components missing) — FAIL.
- [ ] **Step 3: Implement** components; place slots: home `band1` after `VisionSection`, `band2` after `SchoolLifeSection`; Bildungswege Stufe photos + `band` before `#abschluesse`; Schwerpunkt photos in `#sport`, `#makerspace`, `#abgekocht`; Ganztag in `#nachmittag`, `#mensa`; Vision and Anmeldung `band` after the first section. Hero uses `startseite.hero` with `/images/hero-school.jpg` fallback.
- [ ] **Step 4: Run tests** → PASS. **Step 5: Commit, open PR `feat/page-images`.**

---

## Phase D: Phones (branch `feat/mobile-actions`)

### Task 8: Mobile action bar

**Files:**
- Create: `src/components/mobile-action-bar.tsx`, `e2e/mobile.spec.ts`
- Modify: `src/app/(site)/page.tsx`, `src/app/(site)/(unterseiten)/layout.tsx`, `src/components/landingpage/header.tsx`, `src/components/landingpage/footer.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: `MobileActionBar()` client component, root element `nav[aria-label="Schnellzugriff"][data-action-bar]`, `lg:hidden`, fixed bottom, `padding-bottom: env(safe-area-inset-bottom)`. Header sets `document.body.dataset.menuOpen = 'true'` while the mobile menu is open (removed on close/unmount); CSS `body[data-menu-open] [data-action-bar] { display: none }`. Footer gets `pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-…` (bar height 4.5 rem).
- Phone numbers (exact): Schulbüro `040 / 428 76 19 – 10` → `tel:+4940428761910`; Schulbüro Primarstufe `040 / 428 96 66 – 0` → `tel:+494042896660`.

- [ ] **Step 1: Write the failing tests** (phone project unless noted)

```ts
test('action bar shows four actions', async ({ page }) => {
  await page.goto('/vision')
  const bar = page.locator('[data-action-bar]')
  await expect(bar).toBeVisible()
  await expect(bar.getByRole('button', { name: 'Anrufen' })).toBeVisible()
  await expect(bar.getByRole('link', { name: 'Anmeldung' })).toHaveAttribute('href', '/anmeldung#ablauf')
  await expect(bar.getByRole('link', { name: 'Termine' })).toHaveAttribute('href', '/termine')
  await expect(bar.getByRole('link', { name: 'News' })).toHaveAttribute('href', '/news')
})
test('Anrufen offers both offices and closes on Escape', async ({ page }) => {
  await page.goto('/')
  const call = page.getByRole('button', { name: 'Anrufen' })
  await call.click()
  await expect(call).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('a[href="tel:+4940428761910"]')).toBeVisible()
  await expect(page.locator('a[href="tel:+494042896660"]')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('a[href="tel:+494042896660"]')).toBeHidden()
})
test('action bar hides while menu is open', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  await expect(page.locator('[data-action-bar]')).toBeHidden()
})
test('action bar does not cover footer', async ({ page }) => {
  await page.goto('/ganztag')
  await page.locator('footer').scrollIntoViewIfNeeded()
  await page.mouse.wheel(0, 10000)
  const bar = (await page.locator('[data-action-bar]').boundingBox())!
  const last = (await page.locator('footer a').last().boundingBox())!
  expect(last.y + last.height).toBeLessThanOrEqual(bar.y)
})
test('action bar hidden on desktop', async ({ page }) => { /* desktop project only */ 
  await page.goto('/'); await expect(page.locator('[data-action-bar]')).toBeHidden() })
```

- [ ] **Step 2: Run to verify failure.** **Step 3: Implement** (panel closes on outside tap and Escape; icons `Phone`, `ClipboardList`, `CalendarDays`, `Newspaper` from lucide; each action ≥ 44 px). **Step 4: Run tests** → PASS. **Step 5: Commit.**

### Task 9: Home page order, next dates, touch sizes

**Files:**
- Create: `src/components/landingpage/next-dates.tsx`, `src/lib/next-dates.ts`, `e2e/next-dates.unit.spec.ts`
- Modify: `src/components/landingpage/hero.tsx`, `src/app/(site)/page.tsx`, `src/components/landingpage/header.tsx`, `src/components/sections/page-parts.tsx`, `e2e/mobile.spec.ts`

**Interfaces:**
- Consumes: `upcomingDates(items, now)` from `department-sections.tsx`.
- Produces: `nextDates(departments: Department[], limit = 3, now = new Date()): Array<DateItem & { department: string }>` — upcoming items across all departments, sorted by `startDate`, first `limit`; `NextDates()` async server component rendering them as a list linking to `/termine`, nothing when empty.

- [ ] **Step 1: Write the failing tests**

```ts
// e2e/next-dates.unit.spec.ts
test('nextDates merges departments, drops past dates, sorts and limits', () => {
  const now = new Date('2026-11-01T10:00:00Z')
  const deps = [
    { title: 'Primarstufe', dates: { items: [ { title: 'Winterfest', startDate: '2026-12-03T12:00:00Z' }, { title: 'Alt', startDate: '2026-10-01T12:00:00Z' } ] } },
    { title: 'Mittelstufe', dates: { items: [ { title: 'Infoabend', startDate: '2026-11-19T12:00:00Z' } ] } },
    { title: 'Oberstufe', dates: { items: [] } },
  ] as Department[]
  expect(nextDates(deps, 3, now).map((d) => [d.title, d.department])).toEqual([['Infoabend','Mittelstufe'],['Winterfest','Primarstufe']])
  expect(nextDates(deps, 1, now)).toHaveLength(1)
})

// e2e/mobile.spec.ts (phone project)
for (const path of PAGES) test(`no horizontal scroll at 360px: ${path}`, async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 })
  await page.goto(path)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360)
})
test('news starts within the first two screens on phones', async ({ page }) => {
  await page.goto('/')
  const news = (await page.locator('#news').boundingBox())!
  expect(news.y).toBeLessThan(844 * 0.8)
})
test('mobile menu items are at least 44px high', async ({ page }) => {
  await page.goto('/')
  await openMenuSection(page, 'Bildungswege')
  for (const box of await page.locator('header a[href^="/bildungswege"]').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height)))
    expect(box).toBeGreaterThanOrEqual(44)
})
```

- [ ] **Step 2: Run to verify failure.**
- [ ] **Step 3: Implement** — hero `min-h-[70svh] lg:min-h-screen`; `NextDates` placed right after `NewsSection` on the home page; mobile menu accordion links `min-h-11` with vertical centering; every `section[id]` that is a menu target keeps `scroll-mt-20 md:scroll-mt-24`; body text in touched components `text-base` minimum.
- [ ] **Step 4: Run full suite** — `npx playwright test` → PASS on both projects.
- [ ] **Step 5: Final visual pass** — screenshots of all `PAGES` at 360, 390, 1400 px, light and dark; fix anything clipped or low-contrast; trim decorative all-caps eyebrows / gold lines on pages touched in this plan where they carry no information (spec "Design direction").
- [ ] **Step 6: Commit, open PR `feat/mobile-actions`.**
