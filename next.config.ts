import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Alte Adressen der bisherigen Webseite auf die neuen Seiten umleiten
  async redirects() {
    const map: [string, string][] = [
      ["/fahrzeuge/fahrzeugbestand", "/fahrzeuge"],
      ["/fahrzeuge/fahrzeugsuche", "/fahrzeuge"],
      ["/fahrzeuge/probefahrttermin", "/probefahrt"],
      ["/service/werkstatt", "/werkstatt"],
      ["/service/servicetermin", "/werkstatt#termin"],
      ["/service/finanzierung-leasing", "/finanzierung"],
      ["/service/scheiben-glasreparaturen", "/glasreparatur"],
      ["/kontakt/kontaktformular", "/kontakt"],
      ["/kontakt/rueckrufservice", "/kontakt?anliegen=rueckruf"],
      ["/kontakt/anfahrt", "/kontakt#anfahrt"],
      ["/kontakt/ueber-uns", "/ueber-uns"],
      ["/kontakt/ansprechpartner", "/ansprechpartner"],
      ["/kontakt/stellenangebote", "/karriere"],
      ["/kontakt/impressum", "/impressum"],
      ["/kontakt/datenschutzbestimmungen", "/datenschutz"],
      ["/kontakt/agb", "/agb"],
      ["/kontakt/nutzungsbestimmungen", "/nutzungsbestimmungen"],
      ["/kontakt/barrierefreiheitserklaerung", "/barrierefreiheit"],
      ["/mietwagen/:path+", "/mietwagen"],
    ]
    return map.map(([source, destination]) => ({ source, destination, permanent: true }))
  },
  images: {
    // Fahrzeugfotos aus dem Händlersystem des Autohauses
    remotePatterns: [{ protocol: "https", hostname: "www.webauto.de", pathname: "/imgcars/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
      // Rechtstexte und Bedingungen liegen als Markdown in src/content
      "*.md": { type: "raw" },
    },
  },
}

export default nextConfig
