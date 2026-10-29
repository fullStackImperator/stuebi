# Bildungsstufen- und Ganztag-Seiten Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eigene Seiten für Vorschule, Grundschule, Mittelstufe, Oberstufe und einen neu aufgebauten Ganztag, dazu „Für Eltern“ auf der Startseite mit fünf großen Kacheln.

**Architecture:** Typisierte Inhalte je Stufe in `src/content/stufen/`, eine gemeinsame Server-Komponente `StagePage`, die daraus die Blöcke rendert und Anmeldung/Termine/Kontakt aus der CMS-Collection `departments` holt. `/bildungswege` wird Übersicht; alle Links auf die alten Anker wandern auf die neuen Routen.

**Tech Stack:** Next.js 16 (App Router, Server Components), Payload 3 Local API, Tailwind v4, Playwright (`npm run test:e2e`, Unit-Specs `*.unit.spec.ts` ohne Browser).

**Spec:** `docs/superpowers/specs/2026-10-30-bildungsstufen-seiten-design.md`

## Global Constraints

- Routen exakt: `/vorschule`, `/grundschule`, `/mittelstufe`, `/oberstufe`, `/ganztag`.
- Abteilungs-Zuordnung: vorschule, grundschule → `primarstufe`; mittelstufe → `mittelstufe`; oberstufe → `oberstufe`; ganztag → keine.
- Reihenfolge „Nächste Stufe“: vorschule → grundschule → mittelstufe → oberstufe → ganztag (ganztag hat keinen Nachfolger).
- Stufenfarben wie auf der übrigen Seite: Vorschule `golden`, Grundschule `mint`, Mittelstufe `accent`, Oberstufe `primary`, Ganztag `surface-ink`.
- Beratungsdienst nur mit Rollen und Kontakt: `beratungsdienst@stuebenhofer-weg.de`, Telefon `040 – 428 7619 42`, Sprechstunde der Beratungslehrerin dienstags in der Mittagsfreizeit; keine Namensliste.
- Kursangebot auf `/ganztag` sichtbar als „Beispiele aus dem Schuljahr 2024/25“ gekennzeichnet.
- Fehlende Fakten (Betreuungszeiten, Kosten, Mittagessen, Brotzeit) mit der vorhandenen `Placeholder`-Komponente.
- Neue Seiten mit CMS-Fotos: `export const revalidate = 60` wie die übrigen Unterseiten.
- Code-Stil der Unterseiten: einfache Anführungszeichen, keine Semikolons, deutsche Kommentare wo die Nachbardateien deutsch kommentieren.
- Der Dev-Server cached Module hartnäckig: nach Änderungen per `curl` prüfen, dass die neue Fassung ausgeliefert wird; sonst Server neu starten.

## Review Focus

- Datenbank nicht erreichbar (z. B. beim Build): Stufenseite rendert trotzdem, nur ohne Anmeldung/Termine/Kontakt → Task 2 testet `loadDepartment` mit werfendem Client.
- Abteilung ohne Termine (Oberstufe hat aktuell keine): Block zeigt „Aktuell stehen keine Termine an“ statt zu fehlen → Test in Task 3.
- CMS-Seitenbild der Stufe leer: Broschürenfoto erscheint → Test in Task 2 (vorschule-Slot ist laut `photos.spec.ts` gefüllt, grundschule leer).
- Alte Lesezeichen `/bildungswege#vorschule` usw.: Abschnitt mit dieser id existiert weiter auf der Übersicht → Test in Task 5.
- CMS-Seite mit Slug `vorschule` würde von der statischen Route verdeckt: Slugs stehen in `RESERVED` → Test in Task 3.

---

### Task 1: Inhaltsmodell und Inhalte der fünf Stufen

**Files:**
- Create: `src/content/stufen/types.ts`, `src/content/stufen/shared.ts`, `src/content/stufen/vorschule.ts`, `grundschule.ts`, `mittelstufe.ts`, `oberstufe.ts`, `ganztag.ts`, `src/content/stufen/index.ts`
- Test: `e2e/stufen-content.unit.spec.ts`

