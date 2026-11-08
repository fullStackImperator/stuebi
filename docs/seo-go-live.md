# Leitfaden: Umzug der Website auf stuebi-hamburg.de

Die neue Website ersetzt die alte WordPress-Seite unter derselben Adresse. Damit Google die Schule weiter
findet und alte Links funktionieren, sind vor und nach dem Umzug ein paar Schritte nötig. Technisch ist alles
vorbereitet: Alle 287 Adressen der alten Seite leiten dauerhaft auf die passende neue Seite weiter.

## Vorher

### 1. Meistbesuchte alte Seiten abgleichen

In der [Google Search Console](https://search.google.com/search-console) (Konto der Schule) unter
**Leistung → Seiten** die Seiten der letzten zwölf Monate nach Klicks sortieren. Die ersten 30 Adressen mit der
Liste in `src/content/alte-seite-weiterleitungen.ts` vergleichen: Landet jede auf einer sinnvollen neuen
Seite? Fehlt eine Adresse, die nicht unter `/stadtteilschule/` liegt, bitte melden – sie wird nachgetragen.

Gibt es noch kein Search-Console-Konto, geht es mit Schritt 2 los; der Abgleich entfällt dann.

## Nach dem Umzug (am selben Tag)

### 2. Domain in der Search Console bestätigen

In der Search Console **Property hinzufügen → Domain** wählen und `stuebi-hamburg.de` eintragen. Google zeigt
einen TXT-Eintrag an; den trägt, wer die Domain verwaltet, im DNS ein. Danach auf **Bestätigen** klicken.

### 3. Sitemap einreichen

In der Search Console unter **Sitemaps** diese Adresse eintragen und senden:

`https://stuebi-hamburg.de/sitemap.xml`

Die Sitemap aktualisiert sich selbst, wenn neue Beiträge oder Seiten im CMS erscheinen.

### 4. Weiterleitungen stichprobenartig prüfen

Diese alten Adressen im Browser öffnen; jede muss auf der genannten neuen Seite landen:

| Alte Adresse | Neue Seite |
|---|---|
| `https://stuebi-hamburg.de/stadtteilschule/kontakt/beratung/bob-team/` | Beratung |
| `https://stuebi-hamburg.de/stadtteilschule/schulleben/ganztaegiges-lernen/mittagsessen/` | Ganztag, Abschnitt Mensa |
| `https://stuebi-hamburg.de/stadtteilschule/2026/08/25/wir-sind-1-klasse/` | Beitrag „Wir sind 1. Klasse!“ |

Außerdem prüfen: `https://stuebi-hamburg.de/robots.txt` enthält `Allow: /` und **nicht** `Disallow: /`.
Steht dort `Disallow: /`, war `NEXT_PUBLIC_SERVER_URL` beim **Bauen** der Seite nicht genau
`https://stuebi-hamburg.de` – dann findet Google die Seite nicht. Der Wert wird beim Bauen fest eingebaut:
Variable richtig setzen und die Seite **neu bauen**; nur den Server neu zu starten reicht nicht.

## In den Wochen danach

### 5. Bericht „Seiten“ beobachten

In der Search Console unter **Indexierung → Seiten** einmal pro Woche nach **Nicht gefunden (404)** schauen.
Taucht dort eine alte Adresse auf, bitte melden; sie bekommt eine Weiterleitung. Nach vier bis acht Wochen
hat Google die neuen Seiten übernommen.

### 6. Google-Unternehmensprofil aktualisieren

Im [Google-Unternehmensprofil](https://business.google.com) der Schule Website
(`https://stuebi-hamburg.de`), Telefon, Bürozeiten (Mo–Do 7:30–16:00 Uhr, Fr 7:30–13:30 Uhr) und aktuelle
Fotos prüfen. Das Profil erscheint bei der Suche nach „Stübi“ oder „Schule Stübenhofer Weg“ rechts neben
den Treffern und auf Google Maps.

Optional: Die Seite auch in den [Bing Webmaster Tools](https://www.bing.com/webmasters) anmelden; dort lässt
sich die Search Console importieren.
