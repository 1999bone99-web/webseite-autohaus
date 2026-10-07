"use client"

import { useState } from "react"
import Image from "next/image"
import { CameraOffIcon, ImagesIcon } from "lucide-react"

import type { Vehicle } from "@/lib/vehicles"
import { cn } from "@/lib/utils"

/**
 * Foto aus dem Inserat. Fehlt es oder lädt es nicht, zeigt die Karte eine ruhige,
 * typografische Fläche mit Baureihe und Lackfarbe statt einer Zeichnung.
 */
export function VehiclePhoto({
  vehicle: v,
  index = 0,
  className,
  sizes = "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  compact = false,
  showCount = false,
}: {
  vehicle: Pick<Vehicle, "images" | "color" | "name" | "series">
  index?: number
  className?: string
  sizes?: string
  priority?: boolean
  /** Für Vorschaubilder: nur Baureihe, ohne Beschriftung */
  compact?: boolean
  /** Bildanzahl unten links einblenden, nur wenn Fotos tatsächlich angezeigt werden */
  showCount?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const src = v.images[index]

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${v.name}, ${v.color.name}. Fotos folgen.`}
        className={cn(
          "@container relative overflow-hidden bg-[radial-gradient(120%_100%_at_100%_0%,var(--stage-from),var(--stage-to))]",
          className
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute -bottom-[0.18em] left-[0.04em] leading-none font-semibold tracking-[-0.06em] text-foreground/[0.07] select-none",
            compact ? "text-5xl" : "text-[clamp(5rem,14cqw,9rem)]"
          )}
        >
          {v.series}
        </span>
        {!compact && (
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-xs">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="size-3 rounded-full ring-1 ring-foreground/15" style={{ backgroundColor: v.color.hex }} />
              {v.color.name}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-muted-foreground backdrop-blur">
              <CameraOffIcon className="size-3" /> Fotos folgen
            </span>
          </div>
        )}
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
      {showCount && v.images.length > 1 && (
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/85 px-2 py-0.5 font-mono text-[11px] backdrop-blur">
          <ImagesIcon className="size-3" /> {v.images.length}
        </span>
      )}
    </div>
  )
}
