"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CarFrontIcon, FileTextIcon, SearchIcon, WrenchIcon } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { formatPrice } from "@/lib/format"
import { vehicles } from "@/lib/vehicles"

const pages = [
  { href: "/fahrzeuge", label: "Alle Fahrzeuge", icon: CarFrontIcon },
  { href: "/werkstatt", label: "Werkstatttermin vereinbaren", icon: WrenchIcon },
  { href: "/export", label: "Export & Auslandsauslieferung", icon: FileTextIcon },
  { href: "/kontakt", label: "Kontakt & Anfahrt", icon: FileTextIcon },
  { href: "/merkliste", label: "Merkliste", icon: FileTextIcon },
  { href: "/vergleich", label: "Fahrzeugvergleich", icon: FileTextIcon },
]

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="hidden h-9 w-56 justify-between rounded-full px-3 font-normal text-muted-foreground shadow-none lg:flex"
      >
        <span className="flex items-center gap-2">
          <SearchIcon />
          Modell, Ausstattung …
        </span>
        <Kbd>⌘K</Kbd>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Suche öffnen"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Suche"
        description="Fahrzeuge und Seiten durchsuchen"
      >
        <CommandInput placeholder="z. B. X5, Luftfederung, Inserat-Nr. …" />
        <CommandList>
          <CommandEmpty>Nichts gefunden. Rufen Sie uns gern an.</CommandEmpty>
          <CommandGroup heading="Fahrzeuge">
            {vehicles.map((v) => (
              <CommandItem
                key={v.id}
                value={`${v.name} ${v.trim} ${v.series} ${v.fuel} ${v.category} ${v.color.name} ${v.adId} ${v.highlights.join(" ")}`}
                onSelect={() => go(`/fahrzeuge/${v.id}`)}
              >
                <span
                  className="size-3 shrink-0 rounded-full ring-1 ring-border"
                  style={{ backgroundColor: v.color.hex }}
                />
                <span className="truncate">
                  {v.name} <span className="text-muted-foreground">{v.trim}</span>
                </span>
                <CommandShortcut className="font-mono tracking-normal">
                  {formatPrice(v.price)}
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Seiten">
            {pages.map((p) => (
              <CommandItem key={p.href} value={p.label} onSelect={() => go(p.href)}>
                <p.icon />
                {p.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
