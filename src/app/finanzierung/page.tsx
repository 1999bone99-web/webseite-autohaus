import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, CheckIcon, MailIcon, PhoneIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { FinanceCalculator } from "@/components/vehicle/finance-calculator"
import { financing } from "@/lib/content"
import { vehicles } from "@/lib/vehicles"

export const metadata: Metadata = {
  title: "Finanzierung & Leasing",
  description: "Zielfinanzierung mit Laufzeiten von 12 bis 60 Monaten oder Leasing als Restwert- oder Kilometerleasing.",
}

const medianPrice = [...vehicles].sort((a, b) => a.price - b.price)[Math.floor(vehicles.length / 2)].price

export default function FinanzierungPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/fahrzeuge", label: "Fahrzeuge" }, { label: "Finanzierung & Leasing" }]}
        title="Finanzierung & Leasing"
        description="Entscheidungsfreiheit mit der Zielfinanzierung oder finanzielle Flexibilität mit Leasing. Die Konditionen besprechen wir persönlich mit Ihnen."
      />
      <div className="container-page grid gap-6 py-12 lg:grid-cols-2">
        <section className="rounded-3xl border bg-card p-8">
          <p className="font-mono text-xs tracking-[0.18em] text-brand uppercase">Eigentum</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{financing.target.title}</h2>
          <p className="mt-4 text-muted-foreground">{financing.target.text}</p>
          <ul className="mt-6 grid gap-2">
            {financing.target.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                {b}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-3xl border bg-card p-8">
          <p className="font-mono text-xs tracking-[0.18em] text-brand uppercase">Flexibilität</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{financing.leasing.title}</h2>
          <p className="mt-4 text-muted-foreground">{financing.leasing.text}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Restwertleasing", "Kilometerleasing", "Leasingsonderzahlung optional"].map((t) => (
              <span key={t} className="rounded-full border px-3 py-1 text-sm">
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="container-page grid gap-12 py-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-semibold tracking-tight">Konditionen erfragen</h2>
          <p className="mt-2 text-muted-foreground">
            Die Finanzierungs- und Leasing-Konditionen erfragen Sie bitte bei Ihren Verkaufsberatern.
          </p>
          <div className="mt-6 grid gap-3">
            {financing.contacts.map((c) => (
              <div key={c.name} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-5">
                <p className="font-medium">{c.name}</p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <a href={`tel:${c.tel}`}>
                      <PhoneIcon /> {c.phone}
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="icon-sm" aria-label={`E-Mail an ${c.name}`}>
                    <a href={`mailto:${c.email}`}>
                      <MailIcon />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/kontakt?anliegen=finanzierung">
              Finanzierung anfragen <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <div className="lg:col-span-7">
          <FinanceCalculator price={medianPrice} />
        </div>
      </div>
    </>
  )
}
