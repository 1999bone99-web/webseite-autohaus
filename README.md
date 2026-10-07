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
| Animation | motion |
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

- **Ersparnis-Balken** an jedem Fahrzeug: Abstand zur damaligen UPE statt nur ein Preis.
- **Datenblatt-Optik**: technische Werte (EZ, km, PS) in Geist Mono, viel Weißraum, ein einziger blauer Akzent.
- **Schnellsuche im Hero** mit Live-Trefferzahl, **⌘K-Suche** über Bestand und alle Seiten.
- **Vergleich** bis 3 Fahrzeuge mit hervorgehobenen Bestwerten, **Merkliste** ohne Konto.
- **Finanzierungsrechner** (Beispielrechnung) und **Suchauftrag** als Ausweg, wenn nichts passt.
- Telefon an jeder Stelle erreichbar, auf Mobil eine feste Aktionsleiste auf der Fahrzeugseite.
- Hell und dunkel.

## Seiten

| Bereich | Seiten |
| --- | --- |
| Fahrzeuge | `/fahrzeuge`, `/fahrzeuge/[id]`, `/wunschfahrzeug`, `/probefahrt`, `/finanzierung`, `/vergleich`, `/merkliste` |
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
- `src/content/rechtliches/*.md` – Rechtstexte, wörtlich übernommen (inkl. Tippfehler)
- `src/content/mietbedingungen.md`
- `public/images/…` – Bilder von der bisherigen Seite

## Fahrzeugbestand

Der Bestand stammt von www.bmw-jw-marhoffer.de (Stand 07.10.2026, 94 Fahrzeuge) und liegt in
`src/data/vehicles.json` und `src/data/equipment.json`. Fotos werden direkt vom Händlersystem
(`www.webauto.de/imgcars/…`) geladen. Bei Fahrzeugen ohne Fotos zeigt die Seite eine gezeichnete Silhouette.

Neu einlesen:

```bash
bash scripts/bestand/fetch.sh
```

Danach `STOCK_DATE` in `src/lib/vehicles.ts` anpassen, committen, pushen.

Hinweise zu den Quelldaten:
- Den „Ersparnis“-Balken gibt es nur, wenn das Inserat einen Listenneupreis nennt (77 von 94).
- Einige Verbrauchsangaben in den Inseraten sind offensichtlich falsch (z. B. 76,0 l/100 km beim X5 30d,
  34,0 l/100 km beim XM 50e). Sie werden unverändert übernommen und sollten im Händlersystem korrigiert werden.

## Vor dem Livegang offen

- **Datenschutzerklärung anpassen.** Sie beschreibt die alte Seite (webauto.de-Hosting, Google Analytics,
  AdWords, AddThis). Für die neue Seite fehlen u. a. Hosting (z. B. Vercel) und das Laden der Fahrzeugfotos
  von webauto.de. Auf der Seite steht ein entsprechender Hinweis.
- **Barrierefreiheitserklärung neu bewerten** (bezieht sich auf die alte Seite, ebenfalls mit Hinweis).
- Impressum: Der Absatz „Internetseite realisiert von meinautohaus.de“ wurde weggelassen.
- **Formulare** validieren, senden aber noch nichts (`src/app/actions.ts`). Mailversand oder CRM anbinden.
- Bestand automatisch aktuell halten statt Momentaufnahme.
- Aktualität prüfen: Mietwagen-Angebot (Inserat von 2022), Kompletträder (Mai 2025), Frau Izzo steht auf der
  Finanzierungsseite, aber nicht bei den Ansprechpartnern.
- Bildrechte prüfen: Werkstatt-, Glas- und Mietwagenfoto sehen nach Stockfotos aus.
- Markenrecht: kein BMW-Logo verwendet. Ob und wie das Autohaus BMW-Markenzeichen nutzen darf, klären.

## shadcn-Komponenten

Die Komponenten in `src/components/ui` stammen aus dem shadcn-Registry (`new-york-v4`). Weitere mit
`npx shadcn@latest add <name>` hinzufügen.