**Interfaces:**
- Produces (`types.ts`):
  - `type StageId = 'vorschule' | 'grundschule' | 'mittelstufe' | 'oberstufe' | 'ganztag'`
  - `type StageColor = 'golden' | 'mint' | 'accent' | 'primary' | 'surface-ink'`
  - `type Point = { title: string; text: string }`
  - `type Block = { id: string; heading: string; intro?: string; points?: Point[]; paragraphs?: string[]; placeholder?: string }`
  - `type StageContent = { id: StageId; name: string; grades: string; lead: string; teaser: string; color: StageColor; photo: Photo; photoSlot?: 'vorschule' | 'grundschule' | 'mittelstufe' | 'oberstufe'; expect: Point[]; everyday: Block[]; extra?: Block[]; support: boolean; careers: boolean; department?: 'primarstufe' | 'mittelstufe' | 'oberstufe'; next?: StageId }`
- Produces (`shared.ts`): `supportBlock: Block` (id `foerderung`), `careersBlock: Block` (id `berufsorientierung`)
- Produces (`index.ts`): `stageOrder: StageId[]`, `stages: Record<StageId, StageContent>`, `stageHref(id: StageId): string` (liefert `/${id}`)

- [ ] **Step 1: Write the failing test** `e2e/stufen-content.unit.spec.ts`

```ts
import { expect, test } from '@playwright/test'
import { stageHref, stageOrder, stages } from '../src/content/stufen'

test('stages are in path order and chained by next', () => {
  expect(stageOrder).toEqual(['vorschule', 'grundschule', 'mittelstufe', 'oberstufe', 'ganztag'])
  expect(stageOrder.map((id) => stages[id].next)).toEqual(['grundschule', 'mittelstufe', 'oberstufe', 'ganztag', undefined])
  expect(stageHref('oberstufe')).toBe('/oberstufe')
})

test('departments and colours match the site', () => {
  expect(stageOrder.map((id) => stages[id].department)).toEqual(['primarstufe', 'primarstufe', 'mittelstufe', 'oberstufe', undefined])
  expect(stageOrder.map((id) => stages[id].color)).toEqual(['golden', 'mint', 'accent', 'primary', 'surface-ink'])
})

test('career orientation only for Mittel- and Oberstufe', () => {
  expect(stageOrder.filter((id) => stages[id].careers)).toEqual(['mittelstufe', 'oberstufe'])
})

test('every stage has content for the tile and the page', () => {
  for (const id of stageOrder) {
    const s = stages[id]
    expect(s.teaser.length, id).toBeGreaterThan(20)
    expect(s.expect.length, id).toBeGreaterThanOrEqual(3)
    expect(s.photo.src, id).toMatch(/^\/images\/fotos\//)
  }
})

test('Beratung shows roles and contact, not a name list', async () => {
  const { supportBlock } = await import('../src/content/stufen/shared')
  const text = JSON.stringify(supportBlock)
  expect(text).toContain('beratungsdienst@stuebenhofer-weg.de')
  expect(text).not.toMatch(/Krinke|Michalski|Zerbin/)
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test e2e/stufen-content.unit.spec.ts --project=desktop`
Expected: FAIL, module `../src/content/stufen` not found.

- [ ] **Step 3: Write `types.ts`, `shared.ts`, the five content files and `index.ts`**

