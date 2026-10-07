"use client"

import { useState } from "react"
import Image from "next/image"

import { VehicleVisual } from "@/components/vehicle/vehicle-visual"
import type { Vehicle } from "@/lib/vehicles"
import { cn } from "@/lib/utils"

/**
 * Erstes Foto aus dem Inserat. Fehlt es oder lädt es nicht,
 * erscheint die gezeichnete Silhouette in der Lackfarbe.
 */
export function VehiclePhoto({
  vehicle: v,
  index = 0,
  className,
  sizes = "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  vehicle: Pick<Vehicle, "images" | "body" | "color" | "name">
  index?: number
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const src = v.images[index]

  if (!src || failed) {
    return (
      <div className={cn("relative", className)}>
        <VehicleVisual body={v.body} color={v.color.hex} label={`${v.name}, ${v.color.name}`} className="absolute inset-0" />
        <span className="absolute right-3 bottom-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] text-muted-foreground backdrop-blur">
          Fotos folgen
        </span>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src={src}
        alt={`${v.name}, Ansicht ${index + 1}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
