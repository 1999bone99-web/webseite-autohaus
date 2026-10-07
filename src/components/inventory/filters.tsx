"use client"

import { useQueryStates } from "nuqs"
import { ChevronDownIcon, XIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { formatKm, formatPrice } from "@/lib/format"
import { inventoryParsers } from "@/lib/search-params"
import { allFuels, allSeries, bodyLabels, priceRange, stockCategories, vehicles, type BodyType } from "@/lib/vehicles"
import { cn } from "@/lib/utils"

const PRICE_MIN = Math.floor(priceRange.min / 5000) * 5000
const PRICE_MAX = Math.ceil(priceRange.max / 5000) * 5000
const KM_MAX = Math.ceil(Math.max(...vehicles.map((v) => v.mileage)) / 10_000) * 10_000

type ArrayKey = "baureihe" | "kategorie" | "kraftstoff" | "karosserie"
type Option = { value: string; label: string }

const seriesLabel = (s: string) => (/^[A-Z][a-z]/.test(s) || s === "MINI" ? s : `BMW ${s}`)

const groups: { key: ArrayKey; label: string; options: Option[]; columns?: number }[] = [
  { key: "kategorie", label: "Fahrzeugart", options: stockCategories.map((c) => ({ value: c.name, label: c.name })) },
  { key: "baureihe", label: "Baureihe", options: allSeries.map((s) => ({ value: s, label: seriesLabel(s) })), columns: 2 },
  { key: "kraftstoff", label: "Antrieb", options: allFuels.map((x) => ({ value: x, label: x })) },
  {
    key: "karosserie",
    label: "Karosserie",
    options: (Object.keys(bodyLabels) as BodyType[])
      .filter((b) => vehicles.some((v) => v.body === b))
      .map((b) => ({ value: b, label: bodyLabels[b] })),
  },
]

export function useInventoryFilter() {
  return useQueryStates(inventoryParsers, { shallow: true, history: "replace" })
}

type FilterState = ReturnType<typeof useInventoryFilter>[0]

export function activeFilterCount(f: FilterState) {
  return (
    f.baureihe.length +
    f.kategorie.length +
    f.kraftstoff.length +
    f.karosserie.length +
    (f.preisMax != null ? 1 : 0) +
    (f.kmMax != null ? 1 : 0)
  )
}

function countFor(key: ArrayKey, value: string) {
  return vehicles.filter((v) => ({ baureihe: v.series, kategorie: v.category, kraftstoff: v.fuel, karosserie: v.body })[key] === value)
    .length
}

/* ---------- Bausteine, die Leiste und Seitenpanel gemeinsam nutzen ---------- */

function CheckboxGroup({ group, idPrefix }: { group: (typeof groups)[number]; idPrefix: string }) {
  const [f, setF] = useInventoryFilter()
  const selected = f[group.key]
  const toggle = (value: string) =>
    void setF({ [group.key]: selected.includes(value) ? selected.filter((x) => x !== value) : [...selected, value] })

  return (
    <div className={cn("grid gap-x-6 gap-y-2.5", group.columns === 2 && "sm:grid-cols-2")}>
      {group.options.map((o) => {
        const id = `${idPrefix}-${group.key}-${o.value}`
        return (
          <div key={o.value} className="flex items-center gap-3">
            <Checkbox id={id} checked={selected.includes(o.value)} onCheckedChange={() => toggle(o.value)} />
            <Label htmlFor={id} className="flex-1 cursor-pointer font-normal">
              {o.label}
            </Label>
            <span className="font-mono text-xs text-muted-foreground">{countFor(group.key, o.value)}</span>
          </div>
        )
      })}
    </div>
  )
}

function MaxSlider({ kind }: { kind: "preis" | "km" }) {
  const [f, setF] = useInventoryFilter()
  const isPrice = kind === "preis"
  const max = isPrice ? PRICE_MAX : KM_MAX
  const value = (isPrice ? f.preisMax : f.kmMax) ?? max
  return (
    <div className="grid gap-3">
      <div className="flex justify-between text-sm">
        <span>{isPrice ? "Preis bis" : "Kilometer bis"}</span>
        <span className="font-mono">{isPrice ? formatPrice(value) : formatKm(value)}</span>
      </div>
      <Slider
        min={isPrice ? PRICE_MIN : 10_000}
        max={max}
        step={isPrice ? 5_000 : 10_000}
        value={[value]}
        onValueChange={([v]) => {
          const next = v >= max ? null : v
          void setF(isPrice ? { preisMax: next } : { kmMax: next })
        }}
        aria-label={isPrice ? "Maximaler Preis" : "Maximale Laufleistung"}
      />
    </div>
  )
}

/* ---------- Desktop: Filterleiste mit Auswahlfenstern ---------- */

function FilterButton({
  label,
  active,
  summary,
  children,
  wide = false,
}: {
  label: string
  active: number
  summary?: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-9 rounded-full font-normal", active > 0 && "border-foreground/40 bg-accent font-medium")}
        >
          {summary ?? label}
          {active > 0 && !summary && (
            <span className="grid size-5 place-items-center rounded-full bg-brand font-mono text-[11px] text-brand-foreground">
              {active}
            </span>
          )}
          <ChevronDownIcon className="opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("p-4", wide ? "w-[26rem]" : "w-72")}>
        <p className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">{label}</p>
        {children}
      </PopoverContent>
    </Popover>
  )
}

export function FilterBar({ className }: { className?: string }) {
  const [f, setF] = useInventoryFilter()
  const byKey = Object.fromEntries(groups.map((g) => [g.key, g])) as Record<ArrayKey, (typeof groups)[number]>
  const order: (ArrayKey | "preis" | "km")[] = ["baureihe", "preis", "km", "kraftstoff", "karosserie", "kategorie"]

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {order.map((key) => {
        if (key === "preis")
          return (
            <FilterButton
              key={key}
              label="Preis"
              active={f.preisMax != null ? 1 : 0}
              summary={f.preisMax != null ? `bis ${formatPrice(f.preisMax)}` : undefined}
            >
              <MaxSlider kind="preis" />
            </FilterButton>
          )
        if (key === "km")
          return (
            <FilterButton
              key={key}
              label="Kilometer"
              active={f.kmMax != null ? 1 : 0}
              summary={f.kmMax != null ? `bis ${formatKm(f.kmMax)}` : undefined}
            >
              <MaxSlider kind="km" />
            </FilterButton>
          )
        const g = byKey[key]
        return (
          <FilterButton key={key} label={g.label} active={f[key].length} wide={g.columns === 2}>
            <CheckboxGroup group={g} idPrefix="bar" />
          </FilterButton>
        )
      })}
      {activeFilterCount(f) > 0 && (
        <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground" onClick={() => void setF(null)}>
          <XIcon /> Zurücksetzen
        </Button>
      )}
    </div>
  )
}

/* ---------- Mobil: Seitenpanel mit aufklappbaren Gruppen ---------- */

export function Filters() {
  const [f, setF] = useInventoryFilter()
  return (
    <div>
      <Accordion type="multiple" defaultValue={["baureihe"]}>
        {groups.map((g) => (
          <AccordionItem key={g.key} value={g.key}>
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                {g.label}
                {f[g.key].length > 0 && (
                  <span className="grid size-5 place-items-center rounded-full bg-brand font-mono text-[11px] text-brand-foreground">
                    {f[g.key].length}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <CheckboxGroup group={g} idPrefix="panel" />
            </AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="preis">
          <AccordionTrigger>Preis & Laufleistung</AccordionTrigger>
          <AccordionContent className="grid gap-6 pt-2">
            <MaxSlider kind="preis" />
            <MaxSlider kind="km" />
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
