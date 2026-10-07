import type { Metadata } from "next"
import { MailIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { contact, jobs } from "@/lib/content"

export const metadata: Metadata = { title: "Karriere" }

export default function KarrierePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/ueber-uns", label: "Unternehmen" }, { label: "Karriere" }]}
        title="Arbeiten bei Marhoffer"
        description="Ein mittelständisches Unternehmen, seit über 30 Jahren auf BMW Halb- und Jahreswagen spezialisiert. Familiäre Atmosphäre, ein sympathisches Team und ein moderner Arbeitsplatz."
        image={{ src: "/images/service/werkstatt.jpg", alt: "Arbeit an der Bremsanlage in der Werkstatt" }}
      />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-semibold tracking-tight">Offene Stellen</h2>
          <p className="mt-2 text-muted-foreground">Bewerbungen bitte per E-Mail.</p>
          <Button asChild className="mt-6 rounded-full">
            <a href={`mailto:${contact.email}?subject=Bewerbung`}>
              <MailIcon /> {contact.email}
            </a>
          </Button>
        </div>
        <Accordion type="single" collapsible defaultValue={jobs[0].title} className="lg:col-span-8">
          {jobs.map((j) => (
            <AccordionItem key={j.title} value={j.title}>
              <AccordionTrigger className="text-lg">{j.title}</AccordionTrigger>
              <AccordionContent className="grid gap-4 text-base">
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Ihre Aufgaben</h3>
                  <p className="mt-1">{j.tasks}</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Ihr Profil</h3>
                  <p className="mt-1">{j.profile}</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Was Sie erwartet</h3>
                  <p className="mt-1">
                    Ein sympathisches Team, abwechslungsreiche Aufgaben an einem modernen Arbeitsplatz in einem
                    dynamischen mittelständischen Unternehmen.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}
