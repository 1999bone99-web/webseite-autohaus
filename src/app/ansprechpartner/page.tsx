import type { Metadata } from "next"
import { MailIcon, PhoneIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { contact, team } from "@/lib/content"
import { site } from "@/lib/site"

export const metadata: Metadata = { title: "Ansprechpartner" }


export default function AnsprechpartnerPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/ueber-uns", label: "Unternehmen" }, { label: "Ansprechpartner" }]}
        title="Ihre Ansprechpartner"
        description="Hier finden Sie den richtigen Ansprechpartner für Ihr Anliegen."
      >
        <div className="rounded-2xl border bg-card p-5">
          <p className="font-mono text-xs text-muted-foreground uppercase">Zentrale</p>
          <a href={site.phone.sales.href} className="mt-1 block text-xl font-semibold tracking-tight hover:text-brand">
            {site.phone.sales.display}
          </a>
          <a href={`mailto:${contact.email}`} className="text-sm text-brand hover:underline">
            {contact.email}
          </a>
        </div>
      </PageHeader>
      <div className="container-page grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((p) => (
          <article key={p.name} className="flex flex-col rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold tracking-tight">{p.name}</h2>
            <p className="text-sm text-muted-foreground">{p.role}</p>
            <div className="mt-6 grid gap-2">
              <Button asChild variant="outline" className="justify-start rounded-full">
                <a href={`tel:${p.tel}`}>
                  <PhoneIcon /> {p.phone}
                </a>
              </Button>
              <Button asChild variant="ghost" className="justify-start rounded-full">
                <a href={`mailto:${p.email}`}>
                  <MailIcon /> {p.email}
                </a>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
