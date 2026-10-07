"use client"

import { useState } from "react"
import { SearchXIcon, SlidersHorizontalIcon, XIcon } from "lucide-react"

import { activeFilterCount, FilterBar, Filters, useInventoryFilter } from "@/components/inventory/filters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { VehicleCard } from "@/components/vehicle/vehicle-card"
import { formatKm, formatPrice } from "@/lib/format"
import { filterVehicles, sortOptions, type SortOption } from "@/lib/search-params"
import { bodyLabels, STOCK_DATE, vehicles, type BodyType, type Vehicle } from "@/lib/vehicles"
import Link from "next/link"

const sortLabels: Record<SortOption, string> = {
  empfohlen: "Empfohlen",
  "preis-auf": "Preis aufsteigend",
  "preis-ab": "Preis absteigend",
  "km-auf": "Wenigste Kilometer",
  ersparnis: "Größte Ersparnis",
  neueste: "Neueste Erstzulassung",
}

const PAGE_SIZE = 24

/** Zeigt die Treffer in Etappen. Ein neuer Filter setzt über den key auf die erste Etappe zurück. */
function ResultGrid({ results }: { results: Vehicle[] }) {
  const [count, setCount] = useState(PAGE_SIZE)
  const visible = results.slice(0, count)
  return (
    <>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
      {count < results.length && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {visible.length} von {results.length} Fahrzeugen
          </p>
          <Button variant="outline" size="lg" className="rounded-full" onClick={() => setCount((c) => c + PAGE_SIZE)}>
            Weitere {Math.min(PAGE_SIZE, results.length - count)} Fahrzeuge laden
          </Button>
        </div>
      )}
    </>
  )
}

export function Inventory() {
  const [f, setF] = useInventoryFilter()
  const results = filterVehicles(vehicles, f)
  const active = activeFilterCount(f)

  const chips: { label: string; clear: () => void }[] = [
    ...f.kategorie.map((x) => ({ label: x, clear: () => setF({ kategorie: f.kategorie.filter((y) => y !== x) }) })),
    ...f.baureihe.map((x) => ({ label: x, clear: () => setF({ baureihe: f.baureihe.filter((y) => y !== x) }) })),
    ...f.kraftstoff.map((x) => ({ label: x, clear: () => setF({ kraftstoff: f.kraftstoff.filter((y) => y !== x) }) })),
    ...f.karosserie.map((x) => ({
      label: bodyLabels[x as BodyType] ?? x,
      clear: () => setF({ karosserie: f.karosserie.filter((y) => y !== x) }),
    })),
    ...(f.preisMax != null ? [{ label: `bis ${formatPrice(f.preisMax)}`, clear: () => setF({ preisMax: null }) }] : []),
    ...(f.kmMax != null ? [{ label: `bis ${formatKm(f.kmMax)}`, clear: () => setF({ kmMax: null }) }] : []),
  ]

  return (
    <div className="container-page pt-8 pb-10">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-balance-tight text-3xl font-semibold sm:text-4xl">Fahrzeugbestand</h1>
        <p className="text-muted-foreground" aria-live="polite">
          <span className="font-mono font-medium text-foreground">{results.length}</span>
          {results.length === vehicles.length ? " Fahrzeuge" : ` von ${vehicles.length} Fahrzeugen`}
        </p>
      </div>

      <div>
        <div className="sticky top-16 z-30 -mx-4 mt-5 flex flex-wrap items-center gap-2 border-b bg-background/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
          <FilterBar className="mr-auto hidden lg:flex" />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="mr-auto rounded-full lg:hidden">
                <SlidersHorizontalIcon />
                Filter
                {active > 0 && <Badge className="ml-1 h-5 rounded-full bg-brand px-1.5 font-mono">{active}</Badge>}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm">
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription>Ergebnisse aktualisieren sich sofort.</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4">
                <Filters />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button size="lg" className="rounded-full">
                    {results.length} Fahrzeuge anzeigen
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Select value={f.sort} onValueChange={(v) => void setF({ sort: v as SortOption })}>
            <SelectTrigger className="h-9 w-52 rounded-full" aria-label="Sortierung">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {sortOptions.map((o) => (
                <SelectItem key={o} value={o}>
                  {sortLabels[o]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
            {chips.map((c) => (
              <Button key={c.label} variant="secondary" size="sm" className="rounded-full" onClick={() => void c.clear()}>
                {c.label}
                <XIcon />
              </Button>
            ))}
          </div>
        )}

        {results.length ? (
          <ResultGrid key={JSON.stringify(f)} results={results} />
        ) : (
          <Empty className="mt-6 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchXIcon />
              </EmptyMedia>
              <EmptyTitle>Kein Fahrzeug passt zu diesen Filtern</EmptyTitle>
              <EmptyDescription>
                Lockern Sie die Filter oder legen Sie einen Suchauftrag an. Wir melden uns, wenn ein passender BMW reinkommt.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center">
              <Button variant="outline" onClick={() => void setF(null)}>
                Filter zurücksetzen
              </Button>
              <Button asChild>
                <Link href="/kontakt?anliegen=suchauftrag">Suchauftrag anlegen</Link>
              </Button>
            </EmptyContent>
          </Empty>
        )}

        <p className="mt-10 text-xs text-muted-foreground">
          Bestand laut www.bmw-jw-marhoffer.de, Stand {STOCK_DATE}. Irrtümer und Zwischenverkauf vorbehalten.
        </p>
      </div>
    </div>
  )
}
