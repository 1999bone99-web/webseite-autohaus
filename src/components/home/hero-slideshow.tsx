"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

/** Überblendende Kopfbilder. Bei reduzierter Bewegung bleibt das erste Bild stehen. */
export function HeroSlideshow({
  images,
  interval = 9000,
}: {
  images: readonly { src: string; alt: string }[]
  interval?: number
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % images.length), interval)
    return () => window.clearInterval(id)
  }, [images.length, interval])

  return (
    <div className="absolute inset-0">
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={i === active ? img.alt : ""}
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-[2500ms] ease-in-out",
            i === active ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </div>
  )
}
