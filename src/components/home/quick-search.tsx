"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatPrice } from "@/lib/format"
import { filterVehicles, serializeInventory } from "@/lib/search-params"
import { allFuels, allSeries, vehicles } from "@/lib/vehicles"

const ALL = "alle"
const budgets = [50_000, 60_000, 70_000, 80_000, 100_000]

export function QuickSearch() {
  const [series, setSeries] = useState(ALL)
  const [fuel, setFuel] = useState(ALL)
  const [budget, setBudget] = useState(ALL)

  const filter = useMemo(
    () => ({
      baureihe: series === ALL ? [] : [series],
      kraftstoff: fuel === ALL ? [] : [fuel],
      kategorie: [],
      karosserie: [],
      preisMax: budget === ALL ? null : Number(budget),
      kmMax: null,
      sort: "empfohlen" as const,
    }),
    [series, fuel, budget]
  )
  const count = filterVehicles(vehicles, filter).length
  const href = serializeInventory("/fahrzeuge", filter)

  return (
    <div className="rounded-2xl border bg-card/90 p-2 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.45)] backdrop-blur">
      <div className="grid gap-1 sm:grid-cols-[1fr_1fr_1fr_auto]">
        <Field label="Baureihe">
          <Select value={series} onValueChange={setSeries}>
            <SelectTrigger className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent" aria-label="Baureihe">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Alle Baureihen</SelectItem>
              {allSeries.map((s) => (
                <SelectItem key={s} value={s}>
                  BMW {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Antrieb">
          <Select value={fuel} onValueChange={setFuel}>
            <SelectTrigger className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent" aria-label="Antrieb">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Alle Antriebe</SelectItem>
              {allFuels.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Preis bis">
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent" aria-label="Preis bis">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Beliebig</SelectItem>
              {budgets.map((b) => (
                <SelectItem key={b} value={String(b)}>
                  {formatPrice(b)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Button asChild size="lg" className="h-auto min-h-14 rounded-xl px-6 text-base" disabled={!count}>
          <Link href={href}>
            <span className="font-mono">{count}</span> Fahrzeuge
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl px-4 py-2 transition-colors hover:bg-muted/70">
      <Label className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">{label}</Label>
      {children}
    </div>
  )
}
