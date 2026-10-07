import type { Metadata } from "next"
import { ClockIcon, PhoneIcon } from "lucide-react"

import { WorkshopForm } from "@/components/forms/workshop-form"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { workshopServices } from "@/lib/schemas"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Werkstatt",
  description: `BMW Service und Reparatur in ${site.address.city}. Termin online anfragen.`,
}

export default function WerkstattPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Werkstatt" }]}
        title="Service und Reparatur für Ihren BMW"
        description="Unsere Werkstatt arbeitet mit dem technischen Know-how, das ein BMW verlangt. Egal ob Sie Ihr Auto bei uns gekauft haben oder nicht."
      >
        <Button asChild size="lg" className="rounded-full">
          <a href={site.phone.workshop.href}>
            <PhoneIcon /> {site.phone.workshop.display}
          </a>
        </Button>
      </PageHeader>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-12">
        <aside className="grid content-start gap-6 lg:col-span-4">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="flex items-center gap-2 font-semibold">
              <ClockIcon className="size-4 text-brand" /> Werkstattzeiten
            </h2>
            <dl className="mt-4 grid gap-3 text-sm">
              {site.hours.workshop.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
                  <dt className="text-muted-foreground">{h.days}</dt>
                  <dd className="text-right font-mono">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="font-semibold">Leistungen</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {workshopServices.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="rounded-3xl border bg-card p-6 sm:p-10 lg:col-span-8">
          <h2 className="text-2xl font-semibold tracking-tight">Termin anfragen</h2>
          <p className="mt-2 mb-8 text-muted-foreground">
            Sie wählen einen Wunschtag, wir melden uns mit einer Bestätigung oder einem Alternativvorschlag.
          </p>
          <WorkshopForm />
        </section>
      </div>
    </>
  )
}
