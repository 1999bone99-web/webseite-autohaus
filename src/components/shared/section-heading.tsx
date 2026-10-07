import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  align = "left",
}: {
  eyebrow?: string
  title: React.ReactNode
  children?: React.ReactNode
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-xs tracking-[0.18em] text-brand uppercase">{eyebrow}</p>
      )}
      <h2 className="text-balance-tight mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">{children}</p>}
    </div>
  )
}
