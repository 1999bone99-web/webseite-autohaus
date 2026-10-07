import { z } from "zod"

const phoneOrEmail = {
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an."),
  email: z.email("Bitte prüfen Sie die E-Mail-Adresse."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  privacy: z.literal(true, { error: "Bitte stimmen Sie der Datenverarbeitung zu." }),
  /** Unsichtbares Feld gegen Spam-Bots. Menschen lassen es leer. */
  website: z.string().optional(),
}

export const inquiryTopics = ["fahrzeug", "suchauftrag", "probefahrt", "rueckruf", "finanzierung", "mietwagen", "sonstiges"] as const

export const inquirySchema = z.object({
  ...phoneOrEmail,
  topic: z.enum(inquiryTopics),
  vehicleId: z.string().optional(),
  contactPreference: z.enum(["telefon", "email"]),
})
export type InquiryValues = z.infer<typeof inquirySchema>

export const workshopServices = [
  "Wartung / Inspektion",
  "BMW Ölservice",
  "Fahrzeug-Check",
  "Bremsen-Service",
  "Räder- und Reifenservice",
  "Scheiben- und Glasreparatur",
  "Karosserie- und Lackarbeiten",
  "Reparatur / Diagnose",
] as const

export const workshopSchema = z.object({
  ...phoneOrEmail,
  service: z.enum(workshopServices, { error: "Bitte wählen Sie eine Leistung." }),
  model: z.string().trim().min(2, "Welches Modell fahren Sie?"),
  licensePlate: z.string().trim().max(15).optional().or(z.literal("")),
  date: z.date({ error: "Bitte wählen Sie einen Wunschtermin." }),
  pickup: z.boolean(),
})
export type WorkshopValues = z.infer<typeof workshopSchema>

export const accidentOptions = ["unfallfrei", "Unfallschaden repariert", "Unfallschaden nicht repariert", "weiß nicht"] as const

export const tradeInSchema = z.object({
  ...phoneOrEmail,
  model: z.string().trim().min(2, "Welches Fahrzeug möchten Sie abgeben?"),
  firstRegistration: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/(19|20)\d\d$/, "Bitte im Format MM/JJJJ, z. B. 03/2019."),
  mileage: z
    .string()
    .trim()
    .regex(/^\d{1,3}(\.?\d{3})*$/, "Bitte den Kilometerstand als Zahl angeben."),
  accident: z.enum(accidentOptions, { error: "Bitte wählen Sie eine Angabe." }),
  /** Fahrzeug aus dem Bestand, für das sich der Kunde interessiert */
  vehicleId: z.string().optional(),
})
export type TradeInValues = z.infer<typeof tradeInSchema>
