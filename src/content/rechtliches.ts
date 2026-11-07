import { schoolAddress, schoolEmail, schoolOffices } from './contacts'

// Impressum und Datenschutzerklärung. Quelle Impressum: alte Seite stuebi-hamburg.de/stadtteilschule/impressum
// (dort nur „V.i.S.d.P. Bildungszentrum Stübenhofer Weg“ und ein Haftungsausschluss; Matthias Herpe steht nur in
// den Metadaten). Die alte Datenschutzseite war leer: Die Erklärung beschreibt, was diese Seite tatsächlich tut
// (kein Tracking, keine Einbettungen, keine Formulare). Offene Punkte: docs/offene-fragen.md → „Impressum & Datenschutz“.

export type LegalSection = { heading: string; paragraphs?: string[]; lines?: string[]; list?: string[]; email?: string }

export const schoolName = 'Stadtteilschule Stübenhofer Weg'
export const principal = 'Matthias Herpe'
export const legalUpdated = 'November 2026'

// Wo die Seite liegt. Beim Umzug zu Hetzner hier und im Abschnitt „Server-Protokolle“ ändern.
const hosting = {
  name: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA',
  transfer:
    'Vercel ist nach dem EU-US Data Privacy Framework zertifiziert; die Übermittlung in die USA stützt sich auf den Angemessenheitsbeschluss der EU-Kommission.',
}

export const impressum: LegalSection[] = [
  {
    heading: 'Anbieter',
    lines: [schoolName, 'Staatliche Schule der Freien und Hansestadt Hamburg', ...schoolAddress.split(', ')],
    paragraphs: [`Die Schule wird vertreten durch den Schulleiter ${principal}.`],
  },
  {
    heading: 'Kontakt',
    lines: [`Telefon: ${schoolOffices.main.phone}`, `Schulbüro Primarstufe: ${schoolOffices.primary.phone}`],
    email: schoolEmail,
  },
  {
    heading: 'Aufsichtsbehörde',
    lines: ['Freie und Hansestadt Hamburg', 'Behörde für Schule, Familie und Berufsbildung', 'Hamburger Straße 31', '22083 Hamburg'],
  },
  {
    heading: 'Verantwortlich für den Inhalt',
    paragraphs: [`Verantwortlich für den Inhalt nach § 18 Abs. 2 Medienstaatsvertrag: ${principal}, Schulleiter, Anschrift wie oben.`],
  },
  {
    heading: 'Haftung für Inhalte',
    paragraphs: [
      'Wir stellen die Inhalte dieser Seite mit Sorgfalt zusammen. Für Richtigkeit, Vollständigkeit und Aktualität können wir trotzdem keine Gewähr übernehmen. Wenn Ihnen ein Fehler auffällt, schreiben Sie uns gern.',
    ],
  },
  {
    heading: 'Haftung für Links',
    paragraphs: [
      'Diese Seite verlinkt auf Seiten anderer Anbieter, zum Beispiel IServ, den Stübi-Makerspace oder MensaMax. Für deren Inhalte sind allein die jeweiligen Anbieter verantwortlich. Bei der Verlinkung waren keine Rechtsverstöße erkennbar; werden uns welche bekannt, entfernen wir den Link.',
    ],
  },
  {
    heading: 'Urheberrecht',
    paragraphs: [
      'Texte, Fotos und Grafiken auf dieser Seite stammen von der Schule oder werden mit Erlaubnis genutzt. Eine Vervielfältigung oder Verwendung außerhalb dieser Seite ist ohne ausdrückliche Zustimmung nicht gestattet.',
      'Fotos: Schule Stübenhofer Weg, Schulbroschüre und Archiv der Schule.',
    ],
  },
]

