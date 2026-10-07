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

      <div className="container-page grid max-w-3xl gap-6 py-12 text-pretty sm:text-lg">
        <p>
          Bis zu 70 % aller Steinschläge lassen sich reparieren. Meist ist das in weniger als einer Stunde erledigt, und oft
          übernimmt die Kaskoversicherung die Kosten, ohne Anrechnung auf Ihre Selbstbeteiligung. Wir arbeiten dabei mit
          hochwertigen Materialien und Werkzeugen.
        </p>
        <p>
          Eine beschädigte Scheibe beeinträchtigt Ihre Sicht und Ihre Sicherheit. Wann genau repariert werden darf, sagt
          Ihnen Ihr Service-Berater im persönlichen Gespräch. Ist der Schaden nicht mehr zu reparieren, tauschen wir die
          Scheibe aus. Jede BMW Originalscheibe können wir spätestens am Folgetag liefern.
        </p>
        <p className="rounded-xl bg-muted p-5 text-sm sm:text-base">
          Öffnungszeiten Glasservice: Mo – Fr 08:00 – 17:00 Uhr · Telefon{" "}
          <a href={site.phone.workshop.href} className="font-medium text-brand hover:underline">
            {site.phone.workshop.display}
          </a>
        </p>
      </div>
    </>
  )
}
