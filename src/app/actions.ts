"use server"

import { format } from "date-fns"
import { de } from "date-fns/locale"

import { sendMail, type MailResult } from "@/lib/mail"
import { inquirySchema, tradeInSchema, workshopSchema } from "@/lib/schemas"
import { getVehicle } from "@/lib/vehicles"

const invalid: MailResult = { ok: false, error: "Bitte prüfen Sie Ihre Angaben." }

const topicSubjects = {
  fahrzeug: "Frage zu einem Fahrzeug",
  suchauftrag: "Suchauftrag",
  probefahrt: "Probefahrt",
  rueckruf: "Rückruf erbeten",
  finanzierung: "Finanzierung",
  mietwagen: "Mietwagen",
  sonstiges: "Anfrage",
} as const

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bmw-jw-marhoffer.de"

function vehicleLines(id: string | undefined): [string, string | undefined][] {
  const v = id ? getVehicle(id) : undefined
  if (!v) return []
  return [
    ["Fahrzeug", `${v.name} ${v.trim}`.trim()],
    ["Inserat-Nr.", v.adId ?? undefined],
    ["Link", `${SITE_URL}/fahrzeuge/${v.id}`],
  ]
}

const contactLines = (d: { name: string; email: string; phone?: string }): [string, string | undefined][] => [
  ["Name", d.name],
  ["E-Mail", d.email],
  ["Telefon", d.phone],
]

export async function submitInquiry(input: unknown): Promise<MailResult> {
  const parsed = inquirySchema.safeParse(input)
  if (!parsed.success) return invalid
  const d = parsed.data
  // Honeypot ausgefüllt: so tun, als wäre alles gut, aber nichts verschicken
  if (d.website) return { ok: true }

  const vehicle = d.vehicleId ? getVehicle(d.vehicleId) : undefined
  return sendMail({
    subject: `${topicSubjects[d.topic]}${vehicle ? `: ${vehicle.name}` : ""} (${d.name})`,
    replyTo: d.email,
    fields: [
      ["Anliegen", topicSubjects[d.topic]],
      ...vehicleLines(d.vehicleId),
      ...contactLines(d),
      ["Bevorzugter Kontakt", d.contactPreference === "telefon" ? "Telefon" : "E-Mail"],
      ["Nachricht", d.message],
    ],
  })
}

export async function submitWorkshopRequest(input: unknown): Promise<MailResult> {
  const raw = input as Record<string, unknown>
  const parsed = workshopSchema.safeParse({ ...raw, date: raw?.date ? new Date(String(raw.date)) : undefined })
  if (!parsed.success) return invalid
  const d = parsed.data
  if (d.website) return { ok: true }

  return sendMail({
    subject: `Werkstatttermin: ${d.service}, ${format(d.date, "dd.MM.yyyy")} (${d.name})`,
    replyTo: d.email,
    fields: [
      ["Leistung", d.service],
      ["Wunschtermin", format(d.date, "EEEE, d. MMMM yyyy", { locale: de })],
      ["Hol- und Bringservice", d.pickup ? "Ja, bitte abholen" : "Nein"],
      ["Modell", d.model],
      ["Kennzeichen", d.licensePlate],
      ...contactLines(d),
      ["Nachricht", d.message],
    ],
  })
}

export async function submitTradeIn(input: unknown): Promise<MailResult> {
  const parsed = tradeInSchema.safeParse(input)
  if (!parsed.success) return invalid
  const d = parsed.data
  if (d.website) return { ok: true }

  return sendMail({
    subject: `Inzahlungnahme: ${d.model}, EZ ${d.firstRegistration} (${d.name})`,
    replyTo: d.email,
    fields: [
      ["Abzugebendes Fahrzeug", d.model],
      ["Erstzulassung", d.firstRegistration],
      ["Kilometerstand", `${d.mileage} km`],
      ["Unfallschäden", d.accident],
      ...vehicleLines(d.vehicleId).map(([l, v]): [string, string | undefined] => [`Interesse an: ${l}`, v]),
      ...contactLines(d),
      ["Nachricht", d.message],
    ],
  })
}
