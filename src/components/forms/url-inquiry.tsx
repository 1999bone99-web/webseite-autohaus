"use client"

import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"

import { InquiryForm } from "@/components/forms/inquiry-form"
import { inquiryTopics, type InquiryValues } from "@/lib/schemas"

/**
 * Anfrageformular, das Anliegen (?anliegen=) und Fahrzeug (?fahrzeug=) aus der URL übernimmt.
 * Muss in <Suspense> stehen, weil es Suchparameter liest.
 */
export function UrlInquiry({
  fallbackTopic = "sonstiges",
  pickVehicle = false,
  hideTopic = false,
  submitLabel,
}: {
  fallbackTopic?: InquiryValues["topic"]
  pickVehicle?: boolean
  hideTopic?: boolean
  submitLabel?: string
}) {
  const [{ anliegen, fahrzeug }] = useQueryStates({
    anliegen: parseAsStringLiteral(inquiryTopics).withDefault(fallbackTopic),
    fahrzeug: parseAsString,
  })
  return (
    <InquiryForm
      key={`${anliegen}-${fahrzeug}`}
      defaultTopic={anliegen}
      defaultVehicleId={fahrzeug ?? undefined}
      pickVehicle={pickVehicle}
      hideTopic={hideTopic}
      submitLabel={submitLabel}
    />
  )
}
