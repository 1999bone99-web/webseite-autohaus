"use client"

import { useEffect } from "react"

import { useGarage } from "@/stores/garage"

export function GarageHydrator() {
  useEffect(() => {
    void useGarage.persist.rehydrate()
  }, [])
  return null
}
