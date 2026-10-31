# Schwerpunkte Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Startseite zeigt Sport, Makerspace und Abgekocht als kurze Farbkarten; `/schwerpunkt` bekommt je einen Bento-Abschnitt mit CMS-Galerie und den erweiterten Inhalten.

**Architecture:** Eine Inhaltsdatei (`src/content/schwerpunkte.ts`) speist Startseite und Schwerpunkt-Seite. Eine reine Funktion (`bentoCells`) entscheidet die Kachelfolge, eine Komponente (`SchwerpunktFeature`) rendert einen Abschnitt. Der Payload-Global „Seitenbilder“ bekommt drei additive `hasMany`-Upload-Felder.

**Tech Stack:** Next.js 16 (App Router), React 19, Payload CMS 3.80 (Postgres), Tailwind v4, lucide-react, Playwright (`*.unit.spec.ts` = reine Unit-Tests, `*.spec.ts` = gegen den Dev-Server).

**Spec:** `docs/superpowers/specs/2026-10-31-schwerpunkte-design.md`

## Global Constraints

- Farben: Sport `accent`, Makerspace `mint`, Abgekocht `golden`; Text Navy (`text-on-bright`) auf Gold/Mint, Weiß auf Pink.
- Anker: `#sport`, `#makerspace`, `#abgekocht` auf `/schwerpunkt`, jeweils mit `scroll-mt-20 md:scroll-mt-24`.
- Makerspace-Link: `https://stuebi-makerspace.de/`, `target="_blank" rel="noopener noreferrer"`, sichtbarer Hinweis „↗“.
- Galerie: max. 6 Fotos pro Schwerpunkt (`maxRows: 6`), optional; bestehende Uploads `sport`/`makerspace`/`abgekocht` bleiben (Titelfoto).
- Migration rein additiv, ausgeführt auf der Live-DB aus `.env` (vom Nutzer freigegeben). Keine Fixture-Seeds gegen die Live-DB (`e2e/fixtures/seed-page-images.ts` nie ausführen).
- Texte neu formuliert im Ton der Website, Deutsch, keine wörtliche Übernahme von stuebi-hamburg.de.
- Nach jeder Code-Änderung prüfen, ob der Dev-Server sie ausliefert (`curl … | grep`); bei veraltetem Stand Server neu starten und `.next/dev/cache/turbopack` löschen (bekanntes Problem in diesem Repo).

## Review Focus

1. Titelfoto ist zusätzlich in der Galerie hochgeladen → darf im Bento nicht doppelt erscheinen (Test in Task 4: `bentoCells` dedupliziert nach `src`).
2. Galerie-Eintrag ohne Datei/URL (gelöschte Mediendatei) → keine leere Kachel (Test in Task 3: `toPhotos` filtert).
3. Startseiten-Link springt zum Abschnitt, Überschrift nicht unter dem festen Header (Test in Task 5: Abschnitts-Top ≥ Header-Höhe nach Navigation).
4. Handy 360–390 px: Bento mit 2×2-Kachel erzeugt keinen horizontalen Scroll (Test in Task 4: `scrollWidth <= innerWidth` im `phone`-Projekt).
5. CMS nicht erreichbar (`getPageImages()` liefert `{}`) → Titelfotos aus `schwerpunktFallbacks`, Galerie leer, Seite rendert (Test in Task 4: `bentoCells` mit Fallback; Seite 200).

---

### Task 1: E2E-Tests an das neue Handy-Menü anpassen

Die Drawer-Commits `f3086a2`/`ee5db36` haben das Header-Akkordeon und `data-action-bar` entfernt; mehrere Tests laufen ins Leere.

**Files:**
- Modify: `src/components/mobile-action-bar.tsx` (Attribut `data-action-bar` am `<nav>` wieder setzen)
- Modify: `e2e/helpers.ts` (`openMenuSection`)
- Modify: `e2e/mobile.spec.ts` (Tests „action bar hides while menu is open“, „mobile menu items are at least 44px high“)

**Interfaces:**
- Produces: `openMenuSection(page, label)` öffnet auf Handys den Drawer (`button[aria-label="Menü öffnen"]`) und tippt die Kachel `[data-slot="drawer-content"] button` mit `label`; Desktop unverändert (Hover).

