"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { VehicleCard } from "@/components/vehicle/vehicle-card"
import type { Vehicle } from "@/lib/vehicles"

export function FeaturedCarousel({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <Carousel opts={{ align: "start", loop: false }} className="w-full">
      <CarouselContent className="-ml-4">
        {vehicles.map((v) => (
          <CarouselItem key={v.id} className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <VehicleCard vehicle={v} className="h-full" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-8 flex justify-end gap-2">
        <CarouselPrevious className="static size-11 translate-y-0" />
        <CarouselNext className="static size-11 translate-y-0" />
      </div>
    </Carousel>
  )
}
