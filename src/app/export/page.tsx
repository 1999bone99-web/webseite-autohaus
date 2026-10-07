import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { SectionHeading } from "@/components/shared/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Export",
  description: "BMW Jahreswagen aus Deutschland, ausgeliefert ins Ausland.",
}

/* Ablauf und FAQ sind Entwürfe. Vor Livegang mit dem Autohaus abstimmen. */
const steps = [
  ["Fahrzeug auswählen", "Aus dem Bestand oder per Suchauftrag. Wir schicken Ihnen auf Wunsch zusätzliche Fotos und Unterlagen."],
  ["Angebot & Vertrag", "Sie erhalten ein schriftliches Angebot. Bei Kunden aus der EU klären wir vorab die Umsatzsteuerfrage."],
  ["Zahlung", "Per Überweisung. Das Fahrzeug wird für Sie reserviert, sobald der Vertrag unterschrieben ist."],
  ["Abholung oder Transport", "Sie holen selbst in Mühlhausen ab oder wir sprechen den Transport gemeinsam ab."],
]

const faq = [
  [
    "In welche Länder liefern Sie?",
    "Wir verkaufen an Kunden im Inland und im Ausland. Ob die Auslieferung in Ihr Land möglich ist, klären wir am schnellsten in einem kurzen Telefonat.",
  ],
  [
    "Wie läuft das mit der Mehrwertsteuer?",
    "Das hängt davon ab, ob Sie Privatperson oder Unternehmen sind und in welches Land das Fahrzeug geht. Wir erklären Ihnen vorab, welcher Preis für Sie gilt.",
  ],
  [
    "Welche Unterlagen bekomme ich?",
    "Fahrzeugpapiere, Kaufvertrag und die für die Zulassung in Ihrem Land üblichen Dokumente. Was genau benötigt wird, besprechen wir je Land.",
  ],
  [
    "Kann ich das Auto vorher sehen?",
    "Natürlich. Sie können vorbeikommen oder sich das Fahrzeug per Video und zusätzlichen Fotos zeigen lassen.",
  ],
]

export default function ExportPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Export" }]}
        title="BMW aus Deutschland. Geliefert dorthin, wo Sie wohnen."
        description="Ein Teil unserer Kunden kommt nicht aus der Region. Für sie gehört die Auslieferung ins Ausland zum normalen Geschäft."
      />

      <section className="container-page py-16">
        <ol className="grid gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-card p-8">
              <span className="font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-6 text-lg font-semibold tracking-tight">{t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page grid gap-12 py-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Häufige Fragen" title="Gut zu wissen" />
          <Button asChild className="mt-8 rounded-full">
            <Link href="/kontakt?anliegen=export">
              Export anfragen <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <Accordion type="single" collapsible className="lg:col-span-8">
          {faq.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-base">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  )
}
