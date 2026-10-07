import { z } from "zod"

const phoneOrEmail = {
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an."),
  email: z.email("Bitte prüfen Sie die E-Mail-Adresse."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  privacy: z.literal(true, { error: "Bitte stimmen Sie der Datenverarbeitung zu." }),
}

export const inquiryTopics = ["fahrzeug", "suchauftrag", "export", "finanzierung", "sonstiges"] as const

export const inquirySchema = z.object({
  ...phoneOrEmail,
  topic: z.enum(inquiryTopics),
  vehicleId: z.string().optional(),
  contactPreference: z.enum(["telefon", "email"]),
})
export type InquiryValues = z.infer<typeof inquirySchema>

export const workshopServices = [
  "Inspektion / Service",
  "Ölwechsel",
  "Bremsen",
  "Reifenwechsel / Einlagerung",
  "Hauptuntersuchung (TÜV)",
  "Reparatur / Diagnose",
  "Klimaservice",
] as const

export const workshopSchema = z.object({
  ...phoneOrEmail,
  service: z.enum(workshopServices, { error: "Bitte wählen Sie eine Leistung." }),
  model: z.string().trim().min(2, "Welches Modell fahren Sie?"),
  licensePlate: z.string().trim().max(15).optional().or(z.literal("")),
  date: z.date({ error: "Bitte wählen Sie einen Wunschtermin." }),
})
export type WorkshopValues = z.infer<typeof workshopSchema>
