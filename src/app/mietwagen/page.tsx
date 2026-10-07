import type { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react"

import { InquiryForm } from "@/components/forms/inquiry-form"
import { Markdown } from "@/components/shared/markdown"
import { PageHeader } from "@/components/shared/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import mietbedingungen from "@/content/mietbedingungen.md"
import { rental } from "@/lib/content"

export const metadata: Metadata = {
  title: "Mietwagen",
  description: `${rental.vehicle} ab ${rental.rates[0].price} € pro Tag.`,
}

export default function MietwagenPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/werkstatt", label: "Service" }, { label: "Mietwagen" }]}
        title="Mietwagen"
        description="Sie benötigen einen Mietwagen? Fragen Sie die Verfügbarkeit einfach bei uns an."
      />
      <div className="container-page grid gap-12 py-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border">
            <Image src={rental.image} alt={`${rental.vehicle}, Beispielfahrzeug`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Beispielfahrzeug</p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight">{rental.vehicle}</h2>
          <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border bg-border">
            {rental.rates.map((r) => (
              <div key={r.label} className="bg-card p-5">
                <p className="font-mono text-xs text-muted-foreground">{r.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">ab {r.price} €</p>
                <p className="text-xs text-muted-foreground">{r.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Jeder Mehrkilometer {rental.extraKm}.</p>
          <ul className="mt-4 grid gap-1 text-xs text-muted-foreground">
            {rental.footnotes.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="bedingungen">
              <AccordionTrigger>Allgemeine Mietbedingungen</AccordionTrigger>
              <AccordionContent>
                <Markdown className="prose-sm">{mietbedingungen}</Markdown>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <section className="rounded-2xl border bg-card p-6 sm:p-10 lg:col-span-6">
          <h2 className="text-2xl font-semibold tracking-tight">Verfügbarkeit anfragen</h2>
          <p className="mt-2 mb-8 text-muted-foreground">Nennen Sie uns den gewünschten Zeitraum.</p>
          <Suspense>
            <InquiryForm defaultTopic="mietwagen" hideTopic submitLabel="Mietwagen anfragen" />
          </Suspense>
        </section>
      </div>
    </>
  )
}
