import type { Metadata } from "next"

import { LegalPage } from "@/components/shared/legal-page"
import content from "@/content/rechtliches/barrierefreiheit.md"

export const metadata: Metadata = { title: "Barrierefreiheitserklärung" }

export default function Page() {
  return (
    <LegalPage
      title="Barrierefreiheitserklärung"
      content={content}
      notice="Diese Erklärung stammt von der bisherigen Webseite und bezieht sich auf deren Aufbau. Für die neue Seite muss der Stand der Barrierefreiheit neu bewertet werden."
    />
  )
}