- [ ] **Step 1: Tests anpassen**
  - „action bar hides while menu is open“ → umbenennen in „action bar stays visible and closes the menu“: nach Öffnen ist `[data-action-bar]` sichtbar, `button[aria-label="Menü schließen"]` sichtbar; Klick darauf → `[data-slot="drawer-popup"]` hat Count 0.
  - „mobile menu items are at least 44px high“ → Drawer öffnen, Kachel „Bildungswege“ tippen, Höhen von `[data-slot="drawer-content"] a, [data-slot="drawer-content"] button` messen; erwarten > 5 Elemente, alle ≥ 44.
  - Neuer Test „tapping a drawer link navigates and closes the menu“: `/` → Menü → „Ganztag“ → `a[href="/ganztag#mensa"]` tippen → URL endet auf `/ganztag#mensa`, Drawer-Popup Count 0.
- [ ] **Step 2: Laufen lassen, Fehlschlag prüfen**
  Run: `npx playwright test e2e/mobile.spec.ts e2e/navigation.spec.ts --project=phone`
  Expected: FAIL (kein `[data-action-bar]`, Helper findet `header button.w-full` nicht)
- [ ] **Step 3: `data-action-bar` am `<nav>` in `mobile-action-bar.tsx` ergänzen, `openMenuSection` auf den Drawer umstellen**
- [ ] **Step 4: Tests laufen lassen**
  Run: `npx playwright test e2e/mobile.spec.ts e2e/navigation.spec.ts`
  Expected: PASS (beide Projekte)
- [ ] **Step 5: Commit** — `test(e2e): Tests auf das Drawer-Menü umstellen`

---

### Task 2: Inhaltsdatei `src/content/schwerpunkte.ts`

**Files:**
- Create: `src/content/schwerpunkte.ts`
- Test: `e2e/schwerpunkte-content.unit.spec.ts`

**Interfaces:**
- Produces:
  ```ts
  export type SchwerpunktId = 'sport' | 'makerspace' | 'abgekocht'
  export type SchwerpunktColor = 'accent' | 'mint' | 'golden'
  export type Fact = { value: string; label: string }
  export type Schwerpunkt = {
    id: SchwerpunktId; title: string; color: SchwerpunktColor; icon: LucideIcon
    teaser: string            // Startseiten-Karte, 1–2 Sätze
    intro: string             // Farbband, 1–2 Sätze
    facts: Fact[]             // 2–3 Kacheln
    quote?: { text: string; author: string }
    points: string[]
    howItWorks?: string[]     // „So läuft’s“
    partners?: string
    links: { label: string; href: string; external?: boolean }[]
  }
  export const schwerpunktOrder: SchwerpunktId[]   // ['sport', 'makerspace', 'abgekocht']
  export const schwerpunkte: Record<SchwerpunktId, Schwerpunkt>
  ```

- [ ] **Step 1: Unit-Test schreiben** (`schwerpunkte-content.unit.spec.ts`)
  - `schwerpunktOrder` gleich `['sport', 'makerspace', 'abgekocht']`; Farben `['accent', 'mint', 'golden']`.
  - Für jede id: `teaser.length` 40–260, `intro.length` > 40, `facts.length` 2–3, `points.length` ≥ 4.
  - Sport-Fakten enthalten `'3 Std.'`; Abgekocht-Fakten enthalten `'Seit 2017'`.
  - `schwerpunkte.makerspace.links` enthält `{ href: 'https://stuebi-makerspace.de/', external: true }`.
  - Abgekocht: `howItWorks` vorhanden; Text enthält „Mensaverein“ und „Halal“.
- [ ] **Step 2: Fehlschlag prüfen** — Run: `npx playwright test e2e/schwerpunkte-content.unit.spec.ts` · Expected: FAIL (Modul fehlt)
- [ ] **Step 3: Datei schreiben.** Inhalte laut Spec Abschnitt 2: heutige Stichpunkte/Partner/Zitate aus `school-life-section.tsx` übernehmen und um die Punkte der alten Website ergänzen (Sport: Bewegung im Unterricht, Spielgeräte-Container und offene Halle in der großen Pause, Stübi-Cup, Winter-Judo-Cup, Spendenlauf, Wilhelmsburger Insel-Cup, Auszeichnung „sportbetonte Schule“ seit 2017/18; Abgekocht: frisches Mittagessen, Bio-Rohkost/Schulgarten, Halal-Fleisch vom regionalen Schlachter, Mensaverein; „So läuft’s“: geteilte Klasse Lernküche/Unterricht, mittwochs Exkursionen, Jahrgangsthemen). Teaser = die Texte aus Prototyp `proto/besonderheiten-b`. Icons: Sport `Trophy`, Makerspace `Cog`, Abgekocht `ChefHat`.
- [ ] **Step 4: Test laufen lassen** — Expected: PASS
- [ ] **Step 5: Commit** — `feat(inhalte): Inhaltsdatei für die Schwerpunkte`

