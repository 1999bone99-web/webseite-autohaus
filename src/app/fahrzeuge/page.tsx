import type { Metadata } from "next"
import { Suspense } from "react"

import { Inventory } from "@/components/inventory/inventory"
import { PageHeader } from "@/components/shared/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Fahrzeuge",
  description: `Alle BMW Neu-, Halbjahres-, Jahres- und Gebrauchtwagen bei Marhoffer in ${site.address.city}.`,
}

function InventorySkeleton() {
  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[280px_1fr]">
      <Skeleton className="hidden h-96 lg:block" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[420px] rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

export default function FahrzeugePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Fahrzeuge" }]}
        title="Unser Bestand"
        description="Bei den meisten Fahrzeugen sehen Sie direkt, wie weit der Preis unter dem Listenneupreis liegt. Alle Angaben aus unseren aktuellen Inseraten."
      />
      <Suspense fallback={<InventorySkeleton />}>
        <Inventory />
      </Suspense>
    </>
  )
}
