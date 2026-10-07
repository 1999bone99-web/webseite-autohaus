"use client"

import { useTransition } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDays, format, isSaturday, isSunday } from "date-fns"
import { de } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { submitWorkshopRequest } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { workshopSchema, workshopServices, type WorkshopValues } from "@/lib/schemas"
import { cn } from "@/lib/utils"

export function WorkshopForm() {
  const [pending, startTransition] = useTransition()
  const form = useForm<WorkshopValues>({
    resolver: zodResolver(workshopSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      model: "",
      licensePlate: "",
      message: "",
      privacy: false as unknown as true,
    },
  })

  const onSubmit = form.handleSubmit((values) =>
    startTransition(async () => {
      const res = await submitWorkshopRequest({ ...values, date: values.date.toISOString() })
      if (res.ok) {
        toast.success("Terminwunsch übermittelt", {
          description: `Wir bestätigen den ${format(values.date, "d. MMMM", { locale: de })} oder schlagen eine Alternative vor.`,
        })
        form.reset()
      } else toast.error(res.error)
    })
  )

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <div className="grid gap-6 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="service"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="service">Leistung</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="service" className="w-full" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {workshopServices.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="date">Wunschtermin</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      aria-invalid={fieldState.invalid}
                      className={cn("justify-start font-normal", !field.value && "text-muted-foreground")}
                    >
                      <CalendarIcon />
                      {field.value ? format(field.value, "EEEE, d. MMMM yyyy", { locale: de }) : "Datum wählen"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={de}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(d) => d < addDays(new Date(), 1) || isSaturday(d) || isSunday(d)}
                    />
                  </PopoverContent>
                </Popover>
                <FieldDescription>Mo – Fr. Wir bestätigen den Termin persönlich.</FieldDescription>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="model"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="model">Fahrzeug</FieldLabel>
                <Input id="model" placeholder="z. B. BMW 320d Touring, 2021" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="plate">Kennzeichen (optional)</FieldLabel>
                <Input id="plate" className="font-mono uppercase" placeholder="HD-AB 123" {...field} />
              </Field>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="w-name">Name</FieldLabel>
                <Input id="w-name" autoComplete="name" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="w-email">E-Mail</FieldLabel>
                <Input id="w-email" type="email" autoComplete="email" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="w-phone">Telefon</FieldLabel>
                <Input id="w-phone" type="tel" autoComplete="tel" {...field} />
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="message"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="w-message">Was sollen wir uns ansehen?</FieldLabel>
              <Textarea id="w-message" rows={3} placeholder="Geräusche, Warnleuchten, Wünsche …" {...field} />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="privacy"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox id="w-privacy" checked={field.value} onCheckedChange={(c) => field.onChange(c === true)} />
              <div className="grid gap-1">
                <FieldLabel htmlFor="w-privacy" className="font-normal">
                  Ich bin einverstanden, dass meine Angaben zur Terminvereinbarung gespeichert werden.
                </FieldLabel>
                <FieldDescription>
                  Details in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
                </FieldDescription>
                <FieldError errors={[fieldState.error]} />
              </div>
            </Field>
          )}
        />

        <Button type="submit" size="lg" className="rounded-full sm:w-fit" disabled={pending}>
          {pending && <Spinner />}
          Terminwunsch senden
        </Button>
      </FieldGroup>
    </form>
  )
}
