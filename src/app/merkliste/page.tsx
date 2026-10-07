import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"
import { FavoritesView } from "@/components/vehicle/garage-views"

export const metadata: Metadata = { title: "Merkliste" }

export default function MerklistePage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Merkliste" }]} title="Ihre Merkliste" description="Die Merkliste wird nur in diesem Browser gespeichert. Sie brauchen dafür kein Konto." />
      <div className="container-page py-12">
        <FavoritesView />
      </div>
    </>
  )
}
