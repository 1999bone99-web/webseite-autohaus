import Link from "next/link"

import { LogoMark } from "@/components/layout/logo"
import { contact } from "@/lib/content"
import { legalLinks, navigation, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-foreground text-background dark:bg-card dark:text-foreground">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <LogoMark className="[&_path]:stroke-foreground [&_rect]:fill-background dark:[&_path]:stroke-background dark:[&_rect]:fill-foreground" />
            <span className="text-lg font-semibold tracking-tight">Marhoffer</span>
          </div>
          <p className="mt-6 max-w-sm text-2xl leading-snug font-medium tracking-tight text-balance">
            BMW Halb- und Jahreswagen mit Wunschausstattung. Seit {site.foundedYear} in Mühlhausen.
          </p>
          <address className="mt-8 text-sm leading-relaxed not-italic opacity-80">
            {site.legalName}
            <br />
            {site.address.street} / {site.address.addition}
            <br />
            {site.address.zip} {site.address.city}
            <br />
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </address>
        </div>

        <div className="grid gap-8 text-sm sm:grid-cols-2 md:grid-cols-4 lg:col-span-8">
          {navigation.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-xs tracking-wider uppercase opacity-60">{group.label}</h3>
              <ul className="mt-4 grid gap-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="opacity-80 hover:underline hover:opacity-100"
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-mono text-xs tracking-wider uppercase opacity-60">Kontakt</h3>
            <dl className="mt-4 grid gap-3">
              <div>
                <dt className="opacity-60">Verkauf</dt>
                <dd>
                  <a href={site.phone.sales.href} className="hover:underline">
                    {site.phone.sales.display}
                  </a>
                </dd>
                {site.hours.sales.map((h) => (
                  <dd key={h.days} className="text-xs opacity-70">
                    {h.days}: {h.time}
                  </dd>
                ))}
              </div>
              <div>
                <dt className="opacity-60">Werkstatt</dt>
                <dd>
                  <a href={site.phone.workshop.href} className="hover:underline">
                    {site.phone.workshop.display}
                  </a>
                </dd>
                {site.hours.workshop.map((h) => (
                  <dd key={h.days} className="text-xs opacity-70">
                    {h.days}: {h.time}
                  </dd>
                ))}
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="border-t border-current/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.foundedYear}–2026 {site.legalName}. BMW ist eine eingetragene Marke der BMW AG.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Rechtliches">
            {legalLinks.map((n) => (
              <Link key={n.href} href={n.href} className="hover:underline">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
