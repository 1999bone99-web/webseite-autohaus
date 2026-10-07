import Link from "next/link"

import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" className="fill-foreground" />
      <path
        d="M8 23V9.5l8 8.5 8-8.5V23"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-background"
      />
      <circle cx="24" cy="23" r="2.2" className="fill-brand" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)} aria-label="Marhoffer Startseite">
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[-0.02em]">Marhoffer</span>
        <span className="hidden font-mono text-[10px] tracking-wider text-muted-foreground uppercase sm:block">
          BMW Jahreswagen · seit 1988
        </span>
      </span>
    </Link>
  )
}
