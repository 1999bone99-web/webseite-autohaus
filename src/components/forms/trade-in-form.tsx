"use client"

import { useTransition } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { parseAsString, useQueryState } from "nuqs"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { submitTradeIn } from "@/app/actions"
import { Honeypot } from "@/components/forms/honeypot"
import { VehiclePicker } from "@/components/forms/vehicle-picker"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { accidentOptions, tradeInSchema, type TradeInValues } from "@/lib/schemas"

/** Muss in <Suspense> stehen, weil es ?fahrzeug= aus der URL liest. */
export function TradeInForm() {
  const [fahrzeug] = useQueryState("fahrzeug", parseAsString)
  const [pending, startTransition] = useTransition()
  const form = useForm<TradeInValues>({
    resolver: zodResolver(tradeInSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      model: "",
      firstRegistration: "",
      mileage: "",
      message: "",
      vehicleId: fahrzeug ?? undefined,
      privacy: false as unknown as true,
    },
  })

  const onSubmit = form.handleSubmit((values) =>
    startTransition(async () => {
      const res = await submitTradeIn(values)
      if (res.ok) {
        toast.success("Danke, Ihre Angaben sind angekommen.", {
          description: "Wir sehen uns Ihr Fahrzeug an und melden uns bei Ihnen.",
        })
        form.reset()
      } else toast.error(res.error, { duration: 12_000 })
    })
  )

  return (
    <form onSubmit={onSubmit} noValidate>
      <Honeypot {...form.register("website")} />
      <FieldGroup>
        <Controller
          control={form.control}
          name="model"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="t-model">Ihr Fahrzeug</FieldLabel>
              <Input
                id="t-model"
                placeholder="z. B. BMW 320d Touring, Luxury Line"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-3">
          <Controller
            control={form.control}
            name="firstRegistration"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="t-ez">Erstzulassung</FieldLabel>
                <Input id="t-ez" inputMode="numeric" placeholder="MM/JJJJ" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="mileage"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="t-km">Kilometerstand</FieldLabel>
                <Input id="t-km" inputMode="numeric" placeholder="z. B. 85.000" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="accident"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="t-accident">Unfallschäden</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="t-accident" className="w-full" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {accidentOptions.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="message"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="t-message">Zustand und Ausstattung</FieldLabel>
              <Textarea
                id="t-message"
                rows={4}
                placeholder="Scheckheft, TÜV bis, Reifen, Kratzer oder Dellen, wichtige Ausstattung …"
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="vehicleId"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="t-vehicle">Interesse an einem Fahrzeug aus unserem Bestand?</FieldLabel>
              <VehiclePicker id="t-vehicle" value={field.value} onChange={field.onChange} />
              <FieldDescription>Optional.</FieldDescription>
            </Field>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="t-name">Name</FieldLabel>
                <Input id="t-name" autoComplete="name" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="t-phone">Telefon</FieldLabel>
                <Input id="t-phone" type="tel" autoComplete="tel" {...field} />
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="t-email">E-Mail</FieldLabel>
              <Input id="t-email" type="email" autoComplete="email" aria-invalid={fieldState.invalid} {...field} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="privacy"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="t-privacy"
                checked={field.value}
                onCheckedChange={(c) => field.onChange(c === true)}
                aria-invalid={fieldState.invalid}
              />
              <div className="grid gap-1">
                <FieldLabel htmlFor="t-privacy" className="font-normal">
                  Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage gespeichert werden.
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
          Angaben senden
        </Button>
      </FieldGroup>
    </form>
  )
}
