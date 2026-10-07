import type { Metadata } from "next"
import { Suspense } from "react"

import { TradeInForm } from "@/components/forms/trade-in-form"
import { PageHeader } from "@/components/shared/page-header"
import { headerImages } from "@/lib/content"

export const metadata: Metadata = {
  title: "Inzahlungnahme",
  description: "Sie möchten Ihr bisheriges Fahrzeug abgeben? Beschreiben Sie es kurz, wir melden uns mit einer Einschätzung.",
}

export default function InzahlungnahmePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/fahrzeuge", label: "Fahrzeuge" }, { label: "Inzahlungnahme" }]}
        title="Ihr bisheriges Fahrzeug"
        description="Wenn Sie beim Kauf Ihr jetziges Auto abgeben möchten, beschreiben Sie es uns kurz. Wir sehen uns die Angaben an und sagen Ihnen, ob und zu welchen Bedingungen wir es in Zahlung nehmen."
        image={headerImages[2]}
      />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-12">
        <aside className="grid content-start gap-4 text-sm lg:col-span-4">
          <h2 className="text-lg font-semibold tracking-tight">So geht es weiter</h2>
          <p className="text-muted-foreground">
            Nach Ihrer Anfrage melden wir uns telefonisch oder per E-Mail. Fotos vom Fahrzeug, vom Innenraum und vom
            Kilometerstand helfen uns bei der Einschätzung. Die können Sie uns dann einfach per E-Mail schicken.
          </p>
        </aside>
        <section className="rounded-2xl border bg-card p-6 sm:p-10 lg:col-span-8">
          <h2 className="text-2xl font-semibold tracking-tight">Fahrzeug beschreiben</h2>
          <p className="mt-2 mb-8 text-muted-foreground">Unverbindlich und kostenlos.</p>
          <Suspense>
            <TradeInForm />
          </Suspense>
        </section>
      </div>
    </>
  )
}
