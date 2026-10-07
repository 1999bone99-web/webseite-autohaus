import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, PhoneIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Scheiben- & Glasreparaturen",
  description: "Steinschlag reparieren statt Scheibe tauschen. Meist in unter einer Stunde erledigt.",
}

export default function GlasreparaturPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/werkstatt", label: "Service" }, { label: "Scheiben & Glas" }]}
        title="Reparatur ohne Austausch?"
        description="Ein Glasschaden ist ärgerlich, auch ein kleiner. Die Stabilität der Windschutzscheibe leidet, die Sicht ist beeinträchtigt. Unser Service-Team schafft Klarheit."
        image={{ src: "/images/service/scheibenreparatur.jpg", alt: "Gesprungene Glasscheibe nach Steinschlag" }}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild size="lg" className="rounded-full">
            <a href={site.phone.workshop.href}>
              <PhoneIcon /> {site.phone.workshop.display}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/werkstatt#termin">
              Servicetermin vereinbaren <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </PageHeader>

      <div className="container-page grid gap-4 py-12 md:grid-cols-3">
        {[
          ["bis zu 70 %", "aller Steinschläge sind reparabel."],
          ["unter 1 Stunde", "dauert die Reparatur in den meisten Fällen."],
          ["Folgetag", "Spätestens dann liefern wir jede BMW Originalscheibe, falls ein Austausch nötig ist."],
        ].map(([k, v]) => (
          <div key={k} className="rounded-3xl border bg-card p-8">
            <p className="text-3xl font-semibold tracking-tight">{k}</p>
            <p className="mt-2 text-muted-foreground">{v}</p>
          </div>
        ))}
      </div>

      <div className="container-page grid max-w-4xl gap-6 text-pretty">
        <p>
          Mit der Scheibenreparatur von Marhoffer beheben wir den Glasschaden schnell und günstig und verwenden dabei nur
          hochwertige Materialien und Werkzeuge. Oft trägt die Kaskoversicherung die Kosten, ohne Anrechnung auf Ihre
          Selbstbeteiligung. So sparen Sie sich das Geld für einen Austausch.
        </p>
        <p>
          Eine beschädigte Scheibe beeinträchtigt Ihre Sicht und Ihre Sicherheit. Wann genau repariert werden darf, sagt
          Ihnen Ihr Service-Berater im persönlichen Gespräch. Ist der Schaden nicht mehr zu reparieren, tauschen wir die
          Scheibe gegen eine neue aus.
        </p>
        <p className="rounded-2xl bg-muted p-5 text-sm">
          Öffnungszeiten Glasservice: Mo – Fr 08:00 – 17:00 Uhr · Telefon{" "}
          <a href={site.phone.workshop.href} className="font-medium text-brand hover:underline">
            {site.phone.workshop.display}
          </a>
        </p>
      </div>
    </>
  )
}