Inhalte nach der Spec, Abschnitt „Inhalte je Stufe“; Texte aus `_reference/Broschüre_A5_überarbeitet.pdf` und den Zusammenfassungen der alten Seiten (Vorschulisches Lernen, Informationen Jg. 1–4, Jg. 5–10, Vorstufe Jg. 11, Ganztagsschule, Kursangebot, Beratungsdienst). Fotos aus `public/images/fotos/`: vorschule `vorschule-theater.jpg`, grundschule `grundschule-spiel.jpg`, mittelstufe `mittelstufe-daumen.jpg`, oberstufe `oberstufe-gruppe.jpg`, ganztag `greenscreen.jpg` (Breite/Höhe per `sips -g pixelWidth -g pixelHeight` eintragen). `photoSlot` gleich der id für die vier Stufen, bei ganztag weglassen. Oberstufe `extra`: Block `voraussetzungen` (MSA-Schnitt mindestens 3,0 und mindestens 3,0 in Deutsch, Englisch, Mathematik; zweite Fremdsprache Spanisch/Französisch neu, Türkisch weitergeführt). Ganztag `everyday`: Block `tagesrhythmus` (TUT-Zeit, Unterrichtsband, Vertiefungsband, Mittagsfreizeit, Mittags- und Nachmittagsband) und Block `kurse` mit intro „Beispiele aus dem Schuljahr 2024/25“; `extra`: Blöcke `bibliothek`, `mensa` (placeholder „Essenszeiten, Kosten, Bestellung und Brotzeit.“), `betreuung` (placeholder „Betreuungszeiten, Früh- und Spätbetreuung, Ferien.“).

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx playwright test e2e/stufen-content.unit.spec.ts --project=desktop`
Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add src/content/stufen e2e/stufen-content.unit.spec.ts
git commit -m "feat(stufen): Inhalte der Bildungsstufen und des Ganztags"
```

---

### Task 2: `StagePage`-Vorlage und Seite `/vorschule`

**Files:**
- Create: `src/components/stufen/stage-page.tsx`, `src/lib/departments.ts`, `src/app/(site)/(unterseiten)/vorschule/page.tsx`
- Test: `e2e/stufen.spec.ts`, `e2e/departments.unit.spec.ts`

**Interfaces:**
- Consumes: `stages`, `stageHref`, `supportBlock`, `careersBlock` (Task 1); `PageIntro`, `PageSection`, `PointList`, `InfoCard`, `NextLink`, `Placeholder` (`src/components/sections/page-parts.tsx`); `RegistrationSection`, `DatesSection`, `ContactBlock` (`src/components/departments/department-sections.tsx`); `upcomingDates` (`src/lib/next-dates.ts`); `getPageImages` und `toPhoto`; `StagePhoto`.
- Produces:
  - `loadDepartment(slug: string, client?: () => Promise<{ find: Function }>): Promise<Department | null>` in `src/lib/departments.ts`; gibt `null` zurück, wenn der Client wirft oder nichts findet (`console.error` wie in `next-dates.tsx`).
  - `StagePage({ id }: { id: StageId }): Promise<JSX.Element>` in `stage-page.tsx`; Abschnitts-ids: `erwartet`, `alltag`, `foerderung`, `berufsorientierung`, Block-ids aus `extra`, `anmeldung-stufe`, `weiter`.
  - Seiten-Datei: `export const metadata`, `export const revalidate = 60`, `export default function Page() { return <StagePage id="vorschule" /> }`.

- [ ] **Step 1: Write the failing tests**

