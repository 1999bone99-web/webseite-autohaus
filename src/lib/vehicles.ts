/**
 * BEISPIELBESTAND für das Design. Preise, Laufleistungen und Verbrauchswerte
 * sind erfunden und dienen nur der Darstellung. Im Echtbetrieb kommt der
 * Bestand aus der Händler-Schnittstelle (z. B. mobile.de Such-API oder DMS).
 */

export type BodyType = "limousine" | "touring" | "suv" | "coupe"
export type Category = "Neuwagen" | "Halbjahreswagen" | "Jahreswagen" | "Gebrauchtwagen"
export type Fuel = "Benzin" | "Diesel" | "Plug-in-Hybrid" | "Elektro"

export type Vehicle = {
  id: string
  series: string
  model: string
  variant: string
  body: BodyType
  category: Category
  price: number
  /** Unverbindliche Preisempfehlung inkl. Sonderausstattung bei Erstauslieferung */
  msrp: number
  firstRegistration: string
  mileage: number
  powerKw: number
  fuel: Fuel
  transmission: "Automatik" | "Schaltgetriebe"
  drive: "Hinterrad" | "xDrive" | "Vorderrad"
  color: { name: string; hex: string }
  interior: string
  owners: number
  /** WLTP kombiniert, l/100 km oder kWh/100 km */
  consumption: number
  co2: number
  co2Class: "A" | "B" | "C" | "D" | "E" | "F" | "G"
  highlights: string[]
  equipment: { group: string; items: string[] }[]
}

const commonEquipment = {
  comfort: ["Klimaautomatik 3-Zonen", "Sitzheizung vorn", "Komfortzugang", "Elektrische Heckklappe"],
  assist: ["Driving Assistant", "Parking Assistant", "Rückfahrkamera", "Tempomat mit Bremsfunktion"],
  media: ["Curved Display", "Navigationssystem", "Apple CarPlay / Android Auto", "Harman Kardon Surround"],
}

