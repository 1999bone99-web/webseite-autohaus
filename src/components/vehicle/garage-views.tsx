"use client"

import Link from "next/link"
import { HeartIcon, ScaleIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SavingMeter } from "@/components/vehicle/saving-meter"
import { VehicleCard } from "@/components/vehicle/vehicle-card"
import { VehiclePhoto } from "@/components/vehicle/vehicle-photo"
import { getEquipment } from "@/lib/equipment"
import { formatKm, formatPrice, formatRegistration } from "@/lib/format"
import { getVehicle, kwToPs, savingPercent, type Vehicle } from "@/lib/vehicles"
import { cn } from "@/lib/utils"
import { MAX_COMPARE, useGarage } from "@/stores/garage"

function useVehicles(ids: string[]) {
  return ids.map(getVehicle).filter((v): v is Vehicle => Boolean(v))
}

export function FavoritesView() {
  const list = useVehicles(useGarage((s) => s.favorites))
  if (!list.length)
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HeartIcon />
          </EmptyMedia>
          <EmptyTitle>Noch nichts gemerkt</EmptyTitle>
          <EmptyDescription>
            Tippen Sie auf das Herz an einem Fahrzeug. Die Merkliste bleibt in diesem Browser gespeichert, ohne Konto.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/fahrzeuge">Zum Bestand</Link>
          </Button>
        </EmptyContent>
      </Empty>
    )
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((v) => (
        <VehicleCard key={v.id} vehicle={v} />
      ))}
    </div>
  )
}

type Row = { label: string; get: (v: Vehicle) => string | number | null; best?: "min" | "max" }

const rows: Row[] = [
  { label: "Preis", get: (v) => v.price, best: "min" },
  { label: "Ersparnis zum Neupreis", get: (v) => savingPercent(v), best: "max" },
  { label: "Fahrzeugart", get: (v) => v.category },
  { label: "Erstzulassung", get: (v) => formatRegistration(v.firstRegistration) },
  { label: "Kilometer", get: (v) => v.mileage, best: "min" },
  { label: "Leistung (PS)", get: (v) => kwToPs(v.powerKw), best: "max" },
  { label: "Kraftstoff", get: (v) => v.fuel },
  { label: "Getriebe", get: (v) => v.transmission },
  { label: "Verbrauch kombiniert", get: (v) => v.consumption },
  { label: "CO₂-Klasse", get: (v) => v.co2Class },
  { label: "Farbe", get: (v) => v.color.name },
]

function display(row: Row, v: Vehicle) {
  const val = row.get(v)
  if (val == null) return "–"
  if (row.label === "Preis") return formatPrice(Number(val))
  if (row.label === "Kilometer") return formatKm(Number(val))
  if (row.label === "Ersparnis zum Neupreis") return `−${val} %`
  return String(val)
}

export function CompareView() {
  const list = useVehicles(useGarage((s) => s.compare))
  const toggle = useGarage((s) => s.toggleCompare)
  const clear = useGarage((s) => s.clearCompare)

  if (!list.length)
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ScaleIcon />
          </EmptyMedia>
          <EmptyTitle>Noch kein Fahrzeug im Vergleich</EmptyTitle>
          <EmptyDescription>
            Wählen Sie bis zu {MAX_COMPARE} Fahrzeuge über das Waagen-Symbol aus. Die Bestwerte werden hervorgehoben.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/fahrzeuge">Fahrzeuge auswählen</Link>
          </Button>
        </EmptyContent>
      </Empty>
    )

  const equipmentOf = (v: Vehicle) => {
    const e = getEquipment(v.id)
    return new Set([...e.special, ...e.groups.flatMap((g) => g.items)])
  }
  const sets = list.map(equipmentOf)
  // Nur Ausstattung zeigen, die nicht alle verglichenen Fahrzeuge haben. Gemeinsames ist kein Unterschied.
  const allEquipment = Array.from(new Set(sets.flatMap((s) => [...s])))
    .filter((item) => list.length === 1 || !sets.every((s) => s.has(item)))
    .sort((a, b) => a.localeCompare(b, "de"))
  const cols = `minmax(140px,180px) repeat(${list.length}, minmax(220px,1fr))`

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button variant="ghost" size="sm" onClick={clear}>
          Vergleich leeren
        </Button>
      </div>
      <ScrollArea className="w-full rounded-2xl border bg-card">
        <div className="min-w-fit">
          <div className="grid border-b" style={{ gridTemplateColumns: cols }}>
            <div />
            {list.map((v) => (
              <div key={v.id} className="relative border-l p-4">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute top-2 right-2 z-10"
                  aria-label={`${v.model} entfernen`}
                  onClick={() => toggle(v.id)}
                >
                  <XIcon />
                </Button>
                <VehiclePhoto vehicle={v} sizes="300px" className="aspect-[4/3] rounded-xl" />
                <Link href={`/fahrzeuge/${v.id}`} className="mt-3 block font-semibold tracking-tight hover:underline">
                  {v.name}
                </Link>
                <p className="line-clamp-1 text-sm text-muted-foreground">{v.trim}</p>
                <SavingMeter vehicle={v} className="mt-3" />
              </div>
            ))}
          </div>
          {rows.map((row) => {
            const nums = list.map((v) => row.get(v)).filter((x): x is number => typeof x === "number")
            const best = row.best && nums.length ? (row.best === "min" ? Math.min(...nums) : Math.max(...nums)) : null
            return (
              <div key={row.label} className="grid border-b last:border-0" style={{ gridTemplateColumns: cols }}>
                <div className="p-4 text-sm text-muted-foreground">{row.label}</div>
                {list.map((v) => {
                  const isBest = list.length > 1 && best != null && row.get(v) === best
                  return (
                    <div key={v.id} className={cn("border-l p-4 font-mono text-sm", isBest && "bg-brand-soft font-semibold text-brand")}>
                      {display(row, v)}
                    </div>
                  )
                })}
              </div>
            )
          })}
          <div className="grid border-t bg-muted/40" style={{ gridTemplateColumns: cols }}>
            <div className="p-4 text-sm font-medium">Ausstattungsunterschiede</div>
            {list.map((v) => (
              <div key={v.id} className="border-l" />
            ))}
          </div>
          {allEquipment.map((item) => (
            <div key={item} className="grid border-t" style={{ gridTemplateColumns: cols }}>
              <div className="p-3 pl-4 text-sm text-muted-foreground">{item}</div>
              {list.map((v, i) => {
                const has = sets[i].has(item)
                return (
                  <div key={v.id} className="grid place-items-center border-l p-3 text-sm">
                    {has ? <span className="text-brand">●</span> : <span className="text-muted-foreground/40">–</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