---

### Task 3: CMS-Galerien, Live-Migration, `toPhotos`

**Files:**
- Modify: `src/globals/PageImages.ts:59-64` (Gruppe `schwerpunkt`)
- Create: `src/migrations/<timestamp>_schwerpunkt_galerie.ts` (+ `.json`, Eintrag in `src/migrations/index.ts` – vom CLI erzeugt)
- Modify: `src/payload-types.ts` (generiert), `src/app/(payload)/admin/importMap.js` (generiert, falls geändert)
- Modify: `src/lib/photo.ts`
- Test: `e2e/page-images.unit.spec.ts`

**Interfaces:**
- Produces: Felder `schwerpunkt.sportGalerie | makerspaceGalerie | abgekochtGalerie` (Typ `(number | Media)[] | null`); `toPhotos(media: (number | Media)[] | null | undefined): Photo[]` in `src/lib/photo.ts`.

- [ ] **Step 1: Unit-Tests für `toPhotos` ergänzen**
  - `toPhotos(null)`, `toPhotos(undefined)`, `toPhotos([])` → `[]`.
  - `toPhotos([3, mediaOhneUrl, gültigeMedia])` → genau ein Foto (das gültige).
  - Reihenfolge bleibt erhalten bei zwei gültigen Medien.
- [ ] **Step 2: Fehlschlag prüfen** — Run: `npx playwright test e2e/page-images.unit.spec.ts` · Expected: FAIL (`toPhotos` fehlt)
- [ ] **Step 3: `toPhotos` implementieren** (map über `toPhoto`, `null` herausfiltern).
- [ ] **Step 4: Felder ergänzen.** Bestehende Labels zu „Sport – Titelfoto“ usw.; neue Felder `{ name: 'sportGalerie', label: 'Sport – Galerie', type: 'upload', relationTo: 'media', hasMany: true, maxRows: 6, admin: { description: 'Bis zu 6 weitere Fotos für die Schwerpunkt-Seite, per Ziehen sortierbar.' } }`, analog Makerspace und Abgekocht.
- [ ] **Step 5: Migration erzeugen und prüfen** — Run: `npx payload migrate:create schwerpunkt_galerie` · Expected: neue Datei; Inhalt nur `ADD COLUMN`/`CREATE TABLE`/neue Indizes bzw. Spalten in `page_images_rels`, kein `DROP`/`ALTER … TYPE` auf bestehende Spalten. Bei anderem Inhalt: anhalten und dem Nutzer zeigen.
- [ ] **Step 6: Migration auf der Live-DB ausführen** — Run: `npx payload migrate` · Expected: „Migrated: …schwerpunkt_galerie“, Exit 0. Danach `npx payload migrate:status` zeigt sie als ausgeführt.
- [ ] **Step 7: Typen und Importmap** — Run: `npm run generate:types && npm run generate:importmap` · Expected: `payload-types.ts` enthält `sportGalerie?: (number | Media)[] | null`.
- [ ] **Step 8: Prüfen** — Run: `npx playwright test e2e/page-images.unit.spec.ts && npx tsc --noEmit` · Expected: PASS. Manuell: `/admin/globals/page-images` zeigt unter „Schwerpunkt“ Titelfotos (bestehende Bilder noch da) und drei Galerie-Felder.
- [ ] **Step 9: Commit** — `feat(cms): Galerien für die Schwerpunkte`

---

### Task 4: Bento-Abschnitte auf `/schwerpunkt`

**Files:**
- Create: `src/lib/bento.ts`
- Create: `src/components/schwerpunkt/schwerpunkt-feature.tsx`
- Modify: `src/app/(site)/(unterseiten)/schwerpunkt/page.tsx`
- Test: `e2e/bento.unit.spec.ts`, `e2e/schwerpunkt.spec.ts`
- Modify: `e2e/photos.spec.ts` (Test „Schwerpunkt card shows its photo…“ auf neue Selektoren)