export const vehicles: Vehicle[] = [
  {
    id: "bmw-320d-touring-m-sport-schwarz",
    series: "3er",
    model: "BMW 320d Touring",
    variant: "M Sport",
    body: "touring",
    category: "Jahreswagen",
    price: 44_890,
    msrp: 71_340,
    firstRegistration: "2025-08",
    mileage: 11_200,
    powerKw: 140,
    fuel: "Diesel",
    transmission: "Automatik",
    drive: "Hinterrad",
    color: { name: "Saphirschwarz metallic", hex: "#121418" },
    interior: "Sensatec Schwarz",
    owners: 1,
    consumption: 5.1,
    co2: 134,
    co2Class: "D",
    highlights: ["M Sportpaket", "Head-Up Display", "Panorama-Glasdach", "Anhängerkupplung"],
    equipment: [
      { group: "Komfort", items: commonEquipment.comfort },
      { group: "Assistenz", items: [...commonEquipment.assist, "Head-Up Display"] },
      { group: "Infotainment", items: commonEquipment.media },
      { group: "Exterieur", items: ["M Sportpaket", "Panorama-Glasdach", "Anhängerkupplung elektrisch", "19\" M Leichtmetallräder"] },
    ],
  },
  {
    id: "bmw-x3-20d-xdrive-blau",
    series: "X3",
    model: "BMW X3 20d xDrive",
    variant: "M Sport",
    body: "suv",
    category: "Halbjahreswagen",
    price: 58_450,
    msrp: 82_100,
    firstRegistration: "2026-03",
    mileage: 4_850,
    powerKw: 145,
    fuel: "Diesel",
    transmission: "Automatik",
    drive: "xDrive",
    color: { name: "Portimao Blau metallic", hex: "#1f4f9c" },
    interior: "Veganza Mokka",
    owners: 1,
    consumption: 5.9,
    co2: 155,
    co2Class: "E",
    highlights: ["Driving Assistant Professional", "Pano-Dach", "Sitzbelüftung", "Laserlicht"],
    equipment: [
      { group: "Komfort", items: [...commonEquipment.comfort, "Sitzbelüftung vorn"] },
      { group: "Assistenz", items: [...commonEquipment.assist, "Driving Assistant Professional"] },
      { group: "Infotainment", items: commonEquipment.media },
      { group: "Exterieur", items: ["M Sportpaket", "Panorama-Glasdach", "Adaptive LED-Scheinwerfer", "20\" M Leichtmetallräder"] },
    ],
  },
  {
    id: "bmw-i4-edrive40-weiss",
    series: "i4",
    model: "BMW i4 eDrive40",
    variant: "M Sport",
    body: "coupe",
    category: "Jahreswagen",
    price: 47_990,
    msrp: 74_800,
    firstRegistration: "2025-07",
    mileage: 13_600,
    powerKw: 250,
    fuel: "Elektro",
    transmission: "Automatik",
    drive: "Hinterrad",
    color: { name: "Mineralweiß metallic", hex: "#e9eaec" },
    interior: "Vernasca Leder Schwarz",
    owners: 1,
    consumption: 16.4,
    co2: 0,
    co2Class: "A",
    highlights: ["Wärmepumpe", "Harman Kardon", "Komfortzugang", "Head-Up Display"],
    equipment: [
      { group: "Komfort", items: [...commonEquipment.comfort, "Wärmepumpe"] },
      { group: "Assistenz", items: [...commonEquipment.assist, "Head-Up Display"] },
      { group: "Infotainment", items: commonEquipment.media },
      { group: "Laden", items: ["AC 11 kW", "DC bis 205 kW", "Ladekabel Mode 3"] },
    ],
  },
  {
    id: "bmw-520d-limousine-grau",
    series: "5er",
    model: "BMW 520d Limousine",
    variant: "Luxury Line",
    body: "limousine",
    category: "Jahreswagen",
    price: 52_700,
    msrp: 83_950,
    firstRegistration: "2025-05",
    mileage: 16_400,
    powerKw: 145,
    fuel: "Diesel",
    transmission: "Automatik",
    drive: "Hinterrad",
    color: { name: "Sophistograu Brillanteffekt", hex: "#5c6066" },
    interior: "Leder Merino Cognac",
    owners: 1,
    consumption: 5.0,
    co2: 131,
    co2Class: "D",
    highlights: ["Bowers & Wilkins", "Massagesitze", "Integral-Aktivlenkung", "Standheizung"],
    equipment: [
      { group: "Komfort", items: [...commonEquipment.comfort, "Massagefunktion", "Standheizung"] },
      { group: "Assistenz", items: [...commonEquipment.assist, "Driving Assistant Professional"] },
      { group: "Infotainment", items: ["Curved Display", "Navigationssystem", "Bowers & Wilkins Surround"] },
      { group: "Fahrwerk", items: ["Integral-Aktivlenkung", "Adaptives Fahrwerk"] },
    ],
  },
  {
    id: "bmw-x1-sdrive18i-gruen",
    series: "X1",
    model: "BMW X1 sDrive18i",
    variant: "xLine",
    body: "suv",
    category: "Jahreswagen",
    price: 33_490,
    msrp: 49_900,
    firstRegistration: "2025-09",
    mileage: 9_300,
    powerKw: 100,
    fuel: "Benzin",
    transmission: "Automatik",
    drive: "Vorderrad",
    color: { name: "Utah Orange metallic", hex: "#b4572a" },
    interior: "Veganza Schwarz",
    owners: 1,
    consumption: 6.5,
    co2: 148,
    co2Class: "E",
    highlights: ["Komfortpaket", "Rückfahrkamera", "AHK", "LED-Scheinwerfer"],
    equipment: [
      { group: "Komfort", items: commonEquipment.comfort },
      { group: "Assistenz", items: commonEquipment.assist },
      { group: "Infotainment", items: commonEquipment.media.slice(0, 3) },
    ],
  },
  {
    id: "bmw-m440i-xdrive-coupe-rot",
    series: "4er",
    model: "BMW M440i xDrive Coupé",
    variant: "Individual",
    body: "coupe",
    category: "Gebrauchtwagen",
    price: 49_800,
    msrp: 86_400,
    firstRegistration: "2023-11",
    mileage: 38_700,
    powerKw: 275,
    fuel: "Benzin",
    transmission: "Automatik",
    drive: "xDrive",
    color: { name: "Aventurinrot metallic", hex: "#6e1420" },
    interior: "Leder Vernasca Tacora Rot",
    owners: 1,
    consumption: 8.4,
    co2: 191,
    co2Class: "F",
    highlights: ["M Sportdifferenzial", "Carbon-Dach", "Laserlicht", "Harman Kardon"],
    equipment: [
      { group: "Komfort", items: commonEquipment.comfort },
      { group: "Assistenz", items: commonEquipment.assist },
      { group: "Fahrwerk", items: ["M Sportdifferenzial", "M Sportbremse", "Adaptives M Fahrwerk"] },
      { group: "Exterieur", items: ["Carbon-Dach", "BMW Laserlicht", "19\" M Leichtmetallräder"] },
    ],
  },
  {
    id: "bmw-x5-xdrive50e-schwarz",
    series: "X5",
    model: "BMW X5 xDrive50e",
    variant: "M Sport Pro",
    body: "suv",
    category: "Halbjahreswagen",
    price: 79_900,
    msrp: 112_600,
    firstRegistration: "2026-02",
    mileage: 6_100,
    powerKw: 360,
    fuel: "Plug-in-Hybrid",
    transmission: "Automatik",
    drive: "xDrive",
    color: { name: "Carbonschwarz metallic", hex: "#141a24" },
    interior: "Leder Merino Elfenbeinweiß",
    owners: 1,
    consumption: 1.0,
    co2: 23,
    co2Class: "B",
    highlights: ["Luftfederung", "Sky Lounge", "Bowers & Wilkins", "Akustikverglasung"],
    equipment: [
      { group: "Komfort", items: [...commonEquipment.comfort, "Sitzbelüftung", "Akustikverglasung"] },
      { group: "Assistenz", items: [...commonEquipment.assist, "Driving Assistant Professional"] },
      { group: "Fahrwerk", items: ["Zweiachs-Luftfederung", "Integral-Aktivlenkung"] },
      { group: "Exterieur", items: ["Panorama-Glasdach Sky Lounge", "22\" M Leichtmetallräder"] },
    ],
  },
  {
    id: "bmw-118i-silber",
    series: "1er",
    model: "BMW 118",
    variant: "M Sport",
    body: "limousine",
    category: "Jahreswagen",
    price: 29_990,
    msrp: 43_700,
    firstRegistration: "2025-10",
    mileage: 7_900,
    powerKw: 115,
    fuel: "Benzin",
    transmission: "Automatik",
    drive: "Vorderrad",
    color: { name: "Skyscraper Grau metallic", hex: "#8a8f96" },
    interior: "Veganza Schwarz",
    owners: 1,
    consumption: 5.9,
    co2: 134,
    co2Class: "D",
    highlights: ["M Sportpaket", "Komfortzugang", "Rückfahrkamera", "Sitzheizung"],
    equipment: [
      { group: "Komfort", items: commonEquipment.comfort.slice(0, 3) },
      { group: "Assistenz", items: commonEquipment.assist.slice(1) },
      { group: "Infotainment", items: commonEquipment.media.slice(0, 3) },
    ],
  },
  {
    id: "bmw-530e-touring-blau",
    series: "5er",
    model: "BMW 530e Touring",
    variant: "M Sport",
    body: "touring",
    category: "Halbjahreswagen",
    price: 61_300,
    msrp: 88_200,
    firstRegistration: "2026-04",
    mileage: 3_200,
    powerKw: 220,
    fuel: "Plug-in-Hybrid",
    transmission: "Automatik",
    drive: "Hinterrad",
    color: { name: "Tansanitblau metallic", hex: "#232a4a" },
    interior: "Veganza Mokka",
    owners: 1,
    consumption: 0.8,
    co2: 19,
    co2Class: "B",
    highlights: ["Anhängerkupplung", "Head-Up Display", "Panorama-Glasdach", "Standklimatisierung"],
    equipment: [
      { group: "Komfort", items: [...commonEquipment.comfort, "Standklimatisierung"] },
      { group: "Assistenz", items: [...commonEquipment.assist, "Head-Up Display"] },
      { group: "Infotainment", items: commonEquipment.media },
      { group: "Laden", items: ["AC 11 kW", "Ladekabel Mode 3"] },
    ],
  },
  {
    id: "bmw-220d-gran-coupe-weiss",
    series: "2er",
    model: "BMW 220d Gran Coupé",
    variant: "Sport Line",
    body: "limousine",
    category: "Jahreswagen",
    price: 32_990,
    msrp: 49_200,
    firstRegistration: "2025-06",
    mileage: 14_800,
    powerKw: 120,
    fuel: "Diesel",
    transmission: "Automatik",
    drive: "Vorderrad",
    color: { name: "Alpinweiß uni", hex: "#f2f2f0" },
    interior: "Sensatec Schwarz",
    owners: 1,
    consumption: 4.7,
    co2: 124,
    co2Class: "C",
    highlights: ["Live Cockpit Plus", "Sitzheizung", "LED-Scheinwerfer", "Parking Assistant"],
    equipment: [
      { group: "Komfort", items: commonEquipment.comfort.slice(0, 3) },
      { group: "Assistenz", items: commonEquipment.assist },
      { group: "Infotainment", items: commonEquipment.media.slice(0, 3) },
    ],
  },
  {
    id: "bmw-ix3-m-sport-grau",
    series: "iX3",
    model: "BMW iX3 50 xDrive",
    variant: "M Sport",
    body: "suv",
    category: "Neuwagen",
    price: 66_900,
    msrp: 76_400,
    firstRegistration: "2026-09",
    mileage: 15,
    powerKw: 345,
    fuel: "Elektro",
    transmission: "Automatik",
    drive: "xDrive",
    color: { name: "Frozen Pure Grey", hex: "#9aa0a6" },
    interior: "Veganza Schwarz",
    owners: 0,
    consumption: 15.8,
    co2: 0,
    co2Class: "A",
    highlights: ["Panoramic iDrive", "Wärmepumpe", "Anhängerkupplung", "Harman Kardon"],
    equipment: [
      { group: "Komfort", items: [...commonEquipment.comfort, "Wärmepumpe"] },
      { group: "Assistenz", items: [...commonEquipment.assist, "Driving Assistant Professional"] },
      { group: "Infotainment", items: ["Panoramic iDrive", "Navigationssystem", "Harman Kardon Surround"] },
      { group: "Laden", items: ["AC 11 kW", "DC bis 400 kW"] },
    ],
  },
  {
    id: "bmw-330i-limousine-schwarz",
    series: "3er",
    model: "BMW 330i Limousine",
    variant: "M Sport",
    body: "limousine",
    category: "Gebrauchtwagen",
    price: 36_400,
    msrp: 63_800,
    firstRegistration: "2024-03",
    mileage: 29_500,
    powerKw: 180,
    fuel: "Benzin",
    transmission: "Automatik",
    drive: "Hinterrad",
    color: { name: "Brooklyn Grau metallic", hex: "#6f747a" },
    interior: "Leder Vernasca Schwarz",
    owners: 1,
    consumption: 6.6,
    co2: 151,
    co2Class: "E",
    highlights: ["M Sportbremse", "Adaptives M Fahrwerk", "Harman Kardon", "Komfortzugang"],
    equipment: [
      { group: "Komfort", items: commonEquipment.comfort },
      { group: "Assistenz", items: commonEquipment.assist },
      { group: "Fahrwerk", items: ["Adaptives M Fahrwerk", "M Sportbremse"] },
    ],
  },
]

