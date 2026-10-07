/**
 * Inhalte von www.bmw-jw-marhoffer.de, übernommen am 07.10.2026.
 * Texte sind sinngemäß bis wörtlich aus den jeweiligen Unterseiten.
 */

export const team = [
  { name: "Reiner Marhoffer", role: "Vertrieb · Geschäftsleitung", phone: "06222 / 93 98 20-13", tel: "+49622293982013", email: "r.m@bmw-jw-marhoffer.de", area: "verkauf" },
  { name: "Noah Erb", role: "Vertrieb", phone: "06222 / 93 98 20-0", tel: "+4962229398200", email: "n.e@bmw-jw-marhoffer.de", area: "verkauf" },
  { name: "Gerlinde Müller", role: "Assistenz der Geschäftsleitung · Buchhaltung", phone: "06222 / 93 98 20-19", tel: "+49622293982019", email: "g.m@bmw-jw-marhoffer.de", area: "verwaltung" },
  { name: "Erdinc Felek", role: "Werkstatt", phone: "06222 / 93 98 20-28", tel: "+49622293982028", email: "e.f@bmw-jw-marhoffer.de", area: "werkstatt" },
] as const

export const contact = {
  email: "info@bmw-jw-marhoffer.de",
  fax: "06222 / 93 98 20-17",
  reviewsUrl: "https://www.mobile.de/bewertungen/BMWJWMARHOFFERGMBH",
}

export const workshopServices = [
  {
    title: "BMW Ölservice",
    text: "Wir verwenden ausschließlich von BMW empfohlene Motorenöle und Original BMW Ölfilter. Damit Sie lange Freude an Ihrem BMW haben.",
    items: [
      "Fachgerechter Austausch des Ölfilters",
      "Austausch des Motoröls",
      "Umweltgerechte Entsorgung von Altöl und altem Ölfilter",
      "Zurücksetzen des Wartungssystems",
    ],
  },
  {
    title: "Fahrzeug-Check",
    text: "Lassen Sie Ihren BMW von den Profis durchchecken. Dann wissen Sie, dass er optimal gewartet ist.",
    items: [
      "Kühlmittel, Frostschutz, Luftfilter",
      "Keilriemen",
      "Ölstand, auch bei Automatikgetrieben",
      "Bremsanlage",
      "Scheiben und Scheinwerfer",
      "Scheibenwischer und Waschanlage",
      "Batterie",
      "Reifenprofil und Reifendruck",
      "Beleuchtung",
      "Heizung, Heckscheibenheizung, Mikrofilter",
      "Lack",
    ],
  },
  {
    title: "Bremsen-Service",
    text: "Wir tauschen Bremsscheiben und -beläge gegen Original BMW Komponenten, die genau auf Ihr Fahrzeug abgestimmt sind.",
    items: [
      "Umfassende Inspektion des Bremssystems inkl. Bremsschläuchen",
      "Bei Bedarf Austausch von Bremsscheiben, Bremsbelägen und Bremsbelagfühlern",
      "Gründliche Reinigung der Bremsen",
      "Kontrolle der Bremswirkung",
    ],
  },
  {
    title: "Räder- und Reifenservice",
    text: "Reifen, Räder und Fahrwerk perfekt aufeinander abgestimmt. Wir beraten Sie, welche Reifen zu Ihrem Fahrzeug passen.",
    items: ["Montage", "Reifenwechsel", "Wartung"],
  },
]

export const financing = {
  target: {
    title: "Zielfinanzierung",
    text: "Die komfortabelste Möglichkeit für den Eigentumserwerb. Sie legen die Laufzeit zwischen 12 und 60 Monaten fest. Am Ende kaufen Sie das Fahrzeug, indem Sie die Schlussrate tilgen, oder Sie finanzieren den Rest bequem weiter.",
    benefits: [
      "Individuelle Vertragslaufzeiten bis 60 Monate",
      "Niedrige Monatsraten",
      "Kauf des Fahrzeugs durch Tilgung der Schlussrate",
      "Oder bequem weiter finanzieren",
    ],
  },
  leasing: {
    title: "Leasing",
    text: "Finanziell flexibel bleiben. Sie bestimmen die Höhe der monatlichen Rate über Vertragslaufzeit, Kilometerleistung und, falls gewünscht, eine Leasingsonderzahlung. Möglich sind Restwert- und Kilometerleasing.",
  },
  /** Ansprechpartner laut Seite Finanzierung & Leasing */
  contacts: [
    { name: "Herr Marhoffer", phone: "06222 / 93 98 20-13", tel: "+49622293982013", email: "r.m@bmw-jw-marhoffer.de" },
    { name: "Frau Izzo", phone: "06222 / 93 98 20-0", tel: "+4962229398200", email: "f.i@bmw-jw-marhoffer.de" },
  ],
}

