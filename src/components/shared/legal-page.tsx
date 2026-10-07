import { InfoIcon } from "lucide-react"

import { Markdown } from "@/components/shared/markdown"
import { PageHeader } from "@/components/shared/page-header"

export function LegalPage({
  title,
  content,
  notice,
  children,
}: {
  title: string
  content: string
  /** Hinweis, wenn der Text für die neue Seite noch angepasst werden muss */
  notice?: string
  children?: React.ReactNode
}) {
  return (
    <>
      <PageHeader crumbs={[{ label: title }]} title={title} />
      <div className="container-page max-w-4xl py-12">
        {notice && (
          <div className="mb-10 flex gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm">
            <InfoIcon className="mt-0.5 size-4 shrink-0 text-amber-600" />
            <p>{notice}</p>
          </div>
        )}
        {children}
        <Markdown>{content}</Markdown>
      </div>
    </>
  )
}
