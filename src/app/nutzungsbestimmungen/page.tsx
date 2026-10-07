import type { Metadata } from "next"

import { LegalPage } from "@/components/shared/legal-page"
import content from "@/content/rechtliches/nutzungsbestimmungen.md"

export const metadata: Metadata = { title: "Nutzungsbestimmungen" }

export default function Page() {
  return <LegalPage title="Nutzungsbestimmungen" content={content} />
}
