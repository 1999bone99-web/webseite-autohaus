import type { Metadata } from "next"
import { Suspense } from "react"

import { InquiryForm } from "@/components/forms/inquiry-form"
import { PageHeader } from "@/components/shared/page-header"
import { headerImages } from "@/lib/content"

export const metadata: Metadata = {
  title: "Wunschfahrzeug",
  description: "Ihr BMW ist nicht im Bestand? Beschreiben Sie uns Ihr Wunschfahrzeug, wir suchen für Sie.",
}

export default function WunschfahrzeugPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/fahrzeuge", label: "Fahrzeuge" }, { label: "Wunschfahrzeug" }]}
        title="Ihr Wunschfahrzeug"
        description="Sie suchen einen BMW Halb- oder Jahreswagen und finden in unserer Fahrzeugliste nicht das gewünschte Modell? Beschreiben Sie uns, was Sie suchen. Wir melden uns, sobald ein passendes Fahrzeug verfügbar ist."
        image={headerImages[1]}
      />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-12">
        <aside className="grid content-start gap-4 text-sm lg:col-span-4">
          <h2 className="text-lg font-semibold tracking-tight">Was uns hilft</h2>
          <ul className="grid gap-3 text-muted-foreground">
            {[
              "Modell und Motorisierung, z. B. X5 xDrive30d",
              "Erstzulassung ab, Kilometer bis",
              "Farbe und Innenausstattung",
              "Ausstattung, auf die Sie nicht verzichten wollen",
              "Ihr Budget",
            ].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ul>
        </aside>
        <section className="rounded-3xl border bg-card p-6 sm:p-10 lg:col-span-8">
          <h2 className="text-2xl font-semibold tracking-tight">Suchauftrag</h2>
          <p className="mt-2 mb-8 text-muted-foreground">Unverbindlich und kostenlos.</p>
          <Suspense>
            <InquiryForm defaultTopic="suchauftrag" hideTopic submitLabel="Suchauftrag senden" />
          </Suspense>
        </section>
      </div>
    </>
  )
}
