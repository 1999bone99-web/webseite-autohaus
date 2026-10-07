import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  PhoneIcon,
  SlidersHorizontalIcon,
  WalletIcon,
  WrenchIcon,
} from "lucide-react"

import { FeaturedCarousel } from "@/components/home/featured-carousel"
import { QuickSearch } from "@/components/home/quick-search"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VehiclePhoto } from "@/components/vehicle/vehicle-photo"
import { VehicleVisual } from "@/components/vehicle/vehicle-visual"
import { formatKm, formatPrice, formatRegistration } from "@/lib/format"
import { headerImages } from "@/lib/content"
import { site } from "@/lib/site"
import { kwToPs, savingPercent, stockCategories, vehicles } from "@/lib/vehicles"

const newestFirst = [...vehicles].sort(
  (a, b) =>
    Number(b.images.length > 0) - Number(a.images.length > 0) ||
    b.firstRegistration.localeCompare(a.firstRegistration)
)
const hero =
  newestFirst.find((v) => v.images.length > 0 && v.msrp && v.category === "Jahreswagen") ?? newestFirst[0]

export default function HomePage() {
  const featured = newestFirst.filter((v) => v.id !== hero.id)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_70%_30%,black,transparent)] opacity-70" />
        <div className="container-page relative grid items-center gap-10 pt-10 pb-16 lg:grid-cols-12 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-success" />
                  {vehicles.length} Fahrzeuge verfügbar
                </span>
                <span aria-hidden>/</span>
                <span>Mühlhausen · Kraichgau</span>
              </p>
              <h1 className="text-balance-tight mt-6 text-[2.75rem] leading-[1.02] font-semibold sm:text-6xl xl:text-7xl">
                BMW mit Wunsch&shy;ausstattung.{" "}
                <span className="text-muted-foreground">
                  Bis zu <span className="text-brand">{site.maxSavingPercent} %</span> Preis&shy;vorteil.*
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
                Seit {site.foundedYear} sind wir spezialisiert auf BMW Halb- und Jahreswagen mit
                Wunschausstattung. Vom 5er bis zum X7, vom Diesel bis zum iX. Gewartet in unserer eigenen Werkstatt.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                * zur ehemaligen unverbindlichen Preisempfehlung des Herstellers
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <QuickSearch />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6">
            <Link
              href={`/fahrzeuge/${hero.id}`}
              className="group relative block overflow-hidden rounded-3xl border"
            >
              <VehiclePhoto
                vehicle={hero}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[5/4] transition-transform duration-700 group-hover:scale-[1.02] sm:aspect-[4/3]"
              />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-background/70 to-transparent p-5">
                <div>
                  <Badge className="rounded-full">{hero.category}</Badge>
                  <p className="mt-3 text-xl font-semibold tracking-tight [text-shadow:0_1px_12px_var(--background)]">{hero.name}</p>
                  <p className="text-sm text-muted-foreground [text-shadow:0_1px_12px_var(--background)]">{hero.color.name}</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-background/80 backdrop-blur transition group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
              <dl className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border font-mono text-xs sm:grid-cols-4">
                {[
                  ["Preis", formatPrice(hero.price)],
                  savingPercent(hero) != null
                    ? ["Ersparnis", `−${savingPercent(hero)} %`]
                    : ["Leistung", `${kwToPs(hero.powerKw)} PS`],
                  ["EZ", formatRegistration(hero.firstRegistration)],
                  ["km", formatKm(hero.mileage)],
                ].map(([k, v]) => (
                  <div key={k} className="bg-background/85 px-4 py-3 backdrop-blur">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="mt-0.5 font-medium text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="border-y bg-card">
        <dl className="container-page grid grid-cols-2 divide-x divide-y lg:grid-cols-4 lg:divide-y-0 [&>div]:border-border">
          {[
            { k: "Seit", v: String(site.foundedYear), d: "BMW-Spezialist in Mühlhausen" },
            { k: "Preisvorteil", v: `bis ${site.maxSavingPercent} %`, d: "zur ehemaligen UPE des Herstellers" },
            { k: "Bestand", v: `${vehicles.length} Fahrzeuge`, d: "vom 5er bis zum XM" },
            { k: "Werkstatt", v: "im Haus", d: "mit Hol- und Bringservice" },
          ].map((s) => (
            <div key={s.k} className="px-4 py-8 first:pl-0 sm:px-8 lg:py-10">
              <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{s.k}</dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{s.v}</dd>
              <dd className="mt-1 text-sm text-muted-foreground">{s.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Bestand */}
      <section className="container-page py-20 lg:py-28">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Frisch eingetroffen" title="Aktuell auf dem Hof">
            Jedes Fahrzeug mit vollständigem Datenblatt und dem Abstand zum damaligen Neupreis.
          </SectionHeading>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/fahrzeuge">
              Alle {vehicles.length} Fahrzeuge <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <FeaturedCarousel vehicles={featured.slice(0, 8)} />
      </section>

      {/* Bilder vom Hof */}
      <section aria-label="Eindrücke" className="overflow-hidden pb-20 lg:pb-28">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...headerImages, ...headerImages].map((img, i) => (
            <div key={i} className="relative aspect-[2.56/1] w-[80vw] shrink-0 overflow-hidden rounded-3xl border sm:w-[46rem]">
              <Image src={img.src} alt={i < headerImages.length ? img.alt : ""} fill sizes="(min-width: 640px) 46rem, 80vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Kategorien */}
      <section className="border-y bg-muted/40 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Kurz erklärt" title="Jahreswagen oder Gebrauchtwagen?">
            Die Begriffe klingen ähnlich, bedeuten aber beim Preis und beim Zustand einiges. Der Durchschnitt zeigt den
            Abstand zum Listenneupreis, soweit das Inserat ihn nennt.
          </SectionHeading>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {stockCategories.map((c, i) => {
              const items = vehicles.filter((v) => v.category === c.name)
              const savings = items.map(savingPercent).filter((x): x is number => x != null)
              const avg = savings.length ? Math.round(savings.reduce((s, x) => s + x, 0) / savings.length) : 0
              return (
                <Reveal key={c.name} delay={i * 0.06}>
                  <Link
                    href={`/fahrzeuge?kategorie=${encodeURIComponent(c.name)}`}
                    className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition hover:border-foreground/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                      <ArrowUpRightIcon className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                    </div>
                    <h3 className="mt-10 text-xl font-semibold tracking-tight">{c.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.description}</p>
                    <div className="mt-6 flex items-end justify-between border-t pt-4 font-mono text-xs">
                      <span>{items.length} im Bestand</span>
                      {avg > 0 && <span className="text-brand">Ø −{avg} %</span>}
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
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
              <VehicleVisual
                body="touring"
                color="#1f4f9c"
                stage={false}
                className="pointer-events-none absolute -right-24 -bottom-8 hidden aspect-[2/1] w-[60%] opacity-90 md:block"
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
                <Link href="/kontakt?anliegen=suchauftrag">
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

