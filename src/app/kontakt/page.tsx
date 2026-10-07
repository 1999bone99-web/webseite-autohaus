import type { Metadata } from "next"
import { Suspense } from "react"
import { MapPinIcon, NavigationIcon } from "lucide-react"

import { ContactInquiry } from "@/components/forms/contact-inquiry"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt",
  description: `${site.legalName}, ${site.address.street}, ${site.address.zip} ${site.address.city}.`,
}

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Kontakt" }]}
        title="Sprechen Sie mit uns"
        description="Am schnellsten geht es telefonisch während der Verkaufszeiten. Oder Sie schreiben uns, dann melden wir uns."
      />

      <div className="container-page grid gap-12 py-12 lg:grid-cols-12">
        <div className="grid content-start gap-4 lg:col-span-5">
          {[
            { title: "Verkauf", phone: site.phone.sales, hours: site.hours.sales },
            { title: "Werkstatt", phone: site.phone.workshop, hours: site.hours.workshop },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border bg-card p-6">
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{b.title}</p>
              <a href={b.phone.href} className="mt-2 block text-2xl font-semibold tracking-tight hover:text-brand">
                {b.phone.display}
              </a>
              <dl className="mt-4 grid gap-1 text-sm">
                {b.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{h.days}</dt>
                    <dd className="text-right font-mono">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="relative overflow-hidden rounded-2xl border bg-card">
            <div className="bg-grid relative grid h-48 place-items-center bg-muted/50">
              <span className="grid size-12 place-items-center rounded-full bg-brand text-brand-foreground shadow-lg ring-8 ring-brand/15">
                <MapPinIcon className="size-5" />
              </span>
            </div>
            <div className="flex items-end justify-between gap-4 p-6">
              <address className="text-sm not-italic">
                <span className="font-semibold">{site.legalName}</span>
                <br />
                {site.address.street} ({site.address.addition})
                <br />
                {site.address.zip} {site.address.city} · {site.address.region}
              </address>
              <Button asChild variant="outline" className="shrink-0 rounded-full">
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <NavigationIcon /> Route
                </a>
              </Button>
            </div>
          </div>
        </div>

        <section className="rounded-3xl border bg-card p-6 sm:p-10 lg:col-span-7">
          <h2 className="text-2xl font-semibold tracking-tight">Nachricht schreiben</h2>
          <p className="mt-2 mb-8 text-muted-foreground">Für Fahrzeugfragen, Suchaufträge, Export oder Finanzierung.</p>
          <Suspense fallback={<Skeleton className="h-[560px]" />}>
            <ContactInquiry />
          </Suspense>
        </section>
      </div>
    </>
  )
}
