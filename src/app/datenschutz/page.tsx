import type { Metadata } from "next"

import { LegalPage } from "@/components/shared/legal-page"
import content from "@/content/rechtliches/datenschutz.md"

export const metadata: Metadata = { title: "Datenschutz" }

export default function Page() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      content={content}
      notice="Diese Erklärung stammt von der bisherigen Webseite. Sie beschreibt dort eingesetzte Dienste (u. a. Hosting bei webauto.de, Google Analytics, AddThis), die auf dieser Seite nicht verwendet werden. Vor dem Livegang muss sie an die neue Seite angepasst werden."
    />
  )
}
