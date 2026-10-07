const eur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})
const num = new Intl.NumberFormat("de-DE")

export const formatPrice = (value: number) => eur.format(value)
export const formatNumber = (value: number) => num.format(value)
export const formatKm = (value: number) => `${num.format(value)} km`

/** "2025-08" -> "08/2025" */
export function formatRegistration(value: string) {
  const [year, month] = value.split("-")
  return `${month}/${year}`
}

export function formatConsumption(value: number, electric: boolean) {
  return `${value.toLocaleString("de-DE")} ${electric ? "kWh" : "l"}/100 km`
}