export const categories: { name: Category; description: string }[] = [
  {
    name: "Halbjahreswagen",
    description: "Rund sechs Monate alt, meist unter 10.000 km. Fast neu, deutlich günstiger.",
  },
  {
    name: "Jahreswagen",
    description: "Ein Jahr alt, aus erster Hand, oft mit umfangreicher Sonderausstattung.",
  },
  {
    name: "Gebrauchtwagen",
    description: "Ausgewählte BMW mit nachvollziehbarer Historie und geprüftem Zustand.",
  },
  {
    name: "Neuwagen",
    description: "Sofort verfügbare Neufahrzeuge ohne lange Lieferzeit.",
  },
]

export const allSeries = Array.from(new Set(vehicles.map((v) => v.series))).sort(
  (a, b) => a.localeCompare(b, "de", { numeric: true })
)
export const allFuels: Fuel[] = ["Benzin", "Diesel", "Plug-in-Hybrid", "Elektro"]
export const bodyLabels: Record<BodyType, string> = {
  limousine: "Limousine",
  touring: "Touring",
  suv: "SAV / SUV",
  coupe: "Coupé / Gran Coupé",
}

export function getVehicle(id: string) {
  return vehicles.find((v) => v.id === id)
}

export function savingPercent(v: Pick<Vehicle, "price" | "msrp">) {
  return Math.round((1 - v.price / v.msrp) * 100)
}

export function kwToPs(kw: number) {
  return Math.round(kw * 1.35962)
}

export function similarVehicles(v: Vehicle, limit = 3) {
  return vehicles
    .filter((o) => o.id !== v.id)
    .map((o) => ({
      o,
      score:
        (o.series === v.series ? 3 : 0) +
        (o.body === v.body ? 2 : 0) +
        (o.fuel === v.fuel ? 1 : 0) -
        Math.abs(o.price - v.price) / 20_000,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ o }) => o)
}
