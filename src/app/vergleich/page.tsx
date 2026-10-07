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
        description="Nebeneinander, Zeile für Zeile. Die jeweils besten Werte sind blau markiert."
      />
      <div className="container-page py-12">
        <CompareView />
      </div>
    </>
  )
}
