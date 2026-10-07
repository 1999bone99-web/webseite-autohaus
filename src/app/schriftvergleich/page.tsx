import type { Metadata } from "next"
import { Archivo, Barlow_Semi_Condensed, Open_Sans } from "next/font/google"
import Image from "next/image"
import { ArrowRightIcon } from "lucide-react"

import { LogoMark } from "@/components/layout/logo"
import { headerImages } from "@/lib/content"
import { cn } from "@/lib/utils"

/**
 * Interne Vergleichsseite für die Schriftwahl. Nicht verlinkt, nicht indexiert.
 * Nach der Entscheidung wieder löschen.
 */
export const metadata: Metadata = { title: "Schriftvergleich", robots: { index: false, follow: false } }

const barlow = Barlow_Semi_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-barlow" })
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" })
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-opensans" })

const variants = [
  {
    key: "A",
    title: "A · Geist (aktuell)",
    note: "Neutral und sauber, wirkt eher nach Software-Produkt.",
    heading: "font-sans font-semibold tracking-[-0.035em]",
  },
  {
    key: "B",
    title: "B · Barlow Semi Condensed",
    note: "An DIN angelehnt, schmal, erinnert an Beschilderung und Technik. Fließtext bleibt Geist.",
    heading: "font-[family-name:var(--font-barlow)] font-semibold tracking-[-0.01em]",
  },
  {
    key: "C",
    title: "C · Archivo (leicht schmal)",
    note: "Kräftige Grotesk mit technischem Charakter, etwas wärmer als B. Fließtext bleibt Geist.",
    heading: "font-[family-name:var(--font-archivo)] font-semibold tracking-[-0.012em] [font-stretch:90%]",
  },
]

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-baseline font-[family-name:var(--font-opensans)] text-[21px] leading-none", className)}>
      bmw<span className="mx-px text-[0.62em]">-jw-</span>marhoffer
    </span>
  )
}

export default function Schriftvergleich() {
  return (
    <div className={cn(barlow.variable, archivo.variable, openSans.variable, "container-page py-12")}>
      <h1 className="text-3xl font-semibold tracking-tight">Schriftvergleich</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Gleiche Inhalte, drei Überschriften-Schriften. Die Wortmarke ist in allen Varianten in Open Sans gesetzt,
        das kommt der Schrift im Original-Logo am nächsten.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-8 rounded-2xl border bg-neutral-900 p-6 text-white">
        <div>
          <p className="mb-2 font-mono text-xs text-white/60">Original (PNG der alten Seite)</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.bmw-jw-marhoffer.de/fileadmin/Resources/Public/Bootstrap/images/logo-bmw-marhoffer.png" alt="Original-Logo" className="h-9 w-auto" />
        </div>
        <div>
          <p className="mb-2 font-mono text-xs text-white/60">Nachbau mit Open Sans</p>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-[24px]" />
            <Wordmark />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-16">
        {variants.map((v) => (
          <section key={v.key} aria-labelledby={`v-${v.key}`}>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={`v-${v.key}`} className="text-xl font-semibold">
                {v.title}
              </h2>
              <p className="text-sm text-muted-foreground">{v.note}</p>
            </div>

            <div className="relative isolate overflow-hidden rounded-3xl bg-neutral-950 text-white">
              <Image src={headerImages[0].src} alt="" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
              <div className="relative px-6 pt-40 pb-10 sm:px-10">
                <p className="font-mono text-xs tracking-[0.18em] text-white/75 uppercase">
                  94 Fahrzeuge verfügbar / Mühlhausen · seit 1988
                </p>
                <p className={cn("mt-4 max-w-4xl text-5xl leading-[1.02] sm:text-6xl xl:text-7xl", v.heading)}>
                  BMW mit Wunschausstattung. <span className="text-white/70">Bis zu 45 % unter dem damaligen Neupreis.</span>
                </p>
                <p className="mt-5 max-w-xl text-white/80 sm:text-lg">
                  Junge Gebrauchte und Jahreswagen vom 5er bis zum X7, vom Diesel bis zum iX. Gewartet in unserer
                  eigenen Werkstatt.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border bg-card p-6 lg:col-span-2">
                <p className="font-mono text-xs tracking-[0.18em] text-brand uppercase">Frisch eingetroffen</p>
                <p className={cn("mt-3 text-4xl sm:text-5xl", v.heading)}>Aktuell auf dem Hof</p>
                <p className="mt-3 text-muted-foreground">
                  Jedes Fahrzeug mit vollständigem Datenblatt und, wo bekannt, dem Abstand zum Listenneupreis.
                </p>
              </div>
              <div className="rounded-2xl border bg-card p-6">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">X5 · Grau</p>
                <p className={cn("mt-1 text-2xl", v.heading)}>BMW X5 xDrive30d</p>
                <p className="mt-1 text-sm text-muted-foreground">M Sportpaket Pro · Panorama-Glasdach · Luftfederung</p>
                <dl className="mt-4 grid grid-cols-3 gap-2 border-y py-3 font-mono text-xs">
                  {[
                    ["EZ", "02/2026"],
                    ["km", "19.500"],
                    ["PS", "286"],
                  ].map(([k, val]) => (
                    <div key={k}>
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="mt-0.5 font-medium">{val}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 flex items-end justify-between">
                  <p className={cn("text-3xl", v.heading)}>83.900 €</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Details <ArrowRightIcon className="size-4" />
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
