"use client"

import { useState } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const VISIBLE = 12

function Items({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
          {i}
        </li>
      ))}
    </ul>
  )
}

/** Zeigt die ersten Ausstattungsmerkmale, der Rest klappt auf Wunsch auf. */
export function EquipmentList({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false)
  if (items.length <= VISIBLE + 3) return <Items items={items} />

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Items items={items.slice(0, VISIBLE)} />
      <CollapsibleContent className="mt-2">
        <Items items={items.slice(VISIBLE)} />
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="mt-6 rounded-full">
          {open ? "Weniger anzeigen" : `Alle ${items.length} Merkmale anzeigen`}
          <ChevronDownIcon className={open ? "rotate-180 transition" : "transition"} />
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  )
}
