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
- **Schnellsuche im Hero** mit Live-Trefferzahl, **⌘K-Suche** über den Bestand.
- **Vergleich** bis 3 Fahrzeuge mit hervorgehobenen Bestwerten, **Merkliste** ohne Konto.
- **Finanzierungsrechner** (Beispielrechnung) und **Suchauftrag** als Ausweg, wenn nichts passt.
- Telefon an jeder Stelle erreichbar, auf Mobil eine feste Aktionsleiste auf der Fahrzeugseite.
- Hell und dunkel.

## Seiten

`/` · `/fahrzeuge` (Filter, Sortierung) · `/fahrzeuge/[id]` · `/vergleich` · `/merkliste` ·
`/werkstatt` (Terminanfrage) · `/export` · `/kontakt` · `/impressum` · `/datenschutz`

## Vor dem Livegang offen

- **Fahrzeugbestand ist Beispieldaten** (`src/lib/vehicles.ts`). Preise, km und Verbrauchswerte sind erfunden.
  Anbindung an den echten Bestand (z. B. mobile.de-Schnittstelle oder DMS) fehlt.
- **Fahrzeugbilder** sind stilisierte SVG-Silhouetten (`vehicle-visual.tsx`). Durch echte Fotos ersetzen.
- **Formulare** validieren, senden aber noch nichts (`src/app/actions.ts`). Mailversand oder CRM anbinden.
- **Inhalte abstimmen**: Werkstattleistungen, Exportablauf und FAQ sind Entwürfe. Adresse, Telefonnummern
  und Öffnungszeiten stammen aus öffentlichen Verzeichnissen (`src/lib/site.ts`) und sollten geprüft werden.
- **Impressum und Datenschutz** sind Platzhalter.
- Pflichtangaben nach Pkw-EnVKV (Verbrauch/CO₂) sind vorgesehen, Werte müssen aus echten Daten kommen.
- Markenrecht: kein BMW-Logo verwendet. Ob und wie das Autohaus BMW-Markenzeichen nutzen darf, klären.

## shadcn-Komponenten

Die Komponenten in `src/components/ui` stammen aus dem shadcn-Registry (`new-york-v4`). Weitere mit
`npx shadcn@latest add <name>` hinzufügen.
