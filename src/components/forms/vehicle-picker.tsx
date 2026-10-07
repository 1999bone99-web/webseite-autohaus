"use client"

import { useState } from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatPrice } from "@/lib/format"
import { getVehicle, vehicles } from "@/lib/vehicles"
import { cn } from "@/lib/utils"

/** Durchsuchbare Fahrzeugauswahl (shadcn Combobox) */
export function VehiclePicker({
  id,
  value,
  onChange,
}: {
  id?: string
  value?: string
  onChange: (id: string | undefined) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = value ? getVehicle(value) : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected ? `${selected.name} · ${selected.adId}` : "Fahrzeug aus dem Bestand wählen (optional)"}
          </span>
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Modell oder Inserat-Nr. …" />
          <CommandList>
            <CommandEmpty>Kein Fahrzeug gefunden.</CommandEmpty>
            <CommandGroup>
              {vehicles.map((v) => (
                <CommandItem
                  key={v.id}
                  value={`${v.name} ${v.trim} ${v.adId}`}
                  onSelect={() => {
                    onChange(v.id === value ? undefined : v.id)
                    setOpen(false)
                  }}
                >
                  <CheckIcon className={cn(v.id === value ? "opacity-100" : "opacity-0")} />
                  <span className="truncate">{v.name}</span>
                  <span className="ml-auto font-mono text-xs text-muted-foreground">{formatPrice(v.price)}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
