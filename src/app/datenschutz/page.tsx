import type { Metadata } from "next"

import { PageHeader } from "@/components/shared/page-header"
import { site } from "@/lib/site"

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false } }

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Datenschutz" }]} title="Datenschutz" />
      <div className="container-page max-w-3xl py-12 text-muted-foreground">
        <p>
          Platzhalter. Der rechtlich geprüfte Text wird vom Autohaus geliefert und hier eingesetzt.
        </p>
        <p className="mt-4">
          {site.legalName}, {site.address.street}, {site.address.zip} {site.address.city}
        </p>
      </div>
    </>
  )
}
