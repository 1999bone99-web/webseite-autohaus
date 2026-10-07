import type { Metadata } from "next"

import { LegalPage } from "@/components/shared/legal-page"
import content from "@/content/rechtliches/datenschutz.md"

export const metadata: Metadata = { title: "Datenschutz" }

export default function Page() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      content={content}
      notice="Entwurf, angepasst an die Dienste dieser Seite (Hosting bei Vercel, Mailversand über Resend, Fahrzeugfotos von webauto.de). Vor dem Livegang von einer fachkundigen Person prüfen lassen und die Verträge zur Auftragsverarbeitung mit Vercel und Resend abschließen."
    />
  )
}
