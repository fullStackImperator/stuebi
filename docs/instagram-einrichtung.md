# Instagram-Posts auf der Startseite einrichten

Die Startseite zeigt die 6 neuesten Posts von [@stuebibloggt](https://www.instagram.com/stuebibloggt/).
Das ist kostenlos und nutzt die offizielle „Instagram API mit Instagram-Login“. Die Betreuungsperson des
Accounts braucht nur ihren normalen Instagram-Login. Einmal einrichten, ca. 20 Minuten, am besten zusammen.

Solange kein Token eingetragen ist, zeigt die Startseite manuell gepflegte Kacheln aus „Social highlights“
oder lässt den Block ganz weg.

## 1. Account auf „professionell“ umstellen (Betreuungsperson)

In der Instagram-App: Profil → Menü (☰) → *Kontotyp und Tools* → *Zu professionellem Konto wechseln* →
„Creator“ oder „Business“ wählen. Kostenlos, Posts und Follower bleiben erhalten.

## 2. Meta-App anlegen (Stiv, mit eigenem Facebook-/Meta-Konto)

1. Auf [developers.facebook.com](https://developers.facebook.com/) einloggen, einmalig als Entwickler registrieren.
2. *Meine Apps* → *App erstellen*. Name z. B. „Stübi Webseite“.
3. Als Anwendungsfall *Nachrichten und Inhalte auf Instagram verwalten* wählen. Ein Business-Portfolio ist nicht nötig.
4. Die App **im Entwicklungsmodus lassen**. Eine App-Prüfung durch Meta ist nicht nötig, weil die App nur den
   eigenen Account liest.

## 3. Schul-Account als Tester einladen

1. Im App-Dashboard: *App-Rollen* → *Rollen* → *Personen hinzufügen* → Rolle **Instagram-Tester** →
   `stuebibloggt` eintragen.
2. **Betreuungsperson:** Auf instagram.com (im Browser) einloggen → *Einstellungen* → *Apps und Websites* →
   *Tester-Einladungen* → annehmen.

## 4. Token erzeugen und eintragen (zusammen)

1. Im App-Dashboard: *Anwendungsfälle* → Instagram → *Anpassen* → *API-Einrichtung mit Instagram-Login* →
   *Zugriffstoken generieren* → *Konto hinzufügen*.
2. Die Betreuungsperson meldet sich mit dem normalen Instagram-Login an und erlaubt den Zugriff
   (es reicht die Berechtigung `instagram_business_basic`).
3. Den angezeigten Token kopieren.
4. Im CMS (`/admin`) als Admin: *Instagram* → Token einfügen → *Speichern*. Die Posts erscheinen sofort.

Meta benennt Menüpunkte gelegentlich um. Wenn ein Punkt anders heißt, nach „Instagram-Login“ bzw. „Token“ suchen.

## Danach

- Die Webseite holt die Posts höchstens einmal pro Stunde und erneuert den Token jede Woche selbst
  (ein Token gilt 60 Tage). Niemand muss etwas tun.
- Die Bilder werden über unseren eigenen Server ausgeliefert (`/instagram-bild/…`). Besucher*innen laden
  nichts direkt von Instagram, die Aussage in der Datenschutzerklärung bleibt richtig.
- Im CMS unter *Instagram* stehen „Läuft ab am“ und „Letzter Fehler“. Liegt das Ablaufdatum in der Vergangenheit
  (z. B. weil das Insta-Passwort geändert wurde), Schritt 4 wiederholen.
- Optional: `NEXT_PUBLIC_INSTAGRAM_URL` setzt einen anderen Profil-Link (Standard: `https://www.instagram.com/stuebibloggt/`).
