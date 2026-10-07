import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { CompareButton, FavoriteButton } from "@/components/vehicle/garage-buttons"
import { SavingMeter } from "@/components/vehicle/saving-meter"
import { VehicleVisual } from "@/components/vehicle/vehicle-visual"
import { formatKm, formatPrice, formatRegistration } from "@/lib/format"
import { kwToPs, type Vehicle } from "@/lib/vehicles"
import { cn } from "@/lib/utils"

export function VehicleCard({ vehicle: v, className }: { vehicle: Vehicle; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-24px_rgb(0_0_0/0.35)]",
        className
      )}
    >
      <div className="relative">
        <VehicleVisual
          body={v.body}
          color={v.color.hex}
          label={`${v.model} in ${v.color.name}`}
          className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge className="rounded-full bg-background/85 text-foreground backdrop-blur">{v.category}</Badge>
          {v.fuel === "Elektro" || v.fuel === "Plug-in-Hybrid" ? (
            <Badge variant="outline" className="rounded-full border-brand/30 bg-brand-soft text-brand">
              {v.fuel}
            </Badge>
          ) : null}
        </div>
        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
          <CompareButton id={v.id} />
          <FavoriteButton id={v.id} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            {v.series} · {v.variant}
          </p>
          <h3 className="mt-1 text-lg leading-tight font-semibold tracking-tight">
            <Link href={`/fahrzeuge/${v.id}`} className="after:absolute after:inset-0">
              {v.model}
            </Link>
          </h3>
          <p className="mt-1 truncate text-sm text-muted-foreground">{v.highlights.slice(0, 3).join(" · ")}</p>
        </div>

        <dl className="grid grid-cols-3 gap-2 border-y py-3 font-mono text-xs">
          <div>
            <dt className="text-muted-foreground">EZ</dt>
            <dd className="mt-0.5 font-medium">{formatRegistration(v.firstRegistration)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Laufleistung</dt>
            <dd className="mt-0.5 font-medium">{formatKm(v.mileage)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Leistung</dt>
            <dd className="mt-0.5 font-medium">{kwToPs(v.powerKw)} PS</dd>
          </div>
        </dl>

        <div className="mt-auto space-y-3">
          <p className="text-2xl font-semibold tracking-tight">{formatPrice(v.price)}</p>
          <SavingMeter vehicle={v} />
        </div>
      </div>
    </article>
  )
}
