import Link from "next/link"

import { LogoMark } from "@/components/layout/logo"
import { navigation, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-foreground text-background dark:bg-card dark:text-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark className="[&_rect]:fill-background [&_path]:stroke-foreground dark:[&_rect]:fill-foreground dark:[&_path]:stroke-background" />
            <span className="text-lg font-semibold tracking-tight">Marhoffer</span>
          </div>
          <p className="mt-6 max-w-sm text-balance text-2xl leading-snug font-medium tracking-tight">
            BMW Halbjahres- und Jahreswagen aus Mühlhausen. Für Kunden in Deutschland und im Ausland.
          </p>
        </div>

        <div className="grid gap-8 text-sm sm:grid-cols-3 md:col-span-7">
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase opacity-60">Adresse</h3>
            <address className="mt-4 leading-relaxed not-italic">
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
            </address>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase opacity-60">Verkauf</h3>
            <a href={site.phone.sales.href} className="mt-4 block hover:underline">
              {site.phone.sales.display}
            </a>
            <ul className="mt-2 space-y-1 opacity-70">
              {site.hours.sales.map((h) => (
                <li key={h.days}>
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase opacity-60">Werkstatt</h3>
            <a href={site.phone.workshop.href} className="mt-4 block hover:underline">
              {site.phone.workshop.display}
            </a>
            <ul className="mt-2 space-y-1 opacity-70">
              {site.hours.workshop.map((h) => (
                <li key={h.days}>
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-current/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.foundedYear}–2026 {site.legalName}. BMW ist eine eingetragene Marke der BMW AG.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navigation.map((n) => (
              <Link key={n.href} href={n.href} className="hover:underline">
                {n.label}
              </Link>
            ))}
            <Link href="/impressum" className="hover:underline">Impressum</Link>
            <Link href="/datenschutz" className="hover:underline">Datenschutz</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
