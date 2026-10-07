/**
 * Unternehmensdaten laut Impressum und Kontaktseiten von www.bmw-jw-marhoffer.de
 * (Stand 07.10.2026).
 */
export const site = {
  name: "Marhoffer",
  legalName: "bmw-jw-marhoffer GmbH",
  claim: "BMW Halb- und Jahreswagen mit Wunschausstattung. Seit 1988.",
  foundedYear: 1988,
  maxSavingPercent: 45,
  address: {
    street: "In den Rotwiesen 11",
    addition: "Gewerbegebiet",
    zip: "69242",
    city: "Mühlhausen",
    region: "Kraichgau",
    country: "Deutschland",
  },
  phone: {
    sales: { display: "06222 / 93 98 20-0", href: "tel:+4962229398200" },
    workshop: { display: "06222 / 93 98 20-28", href: "tel:+49622293982028" },
  },
  hours: {
    sales: [
      { days: "Mo – Fr", time: "09:30 – 12:00 · 13:30 – 16:30" },
      { days: "Sa", time: "nach Vereinbarung" },
    ],
    workshop: [
      { days: "Mo – Do", time: "08:00 – 12:30 · 13:30 – 17:00" },
      { days: "Fr", time: "08:00 – 15:00" },
    ],
  },
  mapsUrl:
    "https://www.openstreetmap.org/search?query=In%20den%20Rotwiesen%2011%2C%2069242%20M%C3%BChlhausen",
} as const

export type NavItem = { href: string; label: string; description?: string; external?: boolean }
export type NavGroup = { label: string; href: string; items: NavItem[] }

export const navigation: NavGroup[] = [
  {
    label: "Fahrzeuge",
    href: "/fahrzeuge",
    items: [
      { href: "/fahrzeuge", label: "Fahrzeugbestand", description: "Alle Fahrzeuge mit Filtern und Vergleich" },
      { href: "/wunschfahrzeug", label: "Wunschfahrzeug", description: "Nicht dabei? Wir suchen für Sie" },
      { href: "/probefahrt", label: "Probefahrt", description: "Termin für Ihr Wunschfahrzeug" },
      { href: "/finanzierung", label: "Finanzierung & Leasing", description: "Zielfinanzierung und Leasing" },
    ],
  },
  {
    label: "Service",
    href: "/werkstatt",
    items: [
      { href: "/werkstatt", label: "Werkstatt", description: "Wartung, Reparatur, Hol- und Bringservice" },
      { href: "/werkstatt#termin", label: "Servicetermin", description: "Wunschtermin online anfragen" },
      { href: "/glasreparatur", label: "Scheiben & Glas", description: "Steinschlag reparieren oder Scheibe tauschen" },
      { href: "/komplettraeder", label: "Kompletträder", description: "Radsätze für Ihren BMW" },
      { href: "/mietwagen", label: "Mietwagen", description: "Ab 29 € pro Tag" },
    ],
  },
  {
    label: "Unternehmen",
    href: "/ueber-uns",
    items: [
      { href: "/ueber-uns", label: "Über uns", description: "Seit 1988 in Mühlhausen" },
      { href: "/ansprechpartner", label: "Ansprechpartner", description: "Wer hilft Ihnen weiter?" },
      { href: "https://www.mobile.de/bewertungen/BMWJWMARHOFFERGMBH", label: "Kundenstimmen", description: "Bewertungen auf mobile.de", external: true },
      { href: "/karriere", label: "Karriere", description: "Offene Stellen" },
    ],
  },
]

export const legalLinks: NavItem[] = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/nutzungsbestimmungen", label: "Nutzungsbestimmungen" },
  { href: "/barrierefreiheit", label: "Barrierefreiheit" },
]
