import type { MetadataRoute } from "next"

import { legalLinks, navigation } from "@/lib/site"
import { vehicles } from "@/lib/vehicles"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bmw-jw-marhoffer.de"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Array.from(
    new Set([
      "",
      ...navigation.flatMap((g) => g.items.filter((i) => !i.external).map((i) => i.href.split("#")[0])),
      "/kontakt",
      ...legalLinks.map((l) => l.href),
    ])
  )
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}` })),
    ...vehicles.map((v) => ({ url: `${BASE}/fahrzeuge/${v.id}` })),
  ]
}
