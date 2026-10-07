import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"
import { CompareView } from "@/components/vehicle/garage-views"

export const metadata: Metadata = { title: "Fahrzeugvergleich" }

export default function VergleichPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Vergleich" }]}
        title="Fahrzeuge vergleichen"
        description="Bis zu drei Fahrzeuge nebeneinander. Der beste Wert jeder Zeile ist blau markiert."
      />
      <div className="container-page py-12">
        <CompareView />
      </div>
    </>
  )
}
