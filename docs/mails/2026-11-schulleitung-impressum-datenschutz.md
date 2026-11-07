# Entwurf: Mail an die Schulleitung – Impressum und Datenschutz

Noch nicht verschickt. Die Punkte stehen auch in `docs/offene-fragen.md` → „Impressum & Datenschutz“; wenn sie
geklärt sind, dort löschen und `src/content/rechtliches.ts` anpassen.

---

**An:** Matthias Herpe
**Betreff:** Neue Website – bitte Impressum und Datenschutzerklärung prüfen

Lieber Herr Herpe,

für die neue Website habe ich Impressum und Datenschutzerklärung vorbereitet. Sie sind hier zu sehen:

- Impressum: https://stuebi-ten.vercel.app/impressum
- Datenschutz: https://stuebi-ten.vercel.app/datenschutz

Auf der alten Seite stand im Impressum nur „V.i.S.d.P. Bildungszentrum Stübenhofer Weg“ mit der alten Anschrift
(Nr. 20), die Datenschutzseite war leer. Beides habe ich neu aufgesetzt. Bevor die Seite online geht, bräuchte ich
Ihre Rückmeldung zu diesen Punkten:

1. **Sie als Verantwortlicher:** Im Impressum nenne ich Sie als Schulleiter, der die Schule vertritt, und als
   Verantwortlichen für den Inhalt (§ 18 Abs. 2 Medienstaatsvertrag). Ist das so in Ordnung?
2. **Datenschutzbeauftragte(r):** Wer ist für unsere Schule die bzw. der Datenschutzbeauftragte bei der BSFB, und
   welche Kontaktdaten dürfen wir angeben? Bis dahin verweist die Erklärung auf das Schulbüro.
3. **Anschrift der Behörde:** Als Aufsichtsbehörde steht „Behörde für Schule, Familie und Berufsbildung, Hamburger
   Straße 31, 22083 Hamburg“. Stimmt die Anschrift nach der Umbenennung noch?
4. **Fotos:** Gibt es Fotos auf der Seite, deren Fotografin oder Fotograf namentlich genannt werden muss? Und liegen
   für alle Fotos, auf denen Kinder gut zu erkennen sind, die Einwilligungen der Eltern vor?
5. **Prüfung:** Die Texte sind ein sorgfältiger Entwurf, aber keine Rechtsberatung. Könnte die bzw. der
   Datenschutzbeauftragte einmal darüber schauen, vor allem über die Rechtsgrundlagen?

Zur Einordnung: Die neue Seite setzt keine Cookies, nutzt kein Tracking, bettet keine Dienste wie Facebook,
YouTube oder Google Maps ein und hat keine Formulare. Deshalb ist die Datenschutzerklärung recht kurz.

Vielen Dank und viele Grüße
Stevan Veljovic

---

**Für uns, nach der Antwort:**

- Schulleiter/V.i.S.d.P.: `principal` in `src/content/rechtliches.ts`
- Datenschutzbeauftragte(r): `datenschutz` → „Verantwortliche Stelle“
- Behördenanschrift: `impressum` → „Aufsichtsbehörde“
- Bildnachweis: `impressum` → „Urheberrecht“
- Beim Umzug zu Hetzner: `hosting` und der Satz zur Übermittlung in die USA
