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
3. Als Anwendungsfall *Nachrichten und Inhalte auf Instagram verwalten* wählen.
4. Meta verlangt für den Instagram-Login ein **Business-Portfolio** (kostenlos, keine Zahlungsdaten): bei
   *API setup with Unified login* auf *+ Business-Portfolio* → *Neues Business-Portfolio erstellen* → Name
   „Stadtteilschule Stübenhofer Weg“, eigener Name, E-Mail → erstellen und mit der App verknüpfen.
5. Die App **im Entwicklungsmodus lassen**. Eine App-Prüfung durch Meta ist nicht nötig, weil die App nur den
   eigenen Account liest.

## 3. Schul-Account als Tester einladen

1. Im App-Dashboard: *App-Rollen* → *Rollen* → *Personen hinzufügen* → Rolle **Instagram-Tester** →
   `stuebibloggt` eintragen.
2. **Betreuungsperson:** Im Browser als stuebibloggt einloggen und
   [instagram.com/accounts/manage_access/](https://www.instagram.com/accounts/manage_access/) öffnen →
   Reiter *Tester-Einladungen* → annehmen. In der Handy-App erscheint die Einladung oft nicht.

## 4. Token erzeugen und eintragen (zusammen)

1. Im App-Dashboard: *Anwendungsfälle* → Instagram → *Anpassen* → *API setup with Unified login*.
   Unter „Berechtigungen und Features“ muss nichts hinzugefügt werden.
2. Bei *2. Zugriffstokens generieren* → *Konto hinzufügen* → mit dem Instagram-Login von stuebibloggt anmelden.
3. Bei *1. Deine App konfigurieren* → *Neue Konfiguration erstellen*: Systemnutzer-Zugriffstoken, Ablauf „Nie“,
   Asset „Instagram-Konto“, Berechtigungen so wenige wie möglich (gebraucht wird nur `instagram_basic`).
   Weiterleitungs-URL bleibt leer. Die Konfiguration auswählen.
4. Bei stuebibloggt auf *Token generieren* klicken und den Token kopieren. Dieser Systemnutzer-Token („EAA…“)
   läuft nie ab. Ein Instagram-Token („IGAA…“) aus dem älteren Weg funktioniert ebenfalls und wird alle 60 Tage
   automatisch erneuert.
5. Im CMS (`/admin`) als Admin: *Instagram* → Token einfügen → *Speichern*. Die Posts erscheinen sofort.
   Das Feld „Instagram-Konto-ID“ bleibt für @stuebibloggt leer.

Meta benennt Menüpunkte gelegentlich um. Wenn ein Punkt anders heißt, nach „Instagram-Login“ bzw. „Token“ suchen.

## Danach

- Die Webseite holt die Posts höchstens einmal pro Stunde. Ein Instagram-Token („IGAA…“) wird jede Woche
  selbst erneuert, ein Systemnutzer-Token („EAA…“) läuft gar nicht ab. Niemand muss etwas tun.
- Die Bilder werden über unseren eigenen Server ausgeliefert (`/instagram-bild/…`). Besucher*innen laden
  nichts direkt von Instagram, die Aussage in der Datenschutzerklärung bleibt richtig.
- Im CMS unter *Instagram* stehen „Läuft ab am“ und „Letzter Fehler“. Liegt das Ablaufdatum in der Vergangenheit
  (z. B. weil das Insta-Passwort geändert wurde), Schritt 4 wiederholen.
- Optional: `NEXT_PUBLIC_INSTAGRAM_URL` setzt einen anderen Profil-Link (Standard: `https://www.instagram.com/stuebibloggt/`).