**Interfaces:**
- Consumes: `schwerpunkte`, `schwerpunktOrder`, `Fact` (Task 2); `toPhoto`, `toPhotos` (Task 3); `schwerpunktFallbacks` (`src/lib/fallback-photos.ts`).
- Produces:
  ```ts
  // src/lib/bento.ts
  export type BentoCell =
    | { kind: 'photo'; photo: Photo; size: 'large' | 'small' }
    | { kind: 'fact'; fact: Fact }
    | { kind: 'quote'; quote: { text: string; author: string } }
  export function bentoCells(input: { title: Photo | null; gallery: Photo[]; facts: Fact[]; quote?: { text: string; author: string } }): BentoCell[]
  // src/components/schwerpunkt/schwerpunkt-feature.tsx
  export function SchwerpunktFeature(props: { item: Schwerpunkt; index: number; title: Photo | null; gallery: Photo[] }): JSX.Element
  ```

- [ ] **Step 1: Unit-Tests `bento.unit.spec.ts`**
  - 0 Fotos: keine `photo`-Zellen; alle Fakten und das Zitat enthalten.
  - Nur Titelfoto: erste Zelle `{ kind: 'photo', size: 'large' }`, src = Titelfoto.
  - Titelfoto null, Galerie [A, B]: erste Zelle ist A als `large`, B als `small`.
  - Titelfoto A, Galerie [A, B, C, D]: A erscheint genau einmal (Dedupe nach `src`); 4 Fotozellen.
  - Reihenfolge mit Titel + 4 Galerie + 3 Fakten + Zitat: `photo(large), fact, photo, quote, photo, fact, photo, fact, photo` (Fakten/Zitat werden zwischen die kleinen Fotos gestreut; übrig bleibende Fakten/Fotos kommen hinten an).
- [ ] **Step 2: Fehlschlag prüfen** — Run: `npx playwright test e2e/bento.unit.spec.ts` · Expected: FAIL
- [ ] **Step 3: `bentoCells` implementieren** (Reihenfolge wie im letzten Test; Galerie auf 6 begrenzen).
- [ ] **Step 4: Unit-Tests laufen lassen** — Expected: PASS
- [ ] **Step 5: E2E-Test `schwerpunkt.spec.ts` schreiben**
  - `/schwerpunkt` liefert 200; `section#sport`, `#makerspace`, `#abgekocht`, `#foerderung`, `#mehr` sichtbar, in dieser Reihenfolge.
  - In `#sport` ein Element `[data-bento]` mit mindestens einer `[data-bento-cell="fact"]`, Text „3 Std.“.
  - In `#makerspace`: `a[href="https://stuebi-makerspace.de/"]` mit `target="_blank"` und `rel` enthält `noopener`.
  - Titelfoto/Fallback: `#makerspace [data-bento-cell="photo"] img` sichtbar (ersetzt den alten Test in `photos.spec.ts`, der auf `[data-stage-photo]` prüfte).
  - `phone`-Projekt: `document.documentElement.scrollWidth <= window.innerWidth`.
