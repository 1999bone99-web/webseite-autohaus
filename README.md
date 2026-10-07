# Marhoffer – Webseite (Design-Prototyp)

Neuentwurf der Webseite für die **bmw-jw-marhoffer GmbH** in Mühlhausen (Kraichgau),
Spezialist für BMW Halbjahres- und Jahreswagen seit 1988.

## Stack

| Bereich | Bibliothek |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Turbopack) |
| UI-Controls | shadcn/ui (Radix), Tailwind CSS v4, lucide-react |
| Formulare | react-hook-form, zod, Server Actions |
| Filter im URL | nuqs |
| Merkliste / Vergleich | zustand (persistiert im Browser) |
| Karussell | embla-carousel (über shadcn) |
| Suche | cmdk (über shadcn `Command`, `⌘K`) |
| Kalender | react-day-picker, date-fns |
| Hinweise | sonner |
| Rechtstexte | react-markdown, remark-gfm, @tailwindcss/typography |
| Dark Mode | next-themes |

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Designidee

Die Zielgruppe sucht einen gut ausgestatteten BMW und will beim Preis klug sein. Darum steht das
Kernversprechen des Hauses (bis zu 45 % unter Neupreis) überall sichtbar im Mittelpunkt:

- **Ersparnis-Balken** an jedem Fahrzeug: Abstand zum Listenneupreis statt nur ein Preis.
- **Datenblatt-Optik**: technische Werte (EZ, km, PS) in Geist Mono, viel Weißraum, ein einziger blauer Akzent.
- **Schnellsuche im Hero** mit Live-Trefferzahl, **⌘K-Suche** über Bestand und alle Seiten.
- **Vergleich** bis 3 Fahrzeuge mit hervorgehobenen Bestwerten, **Merkliste** ohne Konto.
- **Finanzierungsrechner** (Beispielrechnung) und **Suchauftrag** als Ausweg, wenn nichts passt.
- Telefon an jeder Stelle erreichbar, auf Mobil eine feste Aktionsleiste auf der Fahrzeugseite.
- Hell und dunkel.

## Seiten

| Bereich | Seiten |
| --- | --- |
| Fahrzeuge | `/fahrzeuge`, `/fahrzeuge/[id]`, `/wunschfahrzeug`, `/probefahrt`, `/finanzierung`, `/inzahlungnahme`, `/vergleich`, `/merkliste` |
| Service | `/werkstatt` (inkl. Servicetermin `#termin`), `/glasreparatur`, `/komplettraeder`, `/mietwagen` |
| Unternehmen | `/ueber-uns`, `/ansprechpartner`, `/karriere`, Kundenstimmen (Link zu mobile.de) |
| Kontakt | `/kontakt` (inkl. Anfahrt `#anfahrt`, Rückruf über `?anliegen=rueckruf`) |
| Rechtliches | `/impressum`, `/datenschutz`, `/agb`, `/nutzungsbestimmungen`, `/barrierefreiheit` |

Alte Adressen der bisherigen Seite (z. B. `/kontakt/impressum`, `/service/werkstatt`) werden per
301/308 auf die neuen Seiten umgeleitet (`next.config.ts`).

## Inhalte

Texte, Ansprechpartner, Kompletträder, Mietwagen und Rechtstexte stammen von www.bmw-jw-marhoffer.de
(Stand 07.10.2026):

- `src/lib/content.ts` – Team, Werkstattleistungen, Finanzierung, Mietwagen, Kompletträder, Stellen
- `src/content/rechtliches/*.md` – Rechtstexte. Impressum, AGB und Nutzungsbestimmungen wörtlich übernommen,
  Datenschutz und Barrierefreiheit für die neue Seite überarbeitet (Entwurf)
- `src/content/mietbedingungen.md`
- `public/images/…` – Bilder von der bisherigen Seite

## Fahrzeugbestand

Der Bestand stammt von www.bmw-jw-marhoffer.de und liegt in `src/data/vehicles.json`,
`src/data/equipment.json` und `src/data/stock-meta.json` (Abrufdatum, wird als „Stand“ angezeigt).
Fotos werden direkt vom Händlersystem (`www.webauto.de/imgcars/…`) geladen. Ohne Fotos zeigt die Seite
eine ruhige Fläche mit Baureihe und Lackfarbe.

**Automatischer Abgleich:** Die GitHub Action `.github/workflows/bestand.yml` lädt den Bestand jeden Morgen
um 04:17 UTC neu und committet Änderungen auf `main`. Vercel baut danach automatisch. Von Hand starten:
GitHub → Actions → „Bestand abgleichen“ → Run workflow. Lokal:

```bash
bash scripts/bestand/fetch.sh
```

