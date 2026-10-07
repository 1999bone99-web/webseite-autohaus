import type { MetadataRoute } from "next"

import { vehicles } from "@/lib/vehicles"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bmw-jw-marhoffer.de"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/fahrzeuge", "/werkstatt", "/export", "/kontakt"]
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}` })),
    ...vehicles.map((v) => ({ url: `${BASE}/fahrzeuge/${v.id}` })),
  ]
}
