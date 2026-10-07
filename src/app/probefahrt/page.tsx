import type { Metadata } from "next"
import { Suspense } from "react"

import { UrlInquiry } from "@/components/forms/url-inquiry"
import { PageHeader } from "@/components/shared/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { headerImages } from "@/lib/content"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Probefahrt",
  description: "Vereinbaren Sie eine Probefahrt mit Ihrem Wunschfahrzeug bei Marhoffer in Mühlhausen.",
}

export default function ProbefahrtPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/fahrzeuge", label: "Fahrzeuge" }, { label: "Probefahrt" }]}
        title="Probefahrt vereinbaren"
        description="Vereinbaren Sie eine Probefahrt mit Ihrem Wunschfahrzeug. Wählen Sie das Fahrzeug aus dem Bestand und nennen Sie uns Ihren Wunschtermin."
        image={headerImages[0]}
      />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-12">
        <aside className="grid content-start gap-3 text-sm lg:col-span-4">
          <h2 className="text-lg font-semibold tracking-tight">Verkaufszeiten</h2>
          <dl className="grid gap-1">
            {site.hours.sales.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{h.days}</dt>
                <dd className="text-right font-mono">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-muted-foreground">
            Bitte bringen Sie zur Probefahrt Ihren Führerschein mit. Wir bestätigen den Termin persönlich.
          </p>
        </aside>
        <section className="rounded-3xl border bg-card p-6 sm:p-10 lg:col-span-8">
          <h2 className="text-2xl font-semibold tracking-tight">Terminwunsch</h2>
          <p className="mt-2 mb-8 text-muted-foreground">Nennen Sie im Nachrichtenfeld gern zwei, drei mögliche Tage.</p>
          <Suspense fallback={<Skeleton className="h-[600px]" />}>
            <UrlInquiry fallbackTopic="probefahrt" pickVehicle hideTopic submitLabel="Probefahrt anfragen" />
          </Suspense>
        </section>
      </div>
    </>
  )
}
