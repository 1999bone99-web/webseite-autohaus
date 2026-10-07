import type { Metadata } from "next"

import { LegalPage } from "@/components/shared/legal-page"
import content from "@/content/rechtliches/barrierefreiheit.md"

export const metadata: Metadata = { title: "Barrierefreiheitserklärung" }

export default function Page() {
  return (
    <LegalPage
      title="Barrierefreiheitserklärung"
      content={content}
      notice="Entwurf für die neue Seite, auf Basis einer automatisierten Prüfung (axe-core, alle Seiten) und eines Tastaturtests. Vor dem Livegang klären, ob das Barrierefreiheitsstärkungsgesetz greift und welche Durchsetzungs- oder Schlichtungsstelle genannt werden muss."
    />
  )
}
