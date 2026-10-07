"use client"

import { useRouter } from "next/navigation"
import { HeartIcon, ScaleIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { MAX_COMPARE, useGarage } from "@/stores/garage"

export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const active = useGarage((s) => s.favorites.includes(id))
  const toggle = useGarage((s) => s.toggleFavorite)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-pressed={active}
          aria-label={active ? "Von Merkliste entfernen" : "Auf die Merkliste"}
          onClick={(e) => {
            e.preventDefault()
            toggle(id)
          }}
          className={cn("rounded-full bg-background/80 backdrop-blur", className)}
        >
          <HeartIcon className={cn("transition", active && "fill-red-500 stroke-red-500")} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{active ? "Gemerkt" : "Merken"}</TooltipContent>
    </Tooltip>
  )
}

export function CompareButton({
  id,
  className,
  withLabel = false,
}: {
  id: string
  className?: string
  withLabel?: boolean
}) {
  const active = useGarage((s) => s.compare.includes(id))
  const toggle = useGarage((s) => s.toggleCompare)
  const router = useRouter()
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const result = toggle(id)
    if (result === "full") {
      toast(`Maximal ${MAX_COMPARE} Fahrzeuge vergleichbar`, {
        description: "Entfernen Sie zuerst ein Fahrzeug aus dem Vergleich.",
      })
    } else if (result === "added") {
      toast("Zum Vergleich hinzugefügt", {
        action: { label: "Vergleichen", onClick: () => router.push("/vergleich") },
      })
    }
  }

  if (withLabel) {
    return (
      <Button variant={active ? "secondary" : "outline"} aria-pressed={active} onClick={onClick} className={className}>
        <ScaleIcon />
        {active ? "Im Vergleich" : "Vergleichen"}
      </Button>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-pressed={active}
          aria-label={active ? "Aus Vergleich entfernen" : "Zum Vergleich"}
          onClick={onClick}
          className={cn(
            "rounded-full bg-background/80 backdrop-blur",
            active && "bg-brand text-brand-foreground hover:bg-brand/90",
            className
          )}
        >
          <ScaleIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{active ? "Im Vergleich" : "Vergleichen"}</TooltipContent>
    </Tooltip>
  )
}
