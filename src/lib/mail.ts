import "server-only"

import { Resend } from "resend"

import { contact } from "@/lib/content"
import { site } from "@/lib/site"

/**
 * Versand der Formularanfragen über Resend (https://resend.com).
 *
 * Umgebungsvariablen (in Vercel unter Settings → Environment Variables):
 * - RESEND_API_KEY  API-Schlüssel aus dem Resend-Konto
 * - MAIL_FROM       Absender auf einer bei Resend verifizierten Domain, z. B. "Webseite <anfrage@bmw-jw-marhoffer.de>"
 * - MAIL_TO         Empfänger, Standard ist die allgemeine Adresse aus content.ts
 */
const apiKey = process.env.RESEND_API_KEY
const from = process.env.MAIL_FROM
const to = process.env.MAIL_TO ?? contact.email

export type MailResult = { ok: true } | { ok: false; error: string }

export async function sendMail({
  subject,
  fields,
  replyTo,
}: {
  subject: string
  /** Zeilen der Mail als Beschriftung und Wert, leere Werte fallen weg */
  fields: [label: string, value: string | null | undefined][]
  replyTo: string
}): Promise<MailResult> {
  const text = fields
    .filter(([, value]) => value != null && String(value).trim() !== "")
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n")

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      // Lokal ohne Zugangsdaten: Inhalt ins Terminal schreiben statt zu verschicken
      console.info(`[Mail nicht konfiguriert] ${subject}\n\n${text}`)
      return { ok: true }
    }
    console.error("[Mail] RESEND_API_KEY oder MAIL_FROM fehlt, Anfrage nicht versendet:", subject)
    return { ok: false, error: unavailable }
  }

  const { error } = await new Resend(apiKey).emails.send({ from, to, replyTo, subject, text })
  if (error) {
    console.error("[Mail] Versand fehlgeschlagen:", error.name, error.message)
    return { ok: false, error: unavailable }
  }
  return { ok: true }
}

const unavailable =
  `Ihre Anfrage konnte gerade nicht übermittelt werden. Bitte rufen Sie uns an unter ${site.phone.sales.display} ` +
  `oder schreiben Sie an ${contact.email}.`
