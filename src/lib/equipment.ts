import equipment from "@/data/equipment.json"

export type Equipment = {
  /** Ausstattung in den Kategorien des Inserats */
  groups: { group: string; items: string[] }[]
  /** Sonderausstattung laut Fahrzeugbeschreibung, ohne Werkscodes */
  special: string[]
}

const all = equipment as Record<string, Equipment>

export function getEquipment(id: string): Equipment {
  return all[id] ?? { groups: [], special: [] }
}
