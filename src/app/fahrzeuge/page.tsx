import type { Metadata } from "next"
import { Suspense } from "react"

import { Inventory } from "@/components/inventory/inventory"
import { Skeleton } from "@/components/ui/skeleton"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Fahrzeuge",
  description: `BMW Halb-, Jahres- und Gebrauchtwagen mit Wunschausstattung bei bmw-jw-marhoffer in ${site.address.city}.`,
}

function InventorySkeleton() {
  return (
    <div className="container-page pt-8 pb-10">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-6 h-9 w-full max-w-3xl rounded-full" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[420px] rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

export default function FahrzeugePage() {
  return (
    <Suspense fallback={<InventorySkeleton />}>
      <Inventory />
    </Suspense>
  )
}
