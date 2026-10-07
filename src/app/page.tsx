import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { FeaturedCarousel } from "@/components/home/featured-carousel"
import { QuickSearch } from "@/components/home/quick-search"
import { Button } from "@/components/ui/button"
import { serializeInventory } from "@/lib/search-params"
import { site } from "@/lib/site"
import { savingPercent, stockCategories, vehicles } from "@/lib/vehicles"

const featured = [...vehicles]
  .filter((v) => v.images.length > 0)
  .sort((a, b) => b.firstRegistration.localeCompare(a.firstRegistration))
  .slice(0, 8)

const savings = vehicles.map(savingPercent).filter((x): x is number => x != null)
const averageSaving = Math.round(savings.reduce((s, x) => s + x, 0) / savings.length)

const quickFilters = [
  ...stockCategories.map((c) => ({
    label: c.name,
    count: vehicles.filter((v) => v.category === c.name).length,
    href: serializeInventory("/fahrzeuge", { kategorie: [c.name] }),
  })),
  ...(["Elektro", "Hybrid"] as const).map((f) => ({
    label: f,
    count: vehicles.filter((v) => v.fuel === f).length,
    href: serializeInventory("/fahrzeuge", { kraftstoff: [f] }),
  })),
  {
    label: "SUV",
    count: vehicles.filter((v) => v.body === "suv").length,
    href: serializeInventory("/fahrzeuge", { karosserie: ["suv"] }),
  },
  {
    label: "bis 60.000 €",
    count: vehicles.filter((v) => v.price <= 60_000).length,
    href: serializeInventory("/fahrzeuge", { preisMax: 60_000 }),
  },
]

const services = [
  { href: "/probefahrt", title: "Probefahrt", text: "Termin online anfragen" },
  { href: "/finanzierung", title: "Finanzierung & Leasing", text: "Laufzeiten von 12 bis 60 Monaten" },
  { href: "/werkstatt", title: "Werkstatt", text: "Mit Hol- und Bringservice" },
  { href: "/kontakt?anliegen=rueckruf", title: "Rückruf", text: "Wir melden uns bei Ihnen" },
]

export default function HomePage() {
  return (
    <>
      {/* Hero: ein ruhiges, eigenes Foto des Autohauses */}
      <section className="relative isolate flex min-h-[600px] items-end overflow-hidden bg-neutral-950 text-white lg:min-h-[min(80svh,800px)]">
        <Image
          src="/images/kopfbilder/bmw-blau.jpg"
          alt="Blauer BMW X6 mit dem Kennzeichen des Autohauses im Parkhaus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="container-page relative pt-32 pb-10 lg:pb-16">
          <h1 className="text-balance-tight max-w-3xl text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl">
            BMW mit Wunschausstattung, bis zu {site.maxSavingPercent} % unter Neupreis.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-white/80 sm:text-lg">
            Seit {site.foundedYear} in Mühlhausen. Derzeit {vehicles.length} Fahrzeuge im Bestand.
          </p>
          <div className="mt-8 max-w-4xl text-foreground">
            <QuickSearch />
          </div>
        </div>
      </section>

      {/* Service-Leiste */}
      <nav aria-label="Service" className="border-b bg-card">
        <ul className="container-page grid grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.href} className="border-border not-last:border-r max-lg:nth-[2]:border-r-0 max-lg:nth-[-n+2]:border-b">
              <Link href={s.href} className="group flex h-full items-center justify-between gap-3 px-3 py-5 sm:px-6">
                <span>
                  <span className="block text-sm font-semibold sm:text-base">{s.title}</span>
                  <span className="block text-xs text-muted-foreground sm:text-sm">{s.text}</span>
                </span>
                <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bestand */}
      <section className="container-page py-20 lg:py-24">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-balance-tight text-3xl font-semibold sm:text-4xl">Aktuell auf dem Hof</h2>
            <p className="mt-3 text-muted-foreground">
              Die neuesten Fahrzeuge mit Fotos. Wo das Inserat den Listenneupreis nennt, steht der Abstand darunter.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/fahrzeuge">
              Alle {vehicles.length} Fahrzeuge <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <nav aria-label="Schnellfilter" className="mb-8 flex flex-wrap gap-2">
          {quickFilters.map((f) => (
            <Link
              key={f.label}
              href={f.href}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm transition hover:border-foreground/30 hover:bg-muted"
            >
              {f.label}
              <span className="font-mono text-xs text-muted-foreground">{f.count}</span>
            </Link>
          ))}
        </nav>
        <FeaturedCarousel vehicles={featured} />
      </section>

      {/* Über das Haus */}
      <section className="border-t py-20 lg:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/4]">
            <Image
              src="/images/kopfbilder/bmw-weiss.jpg"
              alt="Weißer BMW 2er Gran Coupé mit dem Kennzeichen des Autohauses"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-xl">
            <h2 className="text-balance-tight text-3xl font-semibold sm:text-4xl">Gut ausgestattete BMW zu fairen Preisen</h2>
            <div className="mt-6 grid gap-4 text-pretty text-muted-foreground">
              <p>
                Seit {site.foundedYear} verkaufen wir Halb- und Jahreswagen von BMW. Die meisten haben Pakete an Bord, die
                man beim Neuwagen einzeln dazubestellen müsste. Bei den Fahrzeugen, deren Inserat den Listenneupreis
                nennt, liegt unser Preis im Schnitt {averageSaving} % darunter.
              </p>
              <p>
                Zum Haus gehört eine eigene Werkstatt. Auf Wunsch holen wir Ihr Auto für den Service zu Hause ab und bringen
                es danach zurück.
              </p>
              <p>
                Fragen zu einem Fahrzeug beantworten wir am liebsten am Telefon. Wenn Ihnen ein Rückruf lieber ist,
                hinterlassen Sie uns Ihre Nummer.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href={site.phone.sales.href}>{site.phone.sales.display}</a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/kontakt?anliegen=rueckruf">Rückruf anfordern</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Wunschfahrzeug */}
      <section className="container-page">
        <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Wunschfahrzeug</h2>
            <p className="mt-2 text-muted-foreground">
              Wenn Ihr Modell gerade nicht im Bestand ist, beschreiben Sie uns, was Sie suchen. Wir melden uns, sobald ein
              passendes Fahrzeug reinkommt.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link href="/wunschfahrzeug">
              Suchauftrag anlegen <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
