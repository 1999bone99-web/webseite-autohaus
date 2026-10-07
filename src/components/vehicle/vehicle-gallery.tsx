"use client"

import { useEffect, useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { VehiclePhoto } from "@/components/vehicle/vehicle-photo"
import type { Vehicle } from "@/lib/vehicles"
import { cn } from "@/lib/utils"

export function VehicleGallery({ vehicle: v }: { vehicle: Vehicle }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  if (v.images.length <= 1) {
    return <VehiclePhoto vehicle={v} priority sizes="(min-width: 1024px) 66vw, 100vw" className="aspect-[4/3] rounded-3xl border" />
  }

  return (
    <div>
      <Carousel setApi={setApi} opts={{ loop: true }} className="overflow-hidden rounded-3xl border">
        <CarouselContent className="ml-0">
          {v.images.map((_, i) => (
            <CarouselItem key={i} className="pl-0">
              <VehiclePhoto
                vehicle={v}
                index={i}
                priority={i === 0}
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="aspect-[4/3]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 size-10 bg-background/80 backdrop-blur" />
        <CarouselNext className="right-3 size-10 bg-background/80 backdrop-blur" />
        <span className="absolute right-4 bottom-4 rounded-full bg-background/85 px-2.5 py-1 font-mono text-xs backdrop-blur">
          {current + 1} / {v.images.length}
        </span>
      </Carousel>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {v.images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Foto ${i + 1} anzeigen`}
            aria-current={current === i}
            className={cn(
              "w-24 shrink-0 overflow-hidden rounded-lg border-2 transition",
              current === i ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <VehiclePhoto vehicle={v} index={i} sizes="96px" compact className="aspect-[4/3]" />
          </button>
        ))}
      </div>
    </div>
  )
}
