import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRightIcon, CalendarIcon, ExternalLinkIcon, ImagesIcon, PhoneIcon } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { SectionHeading } from "@/components/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FinanceCalculator } from "@/components/vehicle/finance-calculator"
import { CompareButton, FavoriteButton } from "@/components/vehicle/garage-buttons"
import { InquiryDialog } from "@/components/vehicle/inquiry-dialog"
import { SavingMeter } from "@/components/vehicle/saving-meter"
import { VehicleCard } from "@/components/vehicle/vehicle-card"
import { EquipmentList } from "@/components/vehicle/equipment-list"
import { VehicleGallery } from "@/components/vehicle/vehicle-gallery"
import { contact } from "@/lib/content"
import { getEquipment } from "@/lib/equipment"
import { formatKm, formatPrice, formatRegistration } from "@/lib/format"
import { site } from "@/lib/site"
import { getVehicle, kwToPs, similarVehicles, STOCK_DATE, vehicles } from "@/lib/vehicles"

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }))
}

export async function generateMetadata({ params }: PageProps<"/fahrzeuge/[id]">): Promise<Metadata> {
  const { id } = await params
  const v = getVehicle(id)
  if (!v) return {}
  return {
    title: v.name,
    description: `${v.category}, EZ ${formatRegistration(v.firstRegistration)}, ${formatKm(v.mileage)}, ${kwToPs(v.powerKw)} PS, ${formatPrice(v.price)}.`,
  }
}

const co2Scale = ["A", "B", "C", "D", "E", "F", "G"] as const
const TRIVIAL = /^(Radio|USB|Wegfahrsperre|Elektronische Wegfahrsperre|Zentralverriegelung|Servolenkung|Elektron\. Stabilitätsprogramm|Fensterheber elektrisch|Außenspiegel elektrisch|Bordcomputer|Alufelgen|Radio \/ CD|Freisprecheinrichtung)/

