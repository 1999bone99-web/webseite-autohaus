"use client"

import { parseAsStringLiteral, useQueryState } from "nuqs"

import { InquiryForm } from "@/components/forms/inquiry-form"
import { inquiryTopics } from "@/lib/schemas"

/** Liest ?anliegen=… aus der URL, z. B. von "Suchauftrag anlegen". */
export function ContactInquiry() {
  const [topic] = useQueryState("anliegen", parseAsStringLiteral(inquiryTopics).withDefault("sonstiges"))
  return <InquiryForm key={topic} defaultTopic={topic} />
}
