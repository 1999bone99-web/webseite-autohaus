"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeartIcon, MenuIcon, PhoneIcon, ScaleIcon } from "lucide-react"

import { CommandMenu } from "@/components/layout/command-menu"
import { Logo } from "@/components/layout/logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { navigation, site } from "@/lib/site"
import { categories, vehicles } from "@/lib/vehicles"
import { cn } from "@/lib/utils"
import { useGarage } from "@/stores/garage"

function CountBadge({ count }: { count: number }) {
  if (!count) return null
  return (
    <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-brand font-mono text-[10px] font-medium text-brand-foreground">
      {count}
    </span>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const favorites = useGarage((s) => s.favorites.length)
  const compare = useGarage((s) => s.compare.length)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="container-page flex h-16 items-center gap-4">
        <Logo className="mr-2" />

        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Fahrzeuge</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[520px] grid-cols-2 gap-1 p-2">
                  <li className="col-span-2">
                    <NavigationMenuLink asChild>
                      <Link href="/fahrzeuge" className="flex-row items-center justify-between rounded-lg bg-muted p-4">
                        <span>
                          <span className="block font-medium">Gesamter Bestand</span>
                          <span className="text-muted-foreground">
                            {vehicles.length} Fahrzeuge sofort verfügbar
                          </span>
                        </span>
                        <span className="font-mono text-xs text-brand">
                          bis −{site.maxSavingPercent} %
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {categories.map((c) => (
                    <li key={c.name}>
                      <NavigationMenuLink asChild>
                        <Link href={`/fahrzeuge?kategorie=${encodeURIComponent(c.name)}`} className="rounded-lg p-3">
                          <span className="font-medium">{c.name}</span>
                          <span className="line-clamp-2 text-muted-foreground">{c.description}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {navigation.slice(1).map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  active={pathname.startsWith(item.href)}
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-1">
          <CommandMenu />
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/vergleich" aria-label={`Vergleich (${compare})`}>
              <ScaleIcon />
              <CountBadge count={compare} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/merkliste" aria-label={`Merkliste (${favorites})`}>
              <HeartIcon />
              <CountBadge count={favorites} />
            </Link>
          </Button>
          <ThemeToggle />
          <Button asChild className="ml-2 hidden rounded-full xl:inline-flex">
            <a href={site.phone.sales.href}>
              <PhoneIcon />
              {site.phone.sales.display}
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menü öffnen">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <SheetHeader>
                <SheetTitle>Menü</SheetTitle>
                <SheetDescription>{site.claim}</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b py-4 text-2xl font-semibold tracking-tight"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Separator className="my-2 opacity-0" />
              <div className="mt-auto grid gap-2 p-4">
                <Button asChild size="lg" className="rounded-full">
                  <a href={site.phone.sales.href}>
                    <PhoneIcon /> Verkauf anrufen
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href={site.phone.workshop.href}>Werkstatt anrufen</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
