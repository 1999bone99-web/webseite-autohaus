"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRightIcon, HeartIcon, MenuIcon, PhoneIcon, ScaleIcon } from "lucide-react"

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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navigation, site } from "@/lib/site"
import { stockCategories, vehicles } from "@/lib/vehicles"
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

        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList>
            {navigation.map((group) => (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent",
                    group.items.some((i) => !i.external && pathname.startsWith(i.href.split("#")[0])) && "text-brand"
                  )}
                >
                  {group.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[520px] grid-cols-2 gap-1 p-2">
                    {group.label === "Fahrzeuge" && (
                      <li className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link href="/fahrzeuge" className="flex-row items-center justify-between rounded-lg bg-muted p-4">
                            <span>
                              <span className="block font-medium">{vehicles.length} Fahrzeuge im Bestand</span>
                              <span className="text-muted-foreground">
                                {stockCategories.map((c) => `${vehicles.filter((v) => v.category === c.name).length} ${c.name}`).join(" · ")}
                              </span>
                            </span>
                            <span className="font-mono text-xs text-brand">bis −{site.maxSavingPercent} %</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    )}
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="rounded-lg p-3"
                            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            <span className="flex items-center gap-1 font-medium">
                              {item.label}
                              {item.external && <ArrowUpRightIcon className="size-3 text-muted-foreground" />}
                            </span>
                            <span className="line-clamp-2 text-muted-foreground">{item.description}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                active={pathname.startsWith("/kontakt")}
                className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
              >
                <Link href="/kontakt">Kontakt</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
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
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menü öffnen">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm gap-0">
              <SheetHeader>
                <SheetTitle>Menü</SheetTitle>
                <SheetDescription>{site.claim}</SheetDescription>
              </SheetHeader>
              <nav className="flex-1 overflow-y-auto px-4">
                <Accordion type="single" collapsible defaultValue={navigation.find((g) => g.items.some((i) => pathname.startsWith(i.href.split("#")[0])))?.label}>
                  {navigation.map((group) => (
                    <AccordionItem key={group.label} value={group.label}>
                      <AccordionTrigger className="text-2xl font-semibold tracking-tight hover:no-underline">
                        {group.label}
                      </AccordionTrigger>
                      <AccordionContent className="grid gap-1">
                        {group.items.map((item) => (
                          <SheetClose asChild key={item.href}>
                            <Link
                              href={item.href}
                              className="flex items-center justify-between rounded-lg px-2 py-2.5 text-base hover:bg-muted"
                              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {item.label}
                              {item.external && <ArrowUpRightIcon className="size-4 text-muted-foreground" />}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <SheetClose asChild>
                  <Link href="/kontakt" className="block border-b py-4 text-2xl font-semibold tracking-tight">
                    Kontakt
                  </Link>
                </SheetClose>
              </nav>
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
