import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function PageHeader({
  title,
  description,
  crumbs,
  children,
  image,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  crumbs: { href?: string; label: string }[]
  children?: React.ReactNode
  /** Optionales Bild rechts neben dem Titel */
  image?: { src: string; alt: string }
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-60" />
      <div className="container-page relative py-12 sm:py-16">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Start</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.map((c) => (
              <Fragment key={c.label}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {c.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={c.href}>{c.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{c.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-balance-tight text-4xl font-semibold sm:text-5xl lg:text-6xl">{title}</h1>
            {description && <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">{description}</p>}
            {image && children && <div className="mt-6">{children}</div>}
          </div>
          {image ? (
            <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-3xl border lg:w-[44%]">
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </section>
  )
}
