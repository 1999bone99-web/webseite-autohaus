import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { PageHeader } from "@/components/shared/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { rims } from "@/lib/content"
import { formatPrice } from "@/lib/format"

export const metadata: Metadata = {
  title: "Kompletträder",
  description: "Kompletträder für BMW X5, X6, X7, 5er und 7er.",
}

export default function KomplettraederPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/werkstatt", label: "Service" }, { label: "Kompletträder" }]}
        title="Kompletträder für Ihren BMW"
        description="Bei Fragen melden Sie sich gern. Nennen Sie uns einfach die Anfragenummer."
      />
      <div className="container-page grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {rims.map((r) => (
          <article key={r.image} className="flex flex-col overflow-hidden rounded-2xl border bg-card">
            <div className="relative grid aspect-square place-items-center bg-white">
              <Image src={r.image} alt={r.title} width={220} height={200} className="h-auto max-h-[80%] w-auto object-contain" />
              {r.ref && (
                <Badge variant="outline" className="absolute top-3 left-3 rounded-full bg-background/90 font-mono">
                  Nr. {r.ref}
                </Badge>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h2 className="leading-snug font-semibold tracking-tight">{r.title}</h2>
              <p className="text-sm text-muted-foreground">{r.tyre}</p>
              <div className="mt-auto flex items-end justify-between pt-4">
                <p className="text-xl font-semibold tracking-tight">{r.price ? formatPrice(r.price) : "Preis auf Anfrage"}</p>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href="/kontakt?anliegen=sonstiges">Anfragen</Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="container-page text-xs text-muted-foreground">Preise inkl. MwSt. Stand laut bisheriger Webseite (Mai 2025).</p>
    </>
  )
}
