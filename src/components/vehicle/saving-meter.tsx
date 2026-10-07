import { formatPrice } from "@/lib/format"
import { savingPercent, type Vehicle } from "@/lib/vehicles"
import { cn } from "@/lib/utils"

/** Zeigt den Abstand zum damaligen Neupreis. Das Kernversprechen des Hauses. */
export function SavingMeter({
  vehicle,
  className,
  detailed = false,
}: {
  vehicle: Pick<Vehicle, "price" | "msrp">
  className?: string
  detailed?: boolean
}) {
  const pct = savingPercent(vehicle)
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-foreground/80"
          style={{ width: `${100 - pct}%` }}
        />
        <div
          className="absolute inset-y-0 right-0 rounded-full bg-brand/25"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-baseline justify-between font-mono text-[11px] text-muted-foreground">
        <span>
          Neupreis <span className="line-through">{formatPrice(vehicle.msrp)}</span>
        </span>
        <span className="font-medium text-brand">−{pct} %</span>
      </div>
      {detailed && (
        <p className="text-xs text-muted-foreground">
          Sie sparen {formatPrice(vehicle.msrp - vehicle.price)} gegenüber der damaligen UPE inkl.
          Sonderausstattung.
        </p>
      )}
    </div>
  )
}
