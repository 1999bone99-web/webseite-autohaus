import type { Metadata } from "next"

import { LegalPage } from "@/components/shared/legal-page"
import content from "@/content/rechtliches/impressum.md"

export const metadata: Metadata = { title: "Impressum" }

export default function Page() {
  return <LegalPage title="Impressum" content={content} />
}
