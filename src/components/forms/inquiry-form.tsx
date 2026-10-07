"use client"

import { useTransition } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2Icon } from "lucide-react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import { submitInquiry } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { VehiclePicker } from "@/components/forms/vehicle-picker"
import { inquirySchema, type InquiryValues } from "@/lib/schemas"

const topicLabels: Record<InquiryValues["topic"], string> = {
  fahrzeug: "Frage zu einem Fahrzeug",
  suchauftrag: "Suchauftrag",
  probefahrt: "Probefahrt",
  rueckruf: "Rückruf erbeten",
  mietwagen: "Mietwagen",
  finanzierung: "Finanzierung",
  sonstiges: "Sonstiges",
}

const placeholders: Record<InquiryValues["topic"], string> = {
  fahrzeug: "Ist das Fahrzeug noch verfügbar? Gibt es weitere Fotos vom Innenraum?",
  suchauftrag: "z. B. BMW 3er Touring, ab 2024, Diesel oder Hybrid, Anhängerkupplung, Head-Up, bis 45.000 €",
  probefahrt: "Welches Fahrzeug, und wann passt es Ihnen am besten?",
  rueckruf: "Worum geht es? Wann erreichen wir Sie am besten?",
  mietwagen: "Gewünschter Zeitraum, Tag, Wochenende oder Woche?",
  finanzierung: "Anzahlung, Laufzeit, gewünschte Monatsrate …",
  sonstiges: "Wie können wir helfen?",
}

export function InquiryForm({
  vehicleId,
  vehicleName,
  defaultTopic = "fahrzeug",
  onDone,
  pickVehicle = false,
  hideTopic = false,
  submitLabel = "Anfrage senden",
  defaultVehicleId,
}: {
  /** Vorauswahl im Fahrzeugfeld, z. B. aus ?fahrzeug= */
  defaultVehicleId?: string
  vehicleId?: string
  vehicleName?: string
  defaultTopic?: InquiryValues["topic"]
  onDone?: () => void
  /** Fahrzeug aus dem Bestand auswählbar machen, z. B. für Probefahrten */
  pickVehicle?: boolean
  hideTopic?: boolean
  submitLabel?: string
}) {
  const [pending, startTransition] = useTransition()
  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: vehicleName ? `Ich interessiere mich für den ${vehicleName}.` : "",
      topic: defaultTopic,
      vehicleId: vehicleId ?? defaultVehicleId,
      contactPreference: "telefon",
      privacy: false as unknown as true,
    },
  })
  const topic = useWatch({ control: form.control, name: "topic" })

  const onSubmit = form.handleSubmit((values) =>
    startTransition(async () => {
      const res = await submitInquiry(values)
      if (res.ok) {
        toast.success("Danke, Ihre Anfrage ist angekommen.", {
          description: "Wir melden uns während unserer Verkaufszeiten bei Ihnen.",
          icon: <CheckCircle2Icon className="size-4" />,
        })
        form.reset()
        onDone?.()
      } else {
        toast.error(res.error)
      }
    })
  )

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        {pickVehicle && (
          <Controller
            control={form.control}
            name="vehicleId"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="vehicle">Fahrzeug</FieldLabel>
                <VehiclePicker id="vehicle" value={field.value} onChange={field.onChange} />
              </Field>
            )}
          />
        )}

        {!vehicleId && !hideTopic && (
          <Controller
            control={form.control}
            name="topic"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="topic">Anliegen</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="topic" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(topicLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" autoComplete="name" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Telefon</FieldLabel>
                <Input id="phone" type="tel" autoComplete="tel" aria-invalid={fieldState.invalid} {...field} />
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">E-Mail</FieldLabel>
              <Input id="email" type="email" autoComplete="email" aria-invalid={fieldState.invalid} {...field} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="message"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="message">Nachricht</FieldLabel>
              <Textarea id="message" rows={4} placeholder={placeholders[topic]} {...field} />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="contactPreference"
          render={({ field }) => (
            <FieldSet>
              <FieldLegend variant="label">Wie dürfen wir uns melden?</FieldLegend>
              <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
                {(["telefon", "email"] as const).map((v) => (
                  <Field key={v} orientation="horizontal" className="w-auto">
                    <RadioGroupItem value={v} id={`pref-${v}`} />
                    <FieldLabel htmlFor={`pref-${v}`} className="font-normal">
                      {v === "telefon" ? "Telefonisch" : "Per E-Mail"}
                    </FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
            </FieldSet>
          )}
        />

        <Controller
          control={form.control}
          name="privacy"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="privacy"
                checked={field.value}
                onCheckedChange={(c) => field.onChange(c === true)}
                aria-invalid={fieldState.invalid}
              />
              <div className="grid gap-1">
                <FieldLabel htmlFor="privacy" className="font-normal">
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

        <Button type="submit" size="lg" className="rounded-full" disabled={pending}>
          {pending && <Spinner />}
          {submitLabel}
        </Button>
      </FieldGroup>
    </form>
  )
}
