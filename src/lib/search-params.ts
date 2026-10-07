import {
  createSerializer,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs"

import { savingPercent, type Vehicle } from "@/lib/vehicles"

export const sortOptions = ["empfohlen", "preis-auf", "preis-ab", "km-auf", "ersparnis", "neueste"] as const
export type SortOption = (typeof sortOptions)[number]

export const inventoryParsers = {
  baureihe: parseAsArrayOf(parseAsString).withDefault([]),
  kategorie: parseAsArrayOf(parseAsString).withDefault([]),
  kraftstoff: parseAsArrayOf(parseAsString).withDefault([]),
  karosserie: parseAsArrayOf(parseAsString).withDefault([]),
  preisMax: parseAsInteger,
  kmMax: parseAsInteger,
  sort: parseAsStringLiteral(sortOptions).withDefault("empfohlen"),
}

export const serializeInventory = createSerializer(inventoryParsers)

export type InventoryFilter = {
  baureihe: string[]
  kategorie: string[]
  kraftstoff: string[]
  karosserie: string[]
  preisMax: number | null
  kmMax: number | null
  sort: SortOption
}

export function filterVehicles(list: Vehicle[], f: InventoryFilter) {
  const result = list.filter(
    (v) =>
      (!f.baureihe.length || f.baureihe.includes(v.series)) &&
      (!f.kategorie.length || f.kategorie.includes(v.category)) &&
      (!f.kraftstoff.length || f.kraftstoff.includes(v.fuel)) &&
      (!f.karosserie.length || f.karosserie.includes(v.body)) &&
      (f.preisMax == null || v.price <= f.preisMax) &&
      (f.kmMax == null || v.mileage <= f.kmMax)
  )
  const by: Record<SortOption, (a: Vehicle, b: Vehicle) => number> = {
    empfohlen: () => 0,
    "preis-auf": (a, b) => a.price - b.price,
    "preis-ab": (a, b) => b.price - a.price,
    "km-auf": (a, b) => a.mileage - b.mileage,
    ersparnis: (a, b) => (savingPercent(b) ?? -1) - (savingPercent(a) ?? -1),
    neueste: (a, b) => b.firstRegistration.localeCompare(a.firstRegistration),
  }
  return [...result].sort(by[f.sort])
}
