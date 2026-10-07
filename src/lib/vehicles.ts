/**
 * Fahrzeugbestand von www.bmw-jw-marhoffer.de, übernommen am 07.10.2026.
 * Die Daten liegen in src/data/*.json und sind eine Momentaufnahme.
 * Im Echtbetrieb kommt der Bestand automatisch aus dem Händlersystem
 * (Fotos und Inserate laufen dort über webauto.de).
 */
import data from "@/data/vehicles.json"
import stockMeta from "@/data/stock-meta.json"
import { site } from "@/lib/site"

export type BodyType = "limousine" | "touring" | "suv" | "coupe"
export type Category = "Neuwagen" | "Halbjahreswagen" | "Jahreswagen" | "Gebrauchtwagen"
export type Fuel = "Benzin" | "Diesel" | "Hybrid" | "Elektro"

export type Vehicle = {
  id: string
  /** Inserat-Nummer beim Autohaus */
  adId: string
  make: string
  model: string
  /** z. B. "BMW 540d xDrive" */
  name: string
  /** Rest des Inserattitels, z. B. "M-SportPro Sitzlüftung Standhzg" */
  trim: string
  series: string
  body: BodyType
  bodyLabel: string | null
  category: Category
  price: number
  /** Listenneupreis laut Inserat, falls angegeben */
  msrp: number | null
  /** "YYYY-MM" */
  firstRegistration: string
  mileage: number
  powerKw: number
  fuel: Fuel
  transmission: string | null
  color: { name: string; hex: string }
  /** Kombinierter Verbrauch wie im Inserat, z. B. "6,2 l/100km" */
  consumption: string | null
  co2: number | null
  co2Class: string | null
  highlights: string[]
  images: string[]
  /** Im Inserat steht, dass weitere Fotos auf Wunsch per E-Mail kommen */
  photosOnRequest: boolean
  sourceUrl: string
}

export const vehicles = data as Vehicle[]

/** Abrufdatum des Bestands, schreibt scripts/bestand/convert.py */
export const STOCK_DATE = stockMeta.stockDate.split("-").reverse().join(".")

export const categories: { name: Category; description: string }[] = [
  {
    name: "Halbjahreswagen",
    description: "Rund sechs Monate alt, meist wenig gelaufen. Fast neu, deutlich günstiger.",
  },
  {
    name: "Jahreswagen",
    description: "Etwa ein Jahr alt, oft aus erster Hand und mit umfangreicher Sonderausstattung.",
  },
  {
    name: "Gebrauchtwagen",
    description: "Ausgewählte Fahrzeuge mit nachvollziehbarer Historie.",
  },
  {
    name: "Neuwagen",
    description: "Sofort verfügbare Neufahrzeuge ohne lange Lieferzeit.",
  },
]

/** Nur Kategorien, die gerade im Bestand vorkommen */
export const stockCategories = categories.filter((c) => vehicles.some((v) => v.category === c.name))

const seriesOrder = (s: string) => {
  const m = s.match(/^(\d)er$/)
  if (m) return `A${m[1]}`
  if (/^X\d$/.test(s)) return `B${s}`
  if (/^XM$/.test(s)) return "BX9"
  if (/^i/.test(s)) return `C${s}`
  return `D${s}`
}
export const allSeries = Array.from(new Set(vehicles.map((v) => v.series))).sort((a, b) =>
  seriesOrder(a) < seriesOrder(b) ? -1 : 1
)
export const allFuels = (["Benzin", "Diesel", "Hybrid", "Elektro"] as Fuel[]).filter((f) =>
  vehicles.some((v) => v.fuel === f)
)
export const bodyLabels: Record<BodyType, string> = {
  limousine: "Limousine",
  touring: "Kombi / Van",
  suv: "SAV / SUV",
  coupe: "Coupé / Cabrio",
}

export const priceRange = {
  min: Math.min(...vehicles.map((v) => v.price)),
  max: Math.max(...vehicles.map((v) => v.price)),
}

export function getVehicle(id: string) {
  return vehicles.find((v) => v.id === id)
}

export function savingPercent(v: Pick<Vehicle, "price" | "msrp">) {
  if (!v.msrp) return null
  return Math.round((1 - v.price / v.msrp) * 100)
}

/**
 * Für „bis zu … % unter Neupreis“: der höchste Abstand im aktuellen Bestand, abgerundet,
 * höchstens so viel, wie das Autohaus selbst angibt. So bleibt die Aussage nach jedem Abgleich wahr.
 */
export const maxSaving = Math.min(
  site.maxSavingPercent,
  Math.floor(Math.max(0, ...vehicles.map((v) => (v.msrp ? (1 - v.price / v.msrp) * 100 : 0))))
)

export function kwToPs(kw: number) {
  return Math.round(kw * 1.35962)
}

export function isElectric(v: Pick<Vehicle, "fuel">) {
  return v.fuel === "Elektro"
}

export function similarVehicles(v: Vehicle, limit = 3) {
  return vehicles
    .filter((o) => o.id !== v.id)
    .map((o) => ({
      o,
      score:
        (o.series === v.series ? 3 : 0) +
        (o.body === v.body ? 2 : 0) +
        (o.fuel === v.fuel ? 1 : 0) +
        (o.images.length ? 1 : 0) -
        Math.abs(o.price - v.price) / 20_000,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ o }) => o)
}
