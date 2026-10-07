import Link from "next/link"

import { cn } from "@/lib/utils"

/**
 * Bildmarke von bmw-jw-marhoffer.de, als SVG nachgezeichnet aus dem PNG der
 * bisherigen Webseite. Für Druck o. Ä. die Originaldatei beim Autohaus anfragen.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 78 32" aria-hidden className={cn("h-6 w-auto fill-current", className)}>
      <path d="M24 0h12L14 31.5H2z" />
      <path d="M45.5 0h6L29.5 31.5h-6z" />
      <path d="M58 0h11L47 31.5H36z" />
      <path d="M45.5 0h32v3.5h-32z" />
      <path d="M73.5 0h4v31.5h-4z" />
      <path d="M23.5 28h54v3.5h-54z" />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-baseline text-[19px] leading-none tracking-[-0.01em]", className)}>
      bmw<span className="mx-px text-[0.62em] opacity-80">-jw-</span>marhoffer
    </span>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)} aria-label="bmw-jw-marhoffer, Startseite">
      <LogoMark className="h-[22px]" />
      <Wordmark className="hidden sm:flex" />
    </Link>
  )
}