export default async function VehiclePage({ params }: PageProps<"/fahrzeuge/[id]">) {
  const { id } = await params
  const v = getVehicle(id)
  if (!v) notFound()

  const name = v.name
  const equipment = getEquipment(v.id)
  // Die Standardgruppen aus dem Inserat (Radio, USB, Wegfahrsperre …) sagen bei diesen Fahrzeugen wenig.
  // Sie erscheinen nur, wenn die Beschreibung keine Sonderausstattung nennt.
  const equipmentItems = equipment.special.length
    ? equipment.special
    : equipment.groups.flatMap((g) => g.items).filter((i) => !TRIVIAL.test(i))
  const specs: [string, string][] = [
    ["Inserat-Nr.", v.adId],
    ...(v.trim ? [["Inseratstitel", v.trim] as [string, string]] : []),
    ["Fahrzeugart", v.category],
    ["Erstzulassung", formatRegistration(v.firstRegistration)],
    ["Kilometerstand", formatKm(v.mileage)],
    ["Leistung", `${v.powerKw} kW (${kwToPs(v.powerKw)} PS)`],
    ["Kraftstoff", v.fuel],
    ...(v.transmission ? [["Getriebe", v.transmission] as [string, string]] : []),
    ...(v.bodyLabel ? [["Karosserie", v.bodyLabel] as [string, string]] : []),
    ["Farbe", v.color.name],
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name,
    brand: { "@type": "Brand", name: v.make },
    mileageFromOdometer: { "@type": "QuantitativeValue", value: v.mileage, unitCode: "KMT" },
    color: v.color.name,
    image: v.images.length ? v.images : undefined,
    vehicleModelDate: v.firstRegistration.slice(0, 4),
    fuelType: v.fuel,
    offers: {
      "@type": "Offer",
      price: v.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "AutoDealer", name: site.legalName },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader
        crumbs={[{ href: "/fahrzeuge", label: "Fahrzeuge" }, { label: v.name }]}
        title={v.name}
        description={v.highlights.length ? v.highlights.slice(0, 4).join(" · ") : undefined}
      >
        <div className="flex gap-2">
          <Badge variant="outline" className="rounded-full px-3 py-1">{v.category}</Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1">{v.fuel}</Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1 font-mono">{v.adId}</Badge>
        </div>
      </PageHeader>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="relative">
            <VehicleGallery vehicle={v} />
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <CompareButton id={v.id} />
              <FavoriteButton id={v.id} />
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4">
            {[
              ["Erstzulassung", formatRegistration(v.firstRegistration)],
              ["Laufleistung", formatKm(v.mileage)],
              ["Leistung", `${kwToPs(v.powerKw)} PS`],
              ["Kraftstoff", v.fuel],
            ].map(([k, val]) => (
              <div key={k} className="bg-card p-5">
                <dt className="font-mono text-xs text-muted-foreground">{k}</dt>
                <dd className="mt-1 text-lg font-semibold tracking-tight">{val}</dd>
              </div>
            ))}
          </dl>

          <Tabs defaultValue="ausstattung" className="mt-12">
            <TabsList className="h-11 w-full justify-start overflow-x-auto sm:w-auto">
              <TabsTrigger value="ausstattung" className="px-4">Ausstattung</TabsTrigger>
              <TabsTrigger value="daten" className="px-4">Technische Daten</TabsTrigger>
              <TabsTrigger value="umwelt" className="px-4">Verbrauch & Umwelt</TabsTrigger>
            </TabsList>

            <TabsContent value="ausstattung" className="mt-6">
              <div className="flex flex-wrap gap-2">
                {v.highlights.map((h) => (
                  <Badge key={h} className="rounded-full bg-brand-soft px-3 py-1 text-brand">{h}</Badge>
                ))}
              </div>
              {equipmentItems.length > 0 ? (
                <div className="mt-8">
                  <h3 className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Ausstattung laut Inserat
                  </h3>
                  <EquipmentList items={equipmentItems} />
                </div>
              ) : (
                <p className="mt-8 text-sm text-muted-foreground">Details zur Ausstattung nennen wir Ihnen gern auf Anfrage.</p>
              )}
            </TabsContent>

            <TabsContent value="daten" className="mt-6">
              <Table>
                <TableBody>
                  {specs.map(([k, val]) => (
                    <TableRow key={k}>
                      <TableCell className="w-1/2 text-muted-foreground">{k}</TableCell>
                      <TableCell className="font-medium">{val}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="umwelt" className="mt-6">
              {v.consumption || v.co2 != null || v.co2Class ? (
                <div className="grid gap-8 sm:grid-cols-2">
                  <dl className="grid content-start gap-4 text-sm">
                    {v.consumption && (
                      <div>
                        <dt className="text-muted-foreground">Energieverbrauch kombiniert</dt>
                        <dd className="mt-1 font-mono text-lg">{v.consumption}</dd>
                      </div>
                    )}
                    {v.co2 != null && (
                      <div>
                        <dt className="text-muted-foreground">CO₂-Emissionen kombiniert</dt>
                        <dd className="mt-1 font-mono text-lg">{v.co2} g/km</dd>
                      </div>
                    )}
                  </dl>
                  {v.co2Class && (
                    <div>
                      <p className="text-sm text-muted-foreground">CO₂-Klasse</p>
                      <ol className="mt-2 grid gap-1">
                        {co2Scale.map((c, i) => (
                          <li key={c} className="flex items-center gap-2">
                            <span
                              className="flex h-6 items-center rounded-r-md pl-2 font-mono text-xs font-semibold text-white"
                              style={{
                                width: `${30 + i * 10}%`,
                                backgroundColor: `oklch(${0.55 + i * 0.02} 0.16 ${150 - i * 22})`,
                              }}
                            >
                              {c}
                            </span>
                            {c === v.co2Class && <span className="font-mono text-xs font-semibold">◀ {c}</span>}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Im Inserat sind keine Verbrauchswerte angegeben. Wir nennen sie Ihnen gern auf Anfrage.
                </p>
              )}
              <p className="mt-6 text-xs text-muted-foreground">Werte wie im Inserat des Autohauses angegeben.</p>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="min-w-0 lg:col-span-4">
          <div className="sticky top-24 grid gap-4">
            <div className="rounded-2xl border bg-card p-6">
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Unser Preis</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight">{formatPrice(v.price)}</p>
              <p className="mt-1 text-xs text-muted-foreground">inkl. MwSt. · Stand {STOCK_DATE}</p>
              <SavingMeter vehicle={v} detailed className="mt-6" />
              <Separator className="my-6" />
              <div className="grid gap-2">
                <InquiryDialog vehicleId={v.id} vehicleName={name} />
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href={site.phone.sales.href}>
                    <PhoneIcon /> {site.phone.sales.display}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href={`/probefahrt?fahrzeug=${v.id}`}>
                    <CalendarIcon /> Probefahrt vereinbaren
                  </Link>
                </Button>
                <CompareButton id={v.id} withLabel className="rounded-full" />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Verkauf: {site.hours.sales.map((h) => `${h.days} ${h.time}`).join(", ")}
              </p>
              <Link
                href={`/inzahlungnahme?fahrzeug=${v.id}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
              >
                Ihr jetziges Auto in Zahlung geben <ArrowRightIcon className="size-3.5" />
              </Link>
              {(v.photosOnRequest || v.images.length === 0) && (
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(`Fotos zu ${v.name}, Inserat ${v.adId}`)}`}
                  className="mt-4 flex items-start gap-3 rounded-xl bg-muted p-3 text-sm transition hover:bg-accent"
                >
                  <ImagesIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    <span className="block font-medium">
                      {v.images.length ? "Weitere Fotos per E-Mail" : "Fotos per E-Mail anfordern"}
                    </span>
                    <span className="text-muted-foreground">Wir schicken Ihnen gern zusätzliche Bilder zu diesem Fahrzeug.</span>
                  </span>
                </a>
              )}
              <a
                href={v.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Original-Inserat {v.adId} <ExternalLinkIcon className="size-3" />
              </a>
            </div>
            <FinanceCalculator price={v.price} />
          </div>
        </aside>
      </div>

      <section className="container-page mt-16 pb-24 lg:pb-0">
        <SectionHeading title="Ähnliche Fahrzeuge" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {similarVehicles(v).map((o) => (
            <VehicleCard key={o.id} vehicle={o} />
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="link" className="px-0">
            <Link href="/fahrzeuge">Zurück zum gesamten Bestand</Link>
          </Button>
        </div>
      </section>

      {/* Mobile Aktionsleiste */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/90 p-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="mr-auto">
            <p className="text-lg leading-none font-semibold">{formatPrice(v.price)}</p>
            <p className="font-mono text-[11px] whitespace-nowrap text-muted-foreground">{formatKm(v.mileage)} · EZ {formatRegistration(v.firstRegistration)}</p>
          </div>
          <Button asChild size="icon-lg" variant="outline" className="rounded-full" aria-label="Anrufen">
            <a href={site.phone.sales.href}>
              <PhoneIcon />
            </a>
          </Button>
          <InquiryDialog vehicleId={v.id} vehicleName={name} />
        </div>
      </div>
    </>
  )
}
