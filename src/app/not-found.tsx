import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container-page grid place-items-center py-32 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="text-balance-tight mt-4 text-4xl font-semibold sm:text-5xl">Dieses Fahrzeug ist schon weg.</h1>
      <p className="mt-3 text-muted-foreground">Oder die Seite hat es nie gegeben. Im Bestand finden Sie bestimmt etwas.</p>
      <Button asChild className="mt-8 rounded-full">
        <Link href="/fahrzeuge">Zum Bestand</Link>
      </Button>
    </div>
  )
}