export const rental = {
  vehicle: "BMW 116d Limousine",
  image: "/images/mietwagen/bmw-116d.jpg",
  rates: [
    { label: "Tag", note: "inkl. 250 km", price: 29 },
    { label: "Wochenende", note: "inkl. 300 km", price: 58 },
    { label: "Woche", note: "inkl. 1.500 km", price: 174 },
  ],
  extraKm: "0,19 €",
  footnotes: [
    "Tagespreis: Anmietung von 9.00 Uhr bis 9.00 Uhr am Folgetag.",
    "Wochenendpreis: gültig von Freitag 9.00 Uhr bis Montag 9.00 Uhr.",
  ],
}

export const rims = [
  { title: "BMW X5 G05 / X6 G06, 19 Zoll, Winter-Komplettradsatz", tyre: "Pirelli Scorpion 265/50 R19, 6–7 mm", ref: "61/2", price: null, image: "/images/komplettraeder/rad-1.jpg" },
  { title: "BMW 7er G70, 19 Zoll, Winter-Komplettradsatz", tyre: "Pirelli P Zero 245/50 R19, 5–6 mm", ref: "86/2", price: 1199, image: "/images/komplettraeder/rad-2.jpg" },
  { title: "BMW 5er G30/G31, 17 Zoll, Winter-Komplettradsatz", tyre: "Dunlop SP Winter Sport 4D 225/55 R17, 7–8 mm", ref: "72", price: 499, image: "/images/komplettraeder/rad-3.jpg" },
  { title: "BMW X5 G05 / X6 G06, 19 Zoll Styling 734 V-Speiche, Winter-Komplettradsatz", tyre: "Continental WinterContact TS 860S SSR 265/50 R19 H XL, 6–7 mm", ref: "83", price: 1699, image: "/images/komplettraeder/rad-4.jpg" },
  { title: "BMW X7 G07, 20 Zoll Styling 750 V-Speiche, neuwertig", tyre: "Continental WinterContact TS 860S SSR 255/55 R20 H XL, Felgen und Reifen neuwertig", ref: "55", price: 1699, image: "/images/komplettraeder/rad-5.jpg" },
  { title: "BMW 5er G30/G31, 18 Zoll, Winter-Komplettradsatz", tyre: "Maxxis Premitra 245/45 R18, neu", ref: null, price: 599, image: "/images/komplettraeder/rad-6.jpg" },
  { title: "BMW 7er G11/G12, 19 Zoll, Winter-Komplettradsatz", tyre: "Pirelli Sottozero 245/45 R19, 3–4 mm", ref: "58/2", price: 499, image: "/images/komplettraeder/rad-7.jpg" },
  { title: "BMW 7er G70, 20 Zoll, Winter-Komplettradsatz", tyre: "Pirelli P Zero 285/40 R20, 5–6 mm", ref: "57/2", price: 1890, image: "/images/komplettraeder/rad-8.jpg" },
]

export const jobs = [
  {
    title: "Kfz-Mechatroniker (m/w/d)",
    tasks: "Sie arbeiten Reparaturaufträge sorgfältig und termingerecht ab und bleiben bei der Technik der aktuellen BMW-Modelle auf dem Laufenden.",
    profile: "Abgeschlossene Berufsausbildung und praktische Erfahrung im BMW-Bereich. Computergestützte Reparatur, Wartung und moderne Diagnosemethoden sind für Sie selbstverständlich.",
  },
  {
    title: "Kfz-Meister (m/w/d)",
    tasks: "Sie arbeiten Reparaturaufträge sorgfältig und termingerecht ab und bleiben bei der Technik der aktuellen BMW-Modelle auf dem Laufenden.",
    profile: "Entsprechende Qualifikation und praktische Erfahrung im BMW-Bereich. Sie bleiben bei neuen Entwicklungen auf dem Laufenden und lernen gern dazu.",
  },
]

export const headerImages = [
  { src: "/images/kopfbilder/bmw-4-gruen.jpg", alt: "Grüner BMW M4 in der Tiefgarage, Kennzeichen M-JW 6247" },
  { src: "/images/kopfbilder/bmw-blau.jpg", alt: "Blauer BMW X6 M im Parkhaus" },
  { src: "/images/kopfbilder/bmw-rot.jpg", alt: "Roter BMW M8 Cabrio am Hafen" },
  { src: "/images/kopfbilder/bmw-weiss.jpg", alt: "Weißer BMW 2er Gran Coupé" },
]
