import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  CalendarIcon,
  CarIcon,
  PhoneCallIcon,
  PhoneIcon,
  SlidersHorizontalIcon,
  WalletIcon,
  WrenchIcon,
} from "lucide-react"

import { FeaturedCarousel } from "@/components/home/featured-carousel"
import { HeroSlideshow } from "@/components/home/hero-slideshow"
import { QuickSearch } from "@/components/home/quick-search"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { headerImages } from "@/lib/content"
import { serializeInventory } from "@/lib/search-params"
import { site } from "@/lib/site"
import { stockCategories, vehicles } from "@/lib/vehicles"

const featured = [...vehicles]
  .filter((v) => v.images.length > 0)
  .sort((a, b) => b.firstRegistration.localeCompare(a.firstRegistration))
  .slice(0, 8)

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
  { href: "/probefahrt", icon: CalendarIcon, title: "Probefahrt", text: "Termin online anfragen" },
  { href: "/finanzierung", icon: WalletIcon, title: "Finanzierung & Leasing", text: "Laufzeiten 12 bis 60 Monate" },
  { href: "/werkstatt", icon: CarIcon, title: "Hol- und Bringservice", text: "Zum Werkstatttermin" },
  { href: "/kontakt?anliegen=rueckruf", icon: PhoneCallIcon, title: "Rückrufservice", text: "Wir melden uns bei Ihnen" },
]

