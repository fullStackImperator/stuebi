# Zugänge zur Website

Diese Liste zeigt jeden Zugang, den die Website braucht: was er ist, wo man ihn findet, wer ihn hat und wie man ihn
zurückbekommt. **Passwörter und Schlüssel stehen hier nie** – das Repo ist öffentlich.

## Wo die Passwörter liegen

In einer **KeePassXC-Datei** (`stuebi-website.kdbx`) im **Admin-Ordner auf IServ**, den nur die Admins sehen.
Die Datei ist verschlüsselt; ohne das Master-Passwort ist sie wertlos.

- KeePassXC ist kostenlos: <https://keepassxc.org> (Mac, Windows, Linux).
- Das **Master-Passwort kennen mindestens zwei Personen**, eine davon aus der Schulleitung. Es wird nur persönlich
  oder auf Papier weitergegeben, nie per Mail oder IServ-Nachricht.
- Nach jeder Änderung die Datei auf IServ ersetzen; keine Kopien per Mail.

Die Spalte „Eintrag“ nennt den Namen des Eintrags in dieser Datei.

## Die Zugänge

| Was | Wofür | Wo | Eintrag | Wer hat Zugriff | Zurücksetzen, wenn alles weg ist |
|---|---|---|---|---|---|
| **netcup-Kundenkonto** | Server bezahlen, Vertrag, AV-Vertrag (abgeschlossen 19.11.2026), Rechnungen | <https://www.customercontrolpanel.de> | netcup Kundenkonto | Stevan Veljovic | „Passwort vergessen“ an die hinterlegte Mail; netcup-Support mit Kundennummer |
| **netcup-Server-Panel** | Server neu starten, Browser-Konsole, Root-Passwort neu setzen, Neuinstallation | <https://www.servercontrolpanel.de> | netcup Server-Panel | Stevan Veljovic | Zugangsdaten im Kundenkonto unter „Produkte“ |
| **SSH-Schlüssel (Root)** | Am Server arbeiten (`docs/betrieb.md`) | Datei `~/.ssh/stuebi_netcup` auf Stevans Mac | – (liegt nur auf dem Mac) | Stevan Veljovic | Notfall-Schlüssel nehmen oder Notfallweg unten |
| **SSH-Notfall-Schlüssel (Root)** | Wie oben, wenn Stevans Mac fehlt | nur in der KeePassXC-Datei (Anhang) | SSH Notfall-Schlüssel | alle mit dem Master-Passwort | Notfallweg unten |
| **SSH-Deploy-Schlüssel** | GitHub spielt neue Versionen ein; darf nur den Datenbank-Tunnel öffnen | GitHub-Secret `DEPLOY_SSH_KEY`, öffentlicher Teil in `/home/deploy/.ssh/authorized_keys` | SSH Deploy-Schlüssel | GitHub-Repo-Owner | Neuen Schlüssel erzeugen, mit `deploy/server-setup.sh <key.pub>` eintragen, Secret ersetzen |
| **Server-Geheimnisse** | Datenbank-Passwort, `PAYLOAD_SECRET` | `/srv/stuebi/.env` auf dem Server; Kopie in den GitHub-Secrets `BUILD_DATABASE_URL`, `PAYLOAD_SECRET` | Server .env | Root am Server | Am Server lesen (`cat /srv/stuebi/.env`) |
| **Bytecamp-Kundenkonto** | Domain `stuebi-hamburg.de`, DNS, E-Mail-Postfächer | <https://mein.bytecamp.net> | Bytecamp Kundenkonto | Stevan Veljovic, Matthias Herpe | <https://mein.bytecamp.net/passwort.php> – der Link geht an die hinterlegte Mail (Herr Herpe) |
| **Bytecamp-E-Mail** | Postfächer `postmaster@` (Pflicht, leer) und `webmaster@stuebi-hamburg.de`; später Absender für CMS-Mails | <https://mail.bytecamp.net> | Bytecamp webmaster | Stevan Veljovic | Im Bytecamp-Webmail-Panel (E-Mail-Konten → Passwort ändern) |
| **Bytecamp-FTP** | Dateien der alten WordPress-Seite | `ftp.bytecamp.net` (nur FTPS) | Bytecamp FTP | Stevan Veljovic | Im Bytecamp-Kundenkonto neu setzen. Entfällt, wenn das Paket verkleinert ist |
| **Bytecamp-MySQL** (2 Nutzer) | Datenbanken der alten WordPress-Seite | `mysql5.bytecamp.net` | Bytecamp MySQL 1 / 2 | Stevan Veljovic | Im Bytecamp-Kundenkonto. Entfällt mit dem alten Paket |
| **GitHub-Repo** | Quellcode, automatischer Deploy, Secrets | <https://github.com/fullStackImperator/stuebi> | GitHub | Stevan Veljovic (Owner) | Über GitHub-Konto des Owners. **Vor der Übergabe in eine Organisation der Schule verschieben und eine zweite Person als Owner eintragen** |
| **GitHub-Secrets und -Variable** | `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`, `BUILD_DATABASE_URL`, `PAYLOAD_SECRET`; Variable `SITE_URL` | Repo → Settings → Secrets and variables → Actions | – (Werte stehen in den Einträgen oben) | Repo-Owner | Neu setzen aus den Einträgen oben |
| **CMS-Admins** | Inhalte, Nutzer anlegen | <https://stuebi-hamburg.de/admin> | CMS Admin (je Person) | je Person selbst | Ein anderer Admin setzt das Passwort unter „Users“ neu |
| **Google Search Console** | Google findet die Seite, Fehlerberichte | <https://search.google.com/search-console> | Google Search Console | noch offen | Über das Google-Konto der Schule |
| **Uptime-Check** | Mail, wenn die Seite nicht erreichbar ist | UptimeRobot (noch einzurichten) | UptimeRobot | noch offen | „Passwort vergessen“ |
| **Neon** (nur bis zur Löschung) | Alte Datenbank, Rückfall in den ersten zwei Wochen nach dem Umzug | <https://console.neon.tech> | Neon | Stevan Veljovic | Wird nach dem Umzug gelöscht |
| **Vercel** (Vorschau) | Alte Vorschau `stuebi-ten.vercel.app` | <https://vercel.com> | Vercel | Stevan Veljovic | Wird abgeschaltet oder bleibt Vorschau |

Das HTTPS-Zertifikat braucht keinen Zugang: Caddy holt es bei Let's Encrypt selbst und erneuert es automatisch.

## Notfall: kein SSH-Schlüssel mehr da

1. Im **netcup-Server-Panel** den Server öffnen → **Allgemein** (bzw. „Zugangsdaten“) → **Root-Passwort neu setzen**.
2. Im Server-Panel die **Konsole** (Bildschirm im Browser) öffnen und als `root` mit dem neuen Passwort anmelden.
3. Einen neuen öffentlichen Schlüssel eintragen: `nano /root/.ssh/authorized_keys`, Zeile einfügen, speichern.
4. Danach wieder nur mit Schlüssel arbeiten. Das Passwort-Login per SSH bleibt aus (`/etc/ssh/sshd_config.d/10-stuebi.conf`);
   die Browser-Konsole geht trotzdem.

## Wenn jemand die Schule verlässt

- Seine CMS-Konten löschen (`/admin` → Users).
- Seinen SSH-Schlüssel aus `/root/.ssh/authorized_keys` entfernen.
- Bei Bytecamp, netcup und GitHub die eigene Mail-Adresse durch eine der Schule ersetzen und sich als Kontakt austragen.
- Das Master-Passwort der KeePassXC-Datei ändern.
