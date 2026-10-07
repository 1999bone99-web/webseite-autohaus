import type { Metadata } from "next"
import { DownloadIcon } from "lucide-react"

import { LegalPage } from "@/components/shared/legal-page"
import { Button } from "@/components/ui/button"
import content from "@/content/rechtliches/agb.md"

export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen" }

export default function Page() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen" content={content}>
      <Button asChild variant="outline" className="mb-10 rounded-full">
        <a href="/downloads/agb.pdf" download>
          <DownloadIcon /> AGB als PDF
        </a>
      </Button>
    </LegalPage>
  )
}
