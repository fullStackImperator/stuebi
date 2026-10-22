# Schutz des CMS-Logins vor Brute-Force-Angriffen

Die alte WordPress-Seite wurde per Brute Force auf `wp-login.php` angegriffen; Wordfence hat geholfen. Dieses Dokument beschreibt, was die neue Seite selbst mitbringt und was beim Hosting zusätzlich eingerichtet werden sollte. Mehrere Schichten ergänzen sich – keine ist allein ausreichend.

## 1. Was die App selbst macht

| Schutz | Wo | Wirkung |
| --- | --- | --- |
| Konto-Sperre | `src/collections/Users.ts` (`maxLoginAttempts: 5`, `lockTime: 15 min`) | Nach 5 falschen Passwörtern ist das Konto 15 Minuten gesperrt. Gespeichert in der Datenbank, gilt also auch bei mehreren Server-Instanzen. |
| Rate Limit pro IP | `src/lib/auth-rate-limit.ts` | Login: max. 10 Versuche pro IP in 15 Minuten. Passwort vergessen: max. 5 pro IP und 3 pro E-Mail-Adresse pro Stunde (verhindert Mail-Bombing). Antwort: HTTP 429. Gilt für Admin-UI, REST (`/api/users/login`) und GraphQL (`/graphql`). Ein erfolgreicher Login setzt den IP-Zähler zurück. |
| Keine offene Registrierung | `Users.access.create` | Nur Admins legen Konten an. Den allerersten Admin legt man über `/admin` an; das geht nur, solange die Tabelle leer ist. |
| Kurzlebige Reset-Links | `forgotPassword.expiration: 30 min` | Passwort-Reset-Links verfallen nach 30 Minuten. |
| Sichere Cookies | `cookies.secure` in Produktion, `sameSite: Lax` | Login-Cookie nur über HTTPS. |
| Logging | `payload.logger.warn("Auth rate limit hit …")` | Blockierte Versuche erscheinen im Server-Log (für fail2ban oder Monitoring). |

### Umgebungsvariablen

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `AUTH_CLIENT_IP_HEADER` | – | Header mit der echten Client-IP, wenn ein Proxy/CDN ihn setzt, z. B. `cf-connecting-ip` (Cloudflare) oder `x-real-ip`. Ohne Angabe wird der **letzte** Eintrag von `X-Forwarded-For` genutzt. |
| `AUTH_RATE_LIMIT_DISABLED` | – | `true` schaltet das IP-Rate-Limit ab (nur für Tests). Die Konto-Sperre bleibt aktiv. |

### Grenzen

- **Die IP-Erkennung ist nur sicher, wenn der Next.js-Server ausschließlich über den Reverse Proxy erreichbar ist.** Ist Port 3000 direkt aus dem Internet erreichbar, kann ein Angreifer `X-Forwarded-For` fälschen. Deshalb: `next start -H 127.0.0.1` bzw. Docker-Port nur an `127.0.0.1` binden.
- Das IP-Rate-Limit liegt im Arbeitsspeicher eines Node-Prozesses. Bei einem Neustart wird es zurückgesetzt; bei mehreren Instanzen (z. B. Serverless/Vercel) zählt jede Instanz für sich. Dann übernimmt das Rate Limit am Proxy/CDN (Abschnitt 2–4) diese Aufgabe.
- Die Konto-Sperre kann von einem Angreifer, der die E-Mail-Adresse eines Redakteurs kennt, absichtlich ausgelöst werden (max. 15 Minuten Sperre). Deshalb: Admin-E-Mail-Adressen nicht öffentlich auf der Website nennen. Ein Admin kann ein gesperrtes Konto in `/admin` unter „Users“ sofort entsperren.

## 2. Reverse Proxy (bei eigenem Server / VPS)

Vor die App gehört ein Reverse Proxy, der HTTPS terminiert und zusätzlich drosselt.

### Caddy (einfachste Variante, automatisches HTTPS)

```caddyfile
www.stuebi.de {
  reverse_proxy 127.0.0.1:3000
}
```

Caddy setzt `X-Forwarded-For` korrekt. Für Rate Limiting in Caddy braucht man das Plugin `caddy-ratelimit`; alternativ übernimmt das die App (Abschnitt 1) plus fail2ban (Abschnitt 3).

### nginx

```nginx
# /etc/nginx/conf.d/stuebi-ratelimit.conf
limit_req_zone $binary_remote_addr zone=stuebi_auth:10m rate=5r/m;

server {
  listen 443 ssl http2;
  server_name www.stuebi.de;
  # ssl_certificate … (z. B. per certbot)

  location ~ ^/api/users/(login|forgot-password|reset-password|unlock|first-register)$ {
    limit_req zone=stuebi_auth burst=5 nodelay;
    limit_req_status 429;
    proxy_pass http://127.0.0.1:3000;
    include /etc/nginx/proxy_params;
  }

  location = /graphql {
    limit_req zone=stuebi_auth burst=20 nodelay;
    limit_req_status 429;
    proxy_pass http://127.0.0.1:3000;
    include /etc/nginx/proxy_params;
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    include /etc/nginx/proxy_params;
  }
}
```