`e2e/departments.unit.spec.ts`:
```ts
test('loadDepartment returns null when the database is unreachable', async () => {
  const dep = await loadDepartment('primarstufe', async () => { throw new Error('no db') })
  expect(dep).toBeNull()
})
```
`e2e/stufen.spec.ts`:
```ts
test('Vorschule page has every block and the Primarstufe registration', async ({ page }) => {
  const res = await page.goto('/vorschule')
  expect(res?.status()).toBe(200)
  await expect(page.locator('h1')).toContainText('Vorschule')
  for (const id of ['erwartet', 'alltag', 'foerderung', 'anmeldung-stufe', 'weiter'])
    await expect(page.locator(`section#${id}`)).toBeVisible()
  await expect(page.locator('section#berufsorientierung')).toHaveCount(0)
  await expect(page.locator('section#anmeldung-stufe')).toContainText('Primarstufe')
  await expect(page.locator('section#weiter a[href="/grundschule"]')).toBeVisible()
  await expect(page.locator('section#foerderung')).toContainText('beratungsdienst@stuebenhofer-weg.de')
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx playwright test e2e/departments.unit.spec.ts e2e/stufen.spec.ts --project=desktop`
Expected: FAIL (module missing; `/vorschule` 404).

- [ ] **Step 3: Implement `loadDepartment`, `StagePage` and `vorschule/page.tsx`**

`StagePage` holt Inhalt, CMS-Foto (`toPhoto(img.bildungswege?.[photoSlot]) ?? content.photo`) und Abteilung, rendert `PageIntro` (eyebrow = grades), dann die Abschnitte in Spec-Reihenfolge mit abwechselndem `tone`. Anmeldung-Block nur bei gesetzter `department` und geladener Abteilung: Überschrift mit `department.title`, darunter `RegistrationSection`, `DatesSection(upcomingDates(...))`, `ContactBlock` wie in `department-section.tsx`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx playwright test e2e/departments.unit.spec.ts e2e/stufen.spec.ts --project=desktop --project=phone`
Expected: all passed. Danach `curl -s localhost:3000/vorschule | grep -c 'id="erwartet"'` ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/stufen src/lib/departments.ts "src/app/(site)/(unterseiten)/vorschule" e2e/stufen.spec.ts e2e/departments.unit.spec.ts
git commit -m "feat(stufen): Vorlage StagePage und Seite /vorschule"
```

---

### Task 3: Seiten Grundschule, Mittelstufe, Oberstufe und reservierte Slugs

**Files:**
- Create: `src/app/(site)/(unterseiten)/grundschule/page.tsx`, `mittelstufe/page.tsx`, `oberstufe/page.tsx`
- Create: `src/lib/reserved-slugs.ts`
- Modify: `src/app/(site)/(unterseiten)/[slug]/page.tsx:8` (`RESERVED` von dort importieren)
- Test: `e2e/stufen.spec.ts`

**Interfaces:**
- Consumes: `StagePage` (Task 2).
- Produces: `export const RESERVED: ReadonlySet<string>` in `src/lib/reserved-slugs.ts` (bisherige Einträge plus `vorschule`, `grundschule`, `mittelstufe`, `oberstufe`, `ganztag`). Eigene Datei, damit der Unit-Test nicht die Payload-Seite importiert.

- [ ] **Step 1: Write the failing tests** (in `e2e/stufen.spec.ts`)

```ts
for (const [path, dep, next] of [['/grundschule', 'Primarstufe', '/mittelstufe'], ['/mittelstufe', 'Mittelstufe', '/oberstufe'], ['/oberstufe', 'Oberstufe', '/ganztag']] as const)
  test(`${path} renders with ${dep} registration`, async ({ page }) => {
    expect((await page.goto(path))?.status()).toBe(200)
    await expect(page.locator('section#anmeldung-stufe')).toContainText(dep)
    await expect(page.locator(`section#weiter a[href="${next}"]`)).toBeVisible()
  })

test('career orientation only on Mittel- and Oberstufe', async ({ page }) => {
  await page.goto('/grundschule'); await expect(page.locator('section#berufsorientierung')).toHaveCount(0)
  await page.goto('/mittelstufe'); await expect(page.locator('section#berufsorientierung')).toContainText('Praxislerntag')
})

test('Oberstufe shows requirements and the empty dates notice', async ({ page }) => {
  await page.goto('/oberstufe')
  await expect(page.locator('section#voraussetzungen')).toContainText('3,0')
  await expect(page.locator('section#anmeldung-stufe')).toContainText('Aktuell stehen keine Termine an')
})
```
In `e2e/stufen-content.unit.spec.ts`:
```ts
test('stage slugs are reserved for CMS pages', async () => {
  const { RESERVED } = await import('../src/lib/reserved-slugs')
  for (const s of ['vorschule', 'grundschule', 'mittelstufe', 'oberstufe', 'ganztag']) expect(RESERVED.has(s)).toBe(true)
})
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx playwright test e2e/stufen.spec.ts e2e/stufen-content.unit.spec.ts --project=desktop`
Expected: FAIL (404s, `reserved-slugs` missing).

- [ ] **Step 3: Add the three page files (like `vorschule/page.tsx`), create `reserved-slugs.ts`, import it in `[slug]/page.tsx`**

- [ ] **Step 4: Run to verify they pass** (both projects). Expected: all passed.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/(unterseiten)/grundschule" "src/app/(site)/(unterseiten)/mittelstufe" "src/app/(site)/(unterseiten)/oberstufe" src/lib/reserved-slugs.ts "src/app/(site)/(unterseiten)/[slug]/page.tsx" e2e/stufen.spec.ts e2e/stufen-content.unit.spec.ts
git commit -m "feat(stufen): Seiten Grundschule, Mittelstufe, Oberstufe"
```

