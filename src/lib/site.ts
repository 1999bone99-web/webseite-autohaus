/**
 * Unternehmensdaten. Quelle: öffentliche Branchenverzeichnisse und die
 * Suchergebnis-Auszüge von bmw-jw-marhoffer.de (Stand Oktober 2026).
 * Vor dem Livegang mit dem Autohaus abgleichen.
 */
export const site = {
  name: "Marhoffer",
  legalName: "bmw-jw-marhoffer GmbH",
  claim: "BMW Jahreswagen mit Wunschausstattung. Seit 1988.",
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

export const navigation = [
  { href: "/fahrzeuge", label: "Fahrzeuge" },
  { href: "/werkstatt", label: "Werkstatt" },
  { href: "/export", label: "Export" },
  { href: "/kontakt", label: "Kontakt" },
] as const