Sicherungen im Konverter (`scripts/bestand/convert.py`):
- Liefert die Quelle weniger als halb so viele Fahrzeuge wie bisher (Seite down, Layout geändert),
  bricht der Abgleich ab und der alte Bestand bleibt stehen. Die Action schlägt dann fehl und GitHub
  schickt eine Mail.
- Verbrauchsangaben über 25 l/100 km gelten als Tippfehler und werden nicht angezeigt
  (betrifft derzeit X5 30d mit 76,0 und XM 50e mit 34,0 l/100 km). Besser im Händlersystem korrigieren.
- „Bis zu … % unter Neupreis“ wird aus dem Bestand berechnet und ist auf `site.maxSavingPercent` (45) begrenzt.

## Formulare und Mailversand

Alle Formulare (Anfrage, Probefahrt, Rückruf, Suchauftrag, Finanzierung, Werkstatttermin, Inzahlungnahme)
laufen über Server Actions in `src/app/actions.ts` und werden per [Resend](https://resend.com) als E-Mail
verschickt (`src/lib/mail.ts`). Die Antwortadresse ist die des Kunden, „Antworten“ im Mailprogramm geht also
direkt an ihn. Ein unsichtbares Feld hält einfache Spam-Bots ab.

In Vercel unter Settings → Environment Variables setzen:

| Variable | Wert |
| --- | --- |
| `RESEND_API_KEY` | API-Schlüssel aus dem Resend-Konto |
| `MAIL_FROM` | Absender auf einer bei Resend verifizierten Domain, z. B. `Webseite <anfrage@bmw-jw-marhoffer.de>` |
| `MAIL_TO` | optional, Standard `info@bmw-jw-marhoffer.de` |

Ohne diese Variablen schreibt die Seite lokal den Mailinhalt ins Terminal. In der Produktion zeigt das
Formular dann eine Fehlermeldung mit Telefonnummer und E-Mail-Adresse, damit keine Anfrage verloren geht.

## Vor dem Livegang offen

- **Resend einrichten** (Konto, Domain verifizieren, Variablen in Vercel, siehe oben) und einmal jedes
  Formular testen.
- **Datenschutz und Barrierefreiheit** sind überarbeitete Entwürfe. Von einer fachkundigen Person prüfen lassen,
  Auftragsverarbeitungsverträge mit Vercel und Resend abschließen. Klären, ob das Barrierefreiheitsstärkungsgesetz
  greift und welche Stelle dann in der Erklärung genannt werden muss. Die alte Erklärung nannte eine Stelle in
  Rheinland-Pfalz, Mühlhausen liegt in Baden-Württemberg.
- **Inzahlungnahme**: Die alte Seite erwähnt sie nicht. Bestätigen, dass das Autohaus Fahrzeuge in Zahlung nimmt,
  sonst Seite und Menüpunkt entfernen.
- **„unter Neupreis“**: Die Fußnote im Hero erklärt den Bezug. Ob das wettbewerbsrechtlich reicht, prüfen lassen.
- **Fotos vom Autohaus und vom Team** fehlen. Porträts für die Ansprechpartner und ein Foto vom Hof würden viel
  Vertrauen bringen.
- **Bewertungen**: Die Note von mobile.de könnte auf Startseite und Fahrzeugseiten stehen. Dafür die aktuelle Note
  und Anzahl liefern oder eine Schnittstelle klären.
- **WhatsApp** als Kontaktweg nur, wenn jemand im Haus das zuverlässig beantwortet. Nummer fehlt.
- Impressum: Der Absatz „Internetseite realisiert von meinautohaus.de“ wurde weggelassen.
- Aktualität prüfen: Mietwagen-Angebot (Inserat von 2022), Kompletträder (Mai 2025), Frau Izzo steht auf der
  Finanzierungsseite, aber nicht bei den Ansprechpartnern.
- Bildrechte prüfen: Werkstatt-, Glas- und Mietwagenfoto sehen nach Stockfotos aus.
- Logo: Die Bildmarke ist aus dem PNG der alten Seite als SVG nachgezeichnet (`src/components/layout/logo.tsx`).
  Für eine exakte Version die Originaldatei beim Autohaus anfragen.
- Markenrecht: kein BMW-Logo verwendet. Ob und wie das Autohaus BMW-Markenzeichen nutzen darf, klären.
- Test auf echten Geräten (iPhone, Android) und eine Performance-Messung auf der Live-Domain.

## shadcn-Komponenten

Die Komponenten in `src/components/ui` stammen aus dem shadcn-Registry (`new-york-v4`). Weitere mit
`npx shadcn@latest add <name>` hinzufügen.