export default function HomePage() {
  return (
    <>
      {/* Hero: eigene Fotos des Autohauses, randlos */}
      <section className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-neutral-950 text-white lg:min-h-[min(86svh,860px)]">
        <HeroSlideshow images={headerImages} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
        <div className="container-page relative pt-32 pb-10 lg:pb-16">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.18em] text-white/75 uppercase">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {vehicles.length} Fahrzeuge verfügbar
            </span>
            <span aria-hidden>/</span>
            <span>Mühlhausen · Kraichgau · seit {site.foundedYear}</span>
          </p>
          <h1 className="text-balance-tight mt-5 max-w-4xl text-[2.6rem] leading-[1.02] font-semibold sm:text-6xl xl:text-7xl">
            BMW mit Wunsch&shy;ausstattung.{" "}
            <span className="text-white/70">Bis zu {site.maxSavingPercent} % unter dem damaligen Neupreis.</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-white/80 sm:text-lg">
            Junge Gebrauchte und Jahreswagen vom 5er bis zum X7, vom Diesel bis zum iX. Gewartet in unserer eigenen
            Werkstatt.
          </p>
          <div className="mt-8 max-w-4xl text-foreground">
            <QuickSearch />
          </div>
        </div>
      </section>

      {/* Service-Leiste */}
      <section className="border-b bg-card">
        <ul className="container-page grid grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.href} className="border-border not-last:border-r max-lg:nth-[2]:border-r-0 max-lg:nth-[-n+2]:border-b">
              <Link href={s.href} className="group flex h-full items-center gap-4 px-2 py-6 sm:px-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-brand-foreground">
                  <s.icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold sm:text-base">{s.title}</span>
                  <span className="block text-xs text-muted-foreground sm:text-sm">{s.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Bestand */}
      <section className="container-page py-20 lg:py-28">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Frisch eingetroffen" title="Aktuell auf dem Hof">
            Jedes Fahrzeug mit vollständigem Datenblatt und, wo bekannt, dem Abstand zum Listenneupreis.
          </SectionHeading>
          <Button asChild variant="outline" className="rounded-full">
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

      {/* Leistungen */}
      <section className="container-page py-20 lg:py-28">
        <SectionHeading eyebrow="Was wir anders machen" title="Kein Großhändler. Kein Online-Portal. Ein Autohaus mit Telefonnummer." />
        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          <Reveal className="lg:col-span-4">
            <div className="relative flex h-full min-h-80 flex-col justify-between overflow-hidden rounded-3xl bg-foreground p-8 text-background dark:bg-card dark:text-foreground">
              <SlidersHorizontalIcon className="size-6 opacity-70" />
              <div className="relative z-10 max-w-md">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Ausstattung, die man sonst bestellen müsste</h3>
                <p className="mt-3 opacity-70">
                  Unsere Fahrzeuge kommen häufig mit Paketen, die im Neuwagen-Konfigurator schnell fünfstellig
                  werden. Head-Up Display, Pano-Dach, Anhängerkupplung. Bei uns stehen sie schon auf dem Hof.
                </p>
              </div>
              <Image
                src="/images/kopfbilder/bmw-rot.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                className="pointer-events-none -z-0 hidden object-cover object-[70%_center] opacity-60 [mask-image:linear-gradient(to_right,transparent_30%,black)] md:block"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-2">
            <Link href="/finanzierung" className="group flex h-full min-h-80 flex-col justify-between rounded-3xl border bg-brand-soft p-8">
              <WalletIcon className="size-6 text-brand" />
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Finanzierung & Leasing</h3>
                <p className="mt-3 text-muted-foreground">
                  Zielfinanzierung mit 12 bis 60 Monaten Laufzeit oder Leasing. Die Konditionen besprechen wir persönlich.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  Mehr erfahren <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.04} className="lg:col-span-3">
            <Link href="/werkstatt" className="group flex h-full flex-col justify-between gap-10 rounded-3xl border bg-card p-8">
              <WrenchIcon className="size-6" />
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Eigene Werkstatt</h3>
                <p className="mt-3 text-muted-foreground">
                  Wartung und Reparatur mit Originalteilen. Auf Wunsch holen wir Ihr Fahrzeug zu Hause ab und bringen es
                  zurück.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                  Termin anfragen <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="flex h-full flex-col justify-between gap-10 rounded-3xl border bg-card p-8">
              <PhoneIcon className="size-6" />
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Beratung am Telefon</h3>
                <p className="mt-3 text-muted-foreground">
                  Wir beschreiben das Auto so genau, wie Sie es brauchen, und beantworten Fragen, bevor Sie
                  sich festlegen. Auch wenn Sie von weiter weg anrufen.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <a href={site.phone.sales.href} className="font-mono text-lg font-medium hover:underline">
                    {site.phone.sales.display}
                  </a>
                  <Link href="/kontakt?anliegen=rueckruf" className="text-sm font-medium text-brand hover:underline">
                    Rückruf anfordern
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ablauf */}
      <section className="border-t py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Ablauf" title="Vom Inserat bis zur Übergabe" />
          </div>
          <ol className="grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:col-span-8">
            {[
              ["Anfragen", "Per Formular direkt am Fahrzeug oder telefonisch während der Verkaufszeiten."],
              ["Beraten lassen", "Wir klären Ausstattung, Zustand und Finanzierung. Auf Wunsch schicken wir zusätzliche Fotos."],
              ["Probefahrt", "Termin online anfragen und das Fahrzeug in Mühlhausen in Ruhe Probe fahren."],
              ["Übergabe", "Abholung bei uns in Mühlhausen. Danach kümmert sich unsere Werkstatt um Ihren BMW."],
            ].map(([t, d], i) => (
              <li key={t} className="bg-card p-8">
                <span className="font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Suchauftrag */}
      <section className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-14 text-brand-foreground sm:px-12 lg:py-20">
            <div className="bg-grid absolute inset-0 opacity-15 [--border:white]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-xs tracking-[0.18em] uppercase opacity-80">Suchauftrag</p>
                <h2 className="text-balance-tight mt-3 text-3xl font-semibold sm:text-5xl">
                  Ihr Wunsch-BMW ist gerade nicht dabei?
                </h2>
                <p className="mt-4 text-lg opacity-80">
                  Sagen Sie uns Modell, Farbe, Budget und die Ausstattung, auf die Sie nicht verzichten wollen.
                  Wir melden uns, sobald ein passendes Fahrzeug reinkommt.
                </p>
              </div>
              <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-6 text-base">
                <Link href="/wunschfahrzeug">
                  Suchauftrag anlegen <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}