export const datenschutz: LegalSection[] = [
  {
    heading: 'Verantwortliche Stelle',
    lines: [schoolName, ...schoolAddress.split(', '), `Telefon: ${schoolOffices.main.phone}`],
    email: schoolEmail,
    paragraphs: [
      `Vertreten durch den Schulleiter ${principal}.`,
      'Fragen zum Datenschutz richten Sie bitte an das Schulbüro. Wir leiten sie an die zuständige Datenschutzbeauftragte bzw. den zuständigen Datenschutzbeauftragten der Behörde für Schule, Familie und Berufsbildung weiter.',
    ],
  },
  {
    heading: 'Das Wichtigste in Kürze',
    list: [
      'Diese Seite setzt keine Cookies und nutzt keine Analyse- oder Werbedienste.',
      'Es gibt keine eingebetteten Inhalte von Facebook, Instagram, YouTube oder Google. Schriften liegen auf unserem eigenen Server.',
      'Es gibt keine Formulare. Wenn Sie uns schreiben, geschieht das per E-Mail.',
      'Beim Aufruf entstehen nur die technisch nötigen Server-Protokolle.',
    ],
  },
  {
    heading: 'Server-Protokolle',
    paragraphs: [
      `Die Seite wird betrieben bei ${hosting.name}. Bei jedem Aufruf verarbeitet der Server automatisch: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, die Seite, von der Sie kommen, sowie Browser und Betriebssystem. Diese Daten brauchen wir, um die Seite sicher und zuverlässig auszuliefern. Wir werten sie nicht aus und führen sie nicht mit anderen Daten zusammen; sie werden nach kurzer Zeit automatisch gelöscht.`,
      hosting.transfer,
      'Rechtsgrundlage ist Art. 6 Abs. 1 lit. e DSGVO in Verbindung mit dem Hamburgischen Datenschutzgesetz: Die Information der Öffentlichkeit über die Schule gehört zu unseren Aufgaben.',
    ],
  },
  {
    heading: 'Keine Cookies, kein Tracking',
    paragraphs: [
      'Diese Seite setzt keine Cookies und verfolgt nicht, wie Sie sie nutzen. Nur wenn Sie zwischen hellem und dunklem Design wechseln, merkt sich Ihr Browser diese Wahl im lokalen Speicher (localStorage). Diese Angabe verlässt Ihr Gerät nicht und lässt sich in den Browser-Einstellungen löschen. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG, weil Sie diese Funktion selbst auswählen.',
    ],
  },
  {
    heading: 'Kontakt per E-Mail',
    paragraphs: [
      'Wenn Sie uns eine E-Mail schreiben, verarbeiten wir Ihre Adresse und Ihre Nachricht, um Ihr Anliegen zu bearbeiten. Die E-Mail geht an das Postfach der Schule bei der Behörde für Schule, Familie und Berufsbildung. Wir löschen die Daten, wenn sie für die Bearbeitung nicht mehr gebraucht werden und keine Aufbewahrungspflichten bestehen.',
    ],
  },
  {
    heading: 'Links und Routenplanung',
    paragraphs: [
      'Links zu anderen Seiten, etwa zu IServ, zum Stübi-Makerspace, zu MakerLand oder MensaMax, öffnen erst beim Anklicken die Seite des jeweiligen Anbieters. Ab dann gilt dessen Datenschutzerklärung.',
      'Der Knopf „Route planen“ öffnet Google Maps in einem neuen Fenster. Vorher werden keine Daten an Google übertragen; danach gilt die Datenschutzerklärung von Google.',
    ],
  },
  {
    heading: 'Redaktion',
    paragraphs: [
      'Lehrkräfte und die Schulleitung pflegen die Inhalte in einem eigenen Redaktionsbereich. Dafür melden sie sich an; ihr Browser speichert dann ein technisch nötiges Anmelde-Cookie. Besucherinnen und Besucher der Seite betrifft das nicht.',
    ],
  },
  {
    heading: 'Fotos',
    paragraphs: [
      'Fotos, auf denen Schülerinnen, Schüler oder Beschäftigte zu erkennen sind, veröffentlichen wir nur mit ihrer Einwilligung, bei Minderjährigen mit der Einwilligung der Sorgeberechtigten (Art. 6 Abs. 1 lit. a DSGVO). Die Einwilligung lässt sich jederzeit für die Zukunft widerrufen; eine kurze Nachricht an das Schulbüro genügt. Wir entfernen das Foto dann von der Seite.',
    ],
  },
  {
    heading: 'Ihre Rechte',
    paragraphs: ['Sie haben das Recht,'],
    list: [
      'Auskunft über die zu Ihnen gespeicherten Daten zu erhalten (Art. 15 DSGVO),',
      'falsche Daten berichtigen zu lassen (Art. 16 DSGVO),',
      'Ihre Daten löschen oder ihre Verarbeitung einschränken zu lassen (Art. 17 und 18 DSGVO),',
      'der Verarbeitung zu widersprechen (Art. 21 DSGVO) und',
      'eine Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO).',
    ],
  },
  {
    heading: 'Beschwerderecht',
    paragraphs: [
      'Sie können sich bei der Aufsichtsbehörde für den Datenschutz beschweren: Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit, Ludwig-Erhard-Straße 22, 20459 Hamburg.',
    ],
  },
]
