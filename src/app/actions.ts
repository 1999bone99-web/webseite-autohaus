"use server"

import { inquirySchema, workshopSchema } from "@/lib/schemas"

type Result = { ok: true } | { ok: false; error: string }

/**
 * Platzhalter: Hier wird später der Versand angebunden
 * (z. B. E-Mail via Resend/SMTP oder Übergabe ans DMS/CRM des Autohauses).
 */
export async function submitInquiry(input: unknown): Promise<Result> {
  const parsed = inquirySchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "Bitte prüfen Sie Ihre Angaben." }
  console.info("[Anfrage]", { ...parsed.data, email: "<redacted>", phone: "<redacted>" })
  return { ok: true }
}

export async function submitWorkshopRequest(input: unknown): Promise<Result> {
  const raw = input as Record<string, unknown>
  const parsed = workshopSchema.safeParse({ ...raw, date: raw?.date ? new Date(String(raw.date)) : undefined })
  if (!parsed.success) return { ok: false, error: "Bitte prüfen Sie Ihre Angaben." }
  console.info("[Werkstatt]", { service: parsed.data.service, date: parsed.data.date.toISOString() })
  return { ok: true }
}
