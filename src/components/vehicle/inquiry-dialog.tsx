"use client"

import { useState } from "react"
import { MailIcon } from "lucide-react"

import { InquiryForm } from "@/components/forms/inquiry-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function InquiryDialog({
  vehicleId,
  vehicleName,
  className,
}: {
  vehicleId: string
  vehicleName: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className={cn("rounded-full", className)}>
          <MailIcon />
          Fahrzeug anfragen
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{vehicleName}</DialogTitle>
          <DialogDescription>
            Fragen zu Zustand, Ausstattung oder Verfügbarkeit? Wir melden uns persönlich.
          </DialogDescription>
        </DialogHeader>
        <InquiryForm vehicleId={vehicleId} vehicleName={vehicleName} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