---

### Task 4: `/ganztag` auf die Vorlage umstellen

**Files:**
- Modify: `src/app/(site)/(unterseiten)/ganztag/page.tsx` (ganz ersetzen)
- Modify: `src/lib/site-navigation.ts` (Ganztag-Unterpunkte auf die neuen Block-ids: `#tagesrhythmus`, `#kurse`, `#mensa`)
- Test: `e2e/stufen.spec.ts`

**Interfaces:**
- Consumes: `StagePage` (Task 2), `stages.ganztag` (Task 1). Die CMS-Fotos `ganztag.nachmittag`/`ganztag.mensa` werden nicht mehr genutzt; die Felder im Global bleiben unverändert (keine Migration).

- [ ] **Step 1: Write the failing test**

```ts
test('Ganztag shows the day rhythm, example courses and no registration block', async ({ page }) => {
  await page.goto('/ganztag')
  await expect(page.locator('section#tagesrhythmus')).toContainText('Vertiefungsband')
  await expect(page.locator('section#kurse')).toContainText('Beispiele aus dem Schuljahr 2024/25')
  await expect(page.locator('section#mensa')).toContainText('Text folgt')
  await expect(page.locator('section#anmeldung-stufe')).toHaveCount(0)
  await expect(page.locator('section#weiter')).toHaveCount(0)
})
```

- [ ] **Step 2: Run to verify it fails.** Expected: FAIL (`#tagesrhythmus` missing).
- [ ] **Step 3: Replace the page with `<StagePage id="ganztag" />`, keep `metadata` and `revalidate = 60`; update the nav children.**
- [ ] **Step 4: Run to verify it passes** (both projects, plus `e2e/navigation.spec.ts`).
- [ ] **Step 5: Commit** `git commit -am "feat(ganztag): Ganztag-Seite mit Tagesrhythmus und Kursbeispielen"`

---

### Task 5: `/bildungswege` als Übersicht und Links umstellen

**Files:**
- Modify: `src/app/(site)/(unterseiten)/bildungswege/page.tsx` (Stufen-Abschnitte durch Kachel-Übersicht ersetzen, „Abschlüsse“ behalten)
- Create: `src/components/stufen/stage-tiles.tsx`
- Modify: `src/lib/site-navigation.ts`, `src/components/landingpage/hero.tsx`, `src/components/landingpage/footer.tsx`, `src/app/(site)/(unterseiten)/schwerpunkt/page.tsx` (alle `/bildungswege#<stufe>` → `stageHref(<stufe>)`; `#profile` → `/oberstufe#erwartet`)
- Modify: `e2e/navigation.spec.ts` (erste zwei Tests auf neue Links/Übersicht), `e2e/photos.spec.ts` falls er Stufenabschnitte auf `/bildungswege` erwartet, `e2e/helpers.ts` und `e2e/mobile.spec.ts` (`PAGES` um die vier neuen Routen ergänzen), `e2e/isr.unit.spec.ts` (Liste ergänzen)

**Interfaces:**
- Produces: `StageTiles({ ids, variant }: { ids: StageId[]; variant: 'overview' | 'landing' }): JSX.Element` — Kachel je Stufe mit Foto, Farbe, `grades`, `teaser`, Link `stageHref(id)`; jede Kachel trägt `id={id}`, damit alte Anker `/bildungswege#vorschule` weiter treffen. Wird in Task 6 wiederverwendet.

- [ ] **Step 1: Write/adjust the failing tests**

