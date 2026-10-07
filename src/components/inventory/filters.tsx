"use client"

import { useQueryStates } from "nuqs"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { formatKm, formatPrice } from "@/lib/format"
import { inventoryParsers } from "@/lib/search-params"
import { allFuels, allSeries, bodyLabels, priceRange, stockCategories, vehicles, type BodyType } from "@/lib/vehicles"

const PRICE_MIN = Math.floor(priceRange.min / 5000) * 5000
const PRICE_MAX = Math.ceil(priceRange.max / 5000) * 5000
const KM_MAX = Math.ceil(Math.max(...vehicles.map((v) => v.mileage)) / 10_000) * 10_000

type ArrayKey = "baureihe" | "kategorie" | "kraftstoff" | "karosserie"

export function useInventoryFilter() {
  return useQueryStates(inventoryParsers, { shallow: true, history: "replace" })
}

export function activeFilterCount(f: ReturnType<typeof useInventoryFilter>[0]) {
  return (
    f.baureihe.length +
    f.kategorie.length +
    f.kraftstoff.length +
    f.karosserie.length +
    (f.preisMax != null ? 1 : 0) +
    (f.kmMax != null ? 1 : 0)
  )
}

export function Filters() {
  const [f, setF] = useInventoryFilter()

  const toggle = (key: ArrayKey, value: string) => {
    const list = f[key]
    void setF({ [key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value] })
  }

  const group = (key: ArrayKey, options: { value: string; label: string }[]) => (
    <div className="grid gap-2.5">
      {options.map((o) => {
        const id = `${key}-${o.value}`
        const count = vehicles.filter((v) => {
          const field = { baureihe: v.series, kategorie: v.category, kraftstoff: v.fuel, karosserie: v.body }[key]
          return field === o.value
        }).length
        return (
          <div key={o.value} className="flex items-center gap-3">
            <Checkbox id={id} checked={f[key].includes(o.value)} onCheckedChange={() => toggle(key, o.value)} />
            <Label htmlFor={id} className="flex-1 cursor-pointer font-normal">
              {o.label}
            </Label>
            <span className="font-mono text-xs text-muted-foreground">{count}</span>
          </div>
        )
      })}
    </div>
  )

  return (
    <div>
      <Accordion type="multiple" defaultValue={["kategorie", "baureihe", "preis", "kraftstoff"]}>
        <AccordionItem value="kategorie">
          <AccordionTrigger>Fahrzeugart</AccordionTrigger>
          <AccordionContent>
            {group("kategorie", stockCategories.map((c) => ({ value: c.name, label: c.name })))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="baureihe">
          <AccordionTrigger>Baureihe</AccordionTrigger>
          <AccordionContent>
            {group("baureihe", allSeries.map((s) => ({ value: s, label: /^[A-Z][a-z]/.test(s) || s === "MINI" ? s : `BMW ${s}` })))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="preis">
          <AccordionTrigger>Preis & Laufleistung</AccordionTrigger>
          <AccordionContent className="grid gap-6 pt-2">
            <div className="grid gap-3">
              <div className="flex justify-between text-sm">
                <span>Preis bis</span>
                <span className="font-mono">{formatPrice(f.preisMax ?? PRICE_MAX)}</span>
              </div>
              <Slider
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={5_000}
                value={[f.preisMax ?? PRICE_MAX]}
                onValueChange={([v]) => void setF({ preisMax: v >= PRICE_MAX ? null : v })}
                aria-label="Maximaler Preis"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex justify-between text-sm">
                <span>Kilometer bis</span>
                <span className="font-mono">{formatKm(f.kmMax ?? KM_MAX)}</span>
              </div>
              <Slider
                min={10_000}
                max={KM_MAX}
                step={10_000}
                value={[f.kmMax ?? KM_MAX]}
                onValueChange={([v]) => void setF({ kmMax: v >= KM_MAX ? null : v })}
                aria-label="Maximale Laufleistung"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="kraftstoff">
          <AccordionTrigger>Antrieb</AccordionTrigger>
          <AccordionContent>{group("kraftstoff", allFuels.map((x) => ({ value: x, label: x })))}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="karosserie">
          <AccordionTrigger>Karosserie</AccordionTrigger>
          <AccordionContent>
            {group(
              "karosserie",
              (Object.keys(bodyLabels) as BodyType[])
                .filter((b) => vehicles.some((v) => v.body === b))
                .map((b) => ({ value: b, label: bodyLabels[b] }))
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {activeFilterCount(f) > 0 && (
        <Button variant="ghost" className="mt-4 w-full" onClick={() => void setF(null)}>
          Alle Filter zurücksetzen
        </Button>
      )}
    </div>
  )
}
