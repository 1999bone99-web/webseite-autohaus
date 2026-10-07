import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  children,
  className,
  align = "left",
}: {
  title: React.ReactNode
  children?: React.ReactNode
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <h2 className="text-balance-tight text-3xl font-semibold sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">{children}</p>}
    </div>
  )
}