```ts
test('Bildungswege menu links every Stufe page', async ({ page }) => {
  await page.goto('/')
  await openMenuSection(page, 'Bildungswege')
  for (const path of ['/vorschule', '/grundschule', '/mittelstufe', '/oberstufe'])
    await expect(page.locator(`a[href="${path}"]`).filter({ visible: true }).first()).toBeVisible()
})

test('Bildungswege overview keeps the old anchors', async ({ page }) => {
  await page.goto('/bildungswege#mittelstufe')
  for (const id of ['vorschule', 'grundschule', 'mittelstufe', 'oberstufe', 'ganztag', 'abschluesse'])
    await expect(page.locator(`#${id}`)).toBeVisible()
  await expect(page.locator('#mittelstufe a[href="/mittelstufe"], a#mittelstufe[href="/mittelstufe"]').first()).toBeVisible()
})

test('no link points to the old stage anchors', async ({ page }) => {
  for (const path of ['/', '/schwerpunkt'])
    { await page.goto(path); await expect(page.locator('a[href^="/bildungswege#"]:not([href="/bildungswege#abschluesse"])')).toHaveCount(0) }
})
```

- [ ] **Step 2: Run to verify they fail.** Run: `npx playwright test e2e/navigation.spec.ts --project=desktop`. Expected: FAIL (old anchors still linked).
- [ ] **Step 3: Build `StageTiles` (variant `overview`), rebuild `/bildungswege`, switch all links.**
- [ ] **Step 4: Run the whole suite** `npx playwright test` — Expected: all passed (fix tests that asserted the old Bildungswege sections, nothing else).
- [ ] **Step 5: Commit** `git commit -am "feat(bildungswege): Übersicht mit Kacheln, Links auf die Stufenseiten"` (neue Datei vorher `git add`).

---

### Task 6: „Für Eltern“ mit fünf großen Kacheln

**Files:**
- Modify: `src/components/landingpage/parents-section.tsx` (Karten `highlights` und dunkle Stufenleiste entfernen, `StageTiles variant="landing"` einsetzen)
- Modify: `src/components/stufen/stage-tiles.tsx` (Variante `landing`: Desktop drei oben, zwei unten mit breiter Ganztag-Kachel; mobil untereinander)
- Test: `e2e/stufen.spec.ts`

**Interfaces:**
- Consumes: `StageTiles` (Task 5), `stageOrder` (Task 1).

- [ ] **Step 1: Write the failing test**

```ts
test('Für Eltern links the five pages with large tiles', async ({ page }) => {
  await page.goto('/')
  const eltern = page.locator('section#eltern')
  for (const path of ['/vorschule', '/grundschule', '/mittelstufe', '/oberstufe', '/ganztag'])
    await expect(eltern.locator(`a[href="${path}"]`)).toBeVisible()
  await expect(eltern).toContainText('Konzept eine Klasse')
  await expect(eltern.locator('a[href="/anmeldung#ablauf"]')).toBeVisible()
  await expect(eltern.getByText('Gesunde Ernährung')).toHaveCount(0)
  const box = await eltern.locator('a[href="/vorschule"]').boundingBox()
  expect(box!.height).toBeGreaterThan(220)
})
```

- [ ] **Step 2: Run to verify it fails.** Expected: FAIL (no `/vorschule` link, small cards still present).
- [ ] **Step 3: Implement the landing variant and use it in `ParentsSection`.**
- [ ] **Step 4: Run to verify it passes** (both projects, plus `e2e/dark-mode.spec.ts`).
- [ ] **Step 5: Commit** `git commit -am "feat(startseite): Für Eltern mit großen Kacheln zu den Stufenseiten"`

---

### Task 7: Abschlussprüfung

- [ ] **Step 1:** `npm run lint` → 0 errors; `npx tsc --noEmit -p .` → keine Ausgabe.
- [ ] **Step 2:** `npx playwright test` → all passed.
- [ ] **Step 3:** Screenshots (Desktop 1440 und Mobil 390, hell und dunkel) von `/`, `/bildungswege`, `/vorschule`, `/grundschule`, `/mittelstufe`, `/oberstufe`, `/ganztag` ansehen; Kontrast der Kacheln (Text auf `golden`/`mint` in `text-on-bright`) prüfen.
- [ ] **Step 4:** Ergebnis mit Screenshots dem Nutzer zeigen; Push erst nach Freigabe.
