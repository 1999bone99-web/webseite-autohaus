import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"
import { FavoritesView } from "@/components/vehicle/garage-views"

export const metadata: Metadata = { title: "Merkliste" }

export default function MerklistePage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Merkliste" }]} title="Ihre Merkliste" description="Gespeichert in diesem Browser. Kein Konto, keine Anmeldung." />
      <div className="container-page py-12">
        <FavoritesView />
      </div>
    </>
  )
}
