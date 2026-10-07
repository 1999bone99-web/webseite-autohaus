import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { contact, headerImages } from "@/lib/content"
import { site } from "@/lib/site"
import { vehicles } from "@/lib/vehicles"

export const metadata: Metadata = {
  title: "Über uns",
  description: `Seit ${site.foundedYear} spezialisiert auf BMW Halb- und Jahreswagen mit Wunschausstattung.`,
}

export default function UeberUnsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Über uns" }]}
        title={`Seit ${site.foundedYear} spezialisiert auf BMW`}
        description="Wir verkaufen Halb- und Jahreswagen mit Wunschausstattung. Ein mittelständisches Unternehmen mit familiärer Atmosphäre und eigener Werkstatt."
      />

      <div className="container-page grid gap-3 py-12 sm:grid-cols-2">
        {headerImages.map((img, i) => (
          <div key={img.src} className={`relative overflow-hidden rounded-3xl border ${i === 0 ? "sm:col-span-2 aspect-[2.56/1]" : "aspect-[2.56/1]"} ${i === 3 ? "sm:col-span-2" : ""}`}>
            <Image src={img.src} alt={img.alt} fill sizes={i === 0 || i === 3 ? "100vw" : "50vw"} className="object-cover" />
          </div>
        ))}
      </div>

      <div className="container-page grid gap-12 py-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-2xl leading-snug font-medium tracking-tight text-pretty sm:text-3xl">
            Die familiäre Atmosphäre gehört neben unseren Serviceleistungen und der hohen Kundenzufriedenheit zu dem, was
            uns ausmacht. Wir sind Dienstleister rund um das BMW Automobil.
          </p>
        </div>
        <dl className="grid content-start gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:col-span-5">
          {[
            ["Gegründet", String(site.foundedYear)],
            ["Fahrzeuge im Bestand", String(vehicles.length)],
            ["Preisvorteil", `bis ${site.maxSavingPercent} %`],
            ["Standort", `${site.address.city}, ${site.address.region}`],
          ].map(([k, v]) => (
            <div key={k} className="bg-card p-6">
              <dt className="font-mono text-xs text-muted-foreground">{k}</dt>
              <dd className="mt-1 text-xl font-semibold tracking-tight">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="container-page flex flex-wrap gap-3 pt-8">
        <Button asChild className="rounded-full">
          <Link href="/ansprechpartner">
            Ihre Ansprechpartner <ArrowRightIcon />
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <a href={contact.reviewsUrl} target="_blank" rel="noopener noreferrer">
            Kundenstimmen auf mobile.de <ArrowUpRightIcon />
          </a>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/karriere">Karriere</Link>
        </Button>
      </div>
    </>
  )
}
