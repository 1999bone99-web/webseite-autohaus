import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { contact, headerImages } from "@/lib/content"
import { site } from "@/lib/site"

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
        description="Wir verkaufen Halb- und Jahreswagen mit Wunschausstattung und betreuen sie in unserer eigenen Werkstatt."
      />

      <div className="container-page grid gap-3 py-12 sm:grid-cols-2">
        {headerImages.map((img, i) => (
          <div key={img.src} className={`relative overflow-hidden rounded-2xl border ${i === 0 ? "sm:col-span-2 aspect-[2.56/1]" : "aspect-[2.56/1]"} ${i === 3 ? "sm:col-span-2" : ""}`}>
            <Image src={img.src} alt={img.alt} fill sizes={i === 0 || i === 3 ? "100vw" : "50vw"} className="object-cover" />
          </div>
        ))}
      </div>

      <div className="container-page max-w-3xl py-8">
        <p className="text-xl leading-relaxed text-pretty sm:text-2xl">
          bmw-jw-marhoffer ist ein mittelständisches Unternehmen in Mühlhausen im Kraichgau, in dem es familiär zugeht.
          Neben dem Verkauf kümmern wir uns um Service und Reparatur rund um Ihren BMW.
        </p>
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