`/etc/nginx/proxy_params` muss `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` und `proxy_set_header X-Forwarded-Proto $scheme;` enthalten (bei Debian/Ubuntu Standard).

Optional, sehr wirksam bei nur zwei Redakteuren: `/admin` nur aus bestimmten Netzen erlauben (z. B. Schul-IP) mit `allow …; deny all;`. Das schränkt aber das Arbeiten von zu Hause ein.

## 3. fail2ban (bei eigenem Server)

fail2ban sperrt IPs, die wiederholt auffallen, für längere Zeit direkt in der Firewall – das entspricht am ehesten dem, was Wordfence bei WordPress getan hat.

```ini
# /etc/fail2ban/filter.d/stuebi-login.conf
[Definition]
failregex = ^<HOST> .* "POST /api/users/(login|forgot-password) HTTP/[0-9.]+" (401|429)
            ^<HOST> .* "POST /graphql HTTP/[0-9.]+" 429
ignoreregex =
```

```ini
# /etc/fail2ban/jail.d/stuebi.conf
[stuebi-login]
enabled  = true
port     = http,https
filter   = stuebi-login
logpath  = /var/log/nginx/access.log
maxretry = 10
findtime = 10m
bantime  = 24h
```

Testen mit `fail2ban-regex /var/log/nginx/access.log /etc/fail2ban/filter.d/stuebi-login.conf`, Status mit `fail2ban-client status stuebi-login`. Die Schul-IP am besten in `ignoreip` eintragen, damit sich niemand aussperrt. Läuft die Seite hinter Cloudflare, sieht nginx nur Cloudflare-IPs – dann fail2ban nicht nutzen (oder vorher `real_ip_header CF-Connecting-IP` einrichten) und auf Abschnitt 4 setzen.

## 4. Cloudflare (kostenloser Plan, unabhängig vom Hoster)

Wenn die Domain über Cloudflare läuft:

1. **Cloudflare Access (Zero Trust, bis 50 Nutzer kostenlos)** vor `/admin*`, `/api/users*` und `/graphql*` schalten, mit Login per Einmal-Code an die zwei erlaubten E-Mail-Adressen. Angreifer erreichen das Payload-Login dann gar nicht mehr. **Nicht** ganz `/api*` schützen: Bilder werden unter `/api/media/file/…` öffentlich ausgeliefert.
2. **Rate-Limiting-Regel** (WAF → Rate limiting rules, im Free-Plan eine Regel): URI-Pfad beginnt mit `/api/users/login`, Methode `POST`, 5 Anfragen pro 10 Sekunden → Block.
3. In der App `AUTH_CLIENT_IP_HEADER=cf-connecting-ip` setzen und den Server nur Cloudflare-IPs annehmen lassen (Firewall), sonst ist der Header fälschbar.

## 5. Managed Hosting (Vercel, Netlify, …)

Dort läuft die App auf vielen kurzlebigen Instanzen; das IP-Limit im Arbeitsspeicher greift nur eingeschränkt. Die Konto-Sperre (Datenbank) wirkt weiterhin. Zusätzlich die Firewall/Rate-Limit-Funktion des Hosters für `/api/users/login` und `/graphql` aktivieren oder Cloudflare (Abschnitt 4) vorschalten.

## 6. Organisatorisches

- Lange, einzigartige Passwörter (Passwort-Manager) für beide Redakteure.
- Admin-E-Mail-Adressen nicht auf der Website veröffentlichen.
- `PAYLOAD_SECRET` lang und zufällig (`openssl rand -hex 32`), niemals committen.
- Payload und Next.js regelmäßig aktualisieren.
- Server-Log gelegentlich nach `Auth rate limit hit` durchsuchen.

## 7. Ausblick

- **Zwei-Faktor-Authentifizierung (TOTP)**: geplant als eigener PR, erfordert ein Update auf Payload ≥ 3.88 (Plugin `payload-totp`).
- **IServ-Login (OIDC)**: Wenn die Redakteure sich über IServ anmelden, kann der Passwort-Login in Payload abgeschaltet werden (`auth.disableLocalStrategy` bzw. nur noch als Notfall-Admin). Dann gibt es kein Payload-Passwort mehr, das man erraten könnte, und IServ übernimmt Sperren und ggf. 2FA. Das Rate Limit in `src/lib/auth-rate-limit.ts` bleibt für einen Notfall-Admin sinnvoll.