- [ ] **Step 6: Fehlschlag prüfen** — Run: `npx playwright test e2e/schwerpunkt.spec.ts` · Expected: FAIL
- [ ] **Step 7: `SchwerpunktFeature` bauen** — `<section id={item.id} className="scroll-mt-20 md:scroll-mt-24 …">`: Farbband (Eyebrow „Schwerpunkt {index+1}“, `h2` Titel, Intro; Farbklassen wie `introColor` in `page-parts.tsx` für accent/mint/golden), `[data-bento]`-Grid `grid grid-cols-2 lg:grid-cols-4 auto-rows-[9rem] lg:auto-rows-[11rem] grid-flow-dense gap-3`, große Fotozelle `col-span-2 row-span-2`, Zitat `col-span-2`; jede Zelle mit `data-bento-cell={kind}`; Fotos `next/image fill` mit `sizes` (`large`: `(min-width:1024px) 50vw, 100vw`; `small`: `(min-width:1024px) 25vw, 50vw`); Fakten-Kacheln abwechselnd in Gold/Mint/Navy, Navy mit `dark:bg-white/15`. Darunter zwei Spalten: `points` (links), `howItWorks`, `partners`, `links` (rechts; externe Links mit `target`/`rel`/„↗“).
- [ ] **Step 8: Seite umbauen** — `schwerpunkt/page.tsx`: für jede id `title = toPhoto(img?.schwerpunkt?.[id]) ?? schwerpunktFallbacks[id]`, `gallery = toPhotos(img?.schwerpunkt?.[`${id}Galerie`])`; Reihenfolge PageIntro → drei `SchwerpunktFeature` → `PageSection id="foerderung"` (Foto `lernbuero.jpg` + bisheriger Text, zweispaltig) → `#mehr` unverändert. Alte `InfoCard`-Kacheln für Sport/Makerspace/Abgekocht entfernen.
- [ ] **Step 9: Ausgelieferten Stand prüfen, Tests laufen lassen** — Run: `curl -s localhost:3000/schwerpunkt | grep -c 'data-bento'` (≥ 3), dann `npx playwright test e2e/schwerpunkt.spec.ts e2e/bento.unit.spec.ts e2e/photos.spec.ts e2e/dark-mode.spec.ts` · Expected: PASS (`photos.spec.ts` ggf. nur die Schwerpunkt-Tests, falls die übrigen den Seed voraussetzen – dann im Bericht vermerken).
- [ ] **Step 10: Sichtprüfung** — Screenshots `/schwerpunkt` hell/dunkel bei 1280 px und 390 px; Galerie-Fall mit 4 Fotos lokal simulieren, indem `page.tsx` kurzzeitig `gallery` aus `schwerpunktFallbacks` füllt (nicht committen).
- [ ] **Step 11: Commit** — `feat(schwerpunkt): Bento-Abschnitte mit Galerie`

---

### Task 5: Startseite – Farbkarten

**Files:**
- Modify: `src/components/landingpage/school-life-section.tsx` (Ansatz aus Branch `proto/besonderheiten-b`, Commit `87331d9`)
- Modify: `src/app/(site)/page.tsx` (nur falls die Foto-Props sich ändern)
- Test: `e2e/startseite-schwerpunkte.spec.ts`

**Interfaces:**
- Consumes: `schwerpunkte`, `schwerpunktOrder` (Task 2).
- Produces: `SchoolLifeSection({ photos }: { photos?: SchoolLifePhotos })` – Signatur unverändert.

- [ ] **Step 1: E2E-Test schreiben**
  - `/` → `#schulleben` enthält drei Links `a[href="/schwerpunkt#sport"]`, `#makerspace`, `#abgekocht` mit Texten „Sportteams“, „Makerspace“, „Abgekocht“.
  - `#schulleben` enthält keine `ul li` mehr (Stichpunkte entfernt) und keinen Text „Dirk Nowitzki“.
  - Klick auf die Sport-Karte → URL `/schwerpunkt#sport`; `section#sport` Top ≥ Höhe von `header` (nicht verdeckt).
- [ ] **Step 2: Fehlschlag prüfen** — Run: `npx playwright test e2e/startseite-schwerpunkte.spec.ts` · Expected: FAIL
- [ ] **Step 3: Implementieren** — Karten aus Prototyp B übernehmen; Daten (Titel, Teaser, Farbe, Icon) aus `schwerpunkte`; lokales `features`-Array und `teasers` entfernen; Textfarbe Weiß auf `accent`, `text-on-bright` auf `mint`/`golden`.
- [ ] **Step 4: Tests laufen lassen** — Run: `npx playwright test e2e/startseite-schwerpunkte.spec.ts e2e/navigation.spec.ts e2e/dark-mode.spec.ts` · Expected: PASS
- [ ] **Step 5: Commit** — `feat(startseite): Besonderheiten als Farbkarten mit Link zur Schwerpunkt-Seite`

---

### Task 6: Aufräumen und Gesamtprüfung

**Files:** keine Code-Dateien

- [ ] **Step 1: Prototyp entfernen** — Server auf Port 3002 stoppen; `git worktree remove ../stuebi-besonderheiten-b`; `git branch -D proto/besonderheiten-b`; Mockup-Server mit `scripts/stop-server.sh` beenden.
- [ ] **Step 2: Gesamtprüfung** — Run: `npm run lint && npx tsc --noEmit && npx playwright test` · Expected: 0 Lint-Fehler, alle Tests grün außer solchen, die den Fixture-Seed voraussetzen (diese einzeln im Bericht nennen).
- [ ] **Step 3: Bericht an den Nutzer** — was geändert wurde, Migration ausgeführt (Name), offene Punkte (Galerie-Fotos im CMS hochladen). Push nur auf Nachfrage.
