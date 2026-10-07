import Link from "next/link"

import { Button } from "@/components/ui/button"
import { VehicleVisual } from "@/components/vehicle/vehicle-visual"

export default function NotFound() {
  return (
    <div className="container-page grid place-items-center py-24 text-center">
      <VehicleVisual body="coupe" color="#8a8f96" stage={false} className="aspect-[3/1] w-full max-w-md opacity-60" />
      <h1 className="text-balance-tight mt-6 text-4xl font-semibold">Dieses Fahrzeug ist schon weg.</h1>
      <p className="mt-3 text-muted-foreground">Oder die Seite hat es nie gegeben. Im Bestand finden Sie bestimmt etwas.</p>
      <Button asChild className="mt-8 rounded-full">
        <Link href="/fahrzeuge">Zum Bestand</Link>
      </Button>
    </div>
  )
}
