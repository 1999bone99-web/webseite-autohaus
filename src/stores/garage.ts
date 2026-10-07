"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export const MAX_COMPARE = 3

type GarageState = {
  favorites: string[]
  compare: string[]
  toggleFavorite: (id: string) => void
  toggleCompare: (id: string) => "added" | "removed" | "full"
  clearCompare: () => void
}

/** Merkliste und Vergleich. Lokal im Browser gespeichert, kein Konto nötig. */
export const useGarage = create<GarageState>()(
  persist(
    (set, get) => ({
      favorites: [],
      compare: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      toggleCompare: (id) => {
        const { compare } = get()
        if (compare.includes(id)) {
          set({ compare: compare.filter((c) => c !== id) })
          return "removed"
        }
        if (compare.length >= MAX_COMPARE) return "full"
        set({ compare: [...compare, id] })
        return "added"
      },
      clearCompare: () => set({ compare: [] }),
    }),
    {
      name: "marhoffer-garage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
)
