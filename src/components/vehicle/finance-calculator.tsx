"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { formatPrice } from "@/lib/format"

const TERMS = [24, 36, 48, 60] as const
/** Nur zur Veranschaulichung, kein Angebot. Konditionen kommen von der Bank. */
const EXAMPLE_APR = 5.99

export function monthlyRate(principal: number, months: number, aprPercent: number) {
  const i = aprPercent / 100 / 12
  if (i === 0) return principal / months
  return (principal * i) / (1 - Math.pow(1 + i, -months))
}

export function FinanceCalculator({ price }: { price: number }) {
  const [downPct, setDownPct] = useState(20)
  const [term, setTerm] = useState<number>(48)

  const down = Math.round((price * downPct) / 100 / 100) * 100
  const rate = monthlyRate(price - down, term, EXAMPLE_APR)

  return (
    <Card className="gap-5 rounded-2xl shadow-none">
      <CardHeader>
        <CardTitle className="text-base">Monatsrate grob abschätzen</CardTitle>
        <CardDescription>Klassische Finanzierung ohne Schlussrate</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight">{formatPrice(Math.round(rate))}</span>
          <span className="text-sm text-muted-foreground">/ Monat</span>
        </div>

        <div className="grid gap-3">
          <div className="flex justify-between text-sm">
            <Label>Anzahlung</Label>
            <span className="font-mono">
              {formatPrice(down)} <span className="text-muted-foreground">({downPct} %)</span>
            </span>
          </div>
          <Slider min={0} max={50} step={5} value={[downPct]} onValueChange={([v]) => setDownPct(v)} aria-label="Anzahlung in Prozent" />
        </div>

        <div className="grid gap-3">
          <Label>Laufzeit</Label>
          <ToggleGroup
            type="single"
            variant="outline"
            value={String(term)}
            onValueChange={(v) => v && setTerm(Number(v))}
            className="w-full"
          >
            {TERMS.map((t) => (
              <ToggleGroupItem key={t} value={String(t)} className="flex-1 font-mono">
                {t} M.
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Unverbindliche Beispielrechnung mit {EXAMPLE_APR.toLocaleString("de-DE")} % effektivem Jahreszins. Kein
          Finanzierungsangebot. Die tatsächlichen Konditionen hängen von Bank und Bonität ab.
        </p>
      </CardContent>
    </Card>
  )
}
