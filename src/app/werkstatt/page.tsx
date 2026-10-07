import type { Metadata } from "next"
import Link from "next/link"
import { CheckIcon, ClockIcon, PhoneIcon } from "lucide-react"

import { WorkshopForm } from "@/components/forms/workshop-form"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { workshopServices } from "@/lib/content"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Werkstatt",
  description: `Wartung und Reparatur für Ihren BMW in ${site.address.city}. Ausschließlich Originalteile, Hol- und Bringservice.`,
}

export default function WerkstattPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Werkstatt" }]}
        title="Wartung und Reparatur"
        description="Eine fachgerechte Wartung erhöht die Lebensdauer Ihres Fahrzeugs und sorgt für Sicherheit im Straßenverkehr. Bei uns kommen ausschließlich Originalteile zum Einsatz."
        image={{ src: "/images/service/werkstatt.jpg", alt: "Arbeit an der Bremsanlage in der Werkstatt" }}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild size="lg" className="rounded-full">
            <Link href="#termin">Termin anfragen</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a href={site.phone.workshop.href}>
              <PhoneIcon /> {site.phone.workshop.display}
            </a>
          </Button>
        </div>
      </PageHeader>

      <section className="container-page py-12">
        <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Hol- und Bringservice</h2>
              <p className="mt-1 text-muted-foreground">
                Wir holen Ihr Fahrzeug zu Hause ab und bringen es nach dem Werkstatttermin zurück.
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="shrink-0 rounded-full">
            <Link href="#termin">Mit Abholung anfragen</Link>
          </Button>
        </div>
      </section>

      <section className="container-page grid gap-4 md:grid-cols-2">
        {workshopServices.map((s) => (
          <article key={s.title} className="rounded-2xl border bg-card p-8">
            <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
            <p className="mt-2 text-muted-foreground">{s.text}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {s.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                  {i}
                </li>
              ))}
            </ul>
          </article>
        ))}
        <article className="rounded-2xl border bg-card p-8 md:col-span-2">
          <h2 className="text-xl font-semibold tracking-tight">Außerdem</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/glasreparatur">Scheiben- und Glasreparaturen</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/komplettraeder">Kompletträder</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/mietwagen">Mietwagen</Link>
            </Button>
            <span className="inline-flex items-center rounded-full border px-4 text-sm">Karosserie- und Lackarbeiten</span>
          </div>
        </article>
      </section>

      <div id="termin" className="container-page grid scroll-mt-24 gap-12 py-16 lg:grid-cols-12">
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
          <p className="text-sm text-muted-foreground">
            Ansprechpartner Werkstatt: Erdinc Felek,{" "}
            <a href={site.phone.workshop.href} className="text-brand hover:underline">
              {site.phone.workshop.display}
            </a>
          </p>
        </aside>

        <section className="rounded-2xl border bg-card p-6 sm:p-10 lg:col-span-8">
          <h2 className="text-2xl font-semibold tracking-tight">Servicetermin anfragen</h2>
          <p className="mt-2 mb-8 text-muted-foreground">
            Egal ob Wartung, Reparatur, Karosserie- oder Lackarbeiten. Sie wählen einen Wunschtag, wir melden uns mit
            einer Bestätigung oder einem Alternativvorschlag.
          </p>
          <WorkshopForm />
        </section>
      </div>
    </>
  )
}
