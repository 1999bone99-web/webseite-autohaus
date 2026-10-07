import { useId } from "react"

import type { BodyType } from "@/lib/vehicles"
import { cn } from "@/lib/utils"

/**
 * Stilisierte Seitenansicht in Lackfarbe. Platzhalter, bis echte Fotos
 * aus dem Fotostudio des Autohauses vorliegen. Bewusst keine Fremdbilder.
 */

type Shape = {
  body: string
  glass: string
  pillars: number[]
  wheels: { x: number; y: number; r: number }[]
  line: string
  lamp: { front: string; rear: string }
}

const shapes: Record<BodyType, Shape> = {
  limousine: {
    body: "M30 100C28 88 34 80 48 78L70 74C90 70 110 68 125 66L150 64C170 46 195 36 225 35L255 36C275 38 290 50 305 62L340 68C362 71 372 76 374 86C376 96 372 102 362 104L336 104A26 26 0 0 0 284 104L121 104A26 26 0 0 0 69 104L36 104Z",
    glass: "M160 63C178 49 198 41 225 40L253 41C270 43 283 52 295 62Z",
    pillars: [229],
    wheels: [
      { x: 95, y: 106, r: 21 },
      { x: 310, y: 106, r: 21 },
    ],
    line: "M48 84C120 80 260 78 362 80",
    lamp: { front: "M350 73L369 77L368 81L352 79Z", rear: "M33 81L46 79L47 85L32 86Z" },
  },
  touring: {
    body: "M30 100C28 86 32 74 44 66L58 46C62 40 70 37 82 36L255 36C275 38 290 50 305 62L340 68C362 71 372 76 374 86C376 96 372 102 362 104L336 104A26 26 0 0 0 284 104L121 104A26 26 0 0 0 69 104L36 104Z",
    glass: "M66 62L76 45C80 42 86 41 94 41L253 41C270 43 283 52 295 62Z",
    pillars: [150, 229],
    wheels: [
      { x: 95, y: 106, r: 21 },
      { x: 310, y: 106, r: 21 },
    ],
    line: "M44 84C120 80 260 78 362 80",
    lamp: { front: "M350 73L369 77L368 81L352 79Z", rear: "M33 74L44 70L45 80L32 82Z" },
  },
  suv: {
    body: "M24 92C22 80 26 70 36 66L48 62C52 50 58 38 66 32C72 27 82 25 96 25L232 24C252 25 266 34 282 48L300 58C330 60 356 63 368 70C376 75 378 86 376 92C374 98 370 100 362 100L338 100A28 28 0 0 0 282 100L123 100A28 28 0 0 0 67 100L32 100Z",
    glass: "M62 56C66 44 72 34 80 31C86 29 92 29 100 29L230 29C246 30 260 39 274 50L281 56Z",
    pillars: [150, 222],
    wheels: [
      { x: 95, y: 104, r: 24 },
      { x: 310, y: 104, r: 24 },
    ],
    line: "M36 80C120 76 260 74 368 78",
    lamp: { front: "M352 66L372 72L371 77L354 74Z", rear: "M27 72L42 67L43 77L26 79Z" },
  },
  coupe: {
    body: "M30 100C28 90 34 83 48 81L80 77C110 71 135 62 160 52C185 41 205 38 228 38L250 39C272 42 290 54 306 64L342 70C363 73 372 78 374 88C376 97 372 102 362 104L336 104A26 26 0 0 0 284 104L121 104A26 26 0 0 0 69 104L36 104Z",
    glass: "M142 65C168 51 196 43 228 43L248 44C268 46 282 55 294 64Z",
    pillars: [236],
    wheels: [
      { x: 95, y: 106, r: 21 },
      { x: 310, y: 106, r: 21 },
    ],
    line: "M48 86C120 82 260 80 362 82",
    lamp: { front: "M351 75L369 79L368 83L353 81Z", rear: "M33 84L48 81L49 87L32 88Z" },
  },
}

/** Server und Client runden Fließkommazahlen sonst unterschiedlich */
const round = (n: number) => Math.round(n * 100) / 100

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 170
}

export function VehicleVisual({
  body,
  color,
  className,
  stage = true,
  label,
}: {
  body: BodyType
  color: string
  className?: string
  stage?: boolean
  label?: string
}) {
  const id = useId().replace(/:/g, "")
  const s = shapes[body]
  const light = isLight(color)
  const groundY = Math.max(...s.wheels.map((w) => w.y + w.r))

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        stage && "bg-[radial-gradient(120%_90%_at_50%_15%,var(--stage-from),var(--stage-to))]",
        className
      )}
    >
      <svg
        viewBox="0 0 400 150"
        role="img"
        aria-label={label ?? "Fahrzeugdarstellung"}
        className="absolute inset-x-[6%] top-1/2 h-auto w-[88%] -translate-y-[46%]"
      >
        <defs>
          <linearGradient id={`paint-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity={1} />
            <stop offset="0.45" stopColor={color} />
            <stop offset="1" stopColor={light ? "#9aa0a8" : "#000"} stopOpacity={light ? 1 : 0.85} />
          </linearGradient>
          <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.55" stopColor="#fff" stopOpacity={light ? 0.5 : 0.22} />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a4250" />
            <stop offset="0.6" stopColor="#0e1117" />
            <stop offset="1" stopColor="#1d2430" />
          </linearGradient>
          <radialGradient id={`rim-${id}`}>
            <stop offset="0" stopColor="#d9dde2" />
            <stop offset="0.7" stopColor="#7d838b" />
            <stop offset="1" stopColor="#3b4047" />
          </radialGradient>
          <radialGradient id={`shadow-${id}`}>
            <stop offset="0" stopColor="#000" stopOpacity="0.45" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <clipPath id={`upper-${id}`}>
            <rect x="0" y="0" width="400" height={s.wheels[0].y} />
          </clipPath>
          <clipPath id={`glassclip-${id}`}>
            <path d={s.glass} />
          </clipPath>
        </defs>

        <ellipse cx="202" cy={groundY + 1} rx="190" ry="9" fill={`url(#shadow-${id})`} />

        {s.wheels.map((w) => (
          <circle key={`arch-${w.x}`} cx={w.x} cy={w.y - 2} r={w.r + 6} fill="#16191e" clipPath={`url(#upper-${id})`} />
        ))}
        <path d={s.body} fill={`url(#paint-${id})`} />
        <path d={s.body} fill={`url(#sheen-${id})`} opacity="0.7" />
        <path d={s.glass} fill={`url(#glass-${id})`} />
        {s.pillars.map((x) => (
          <rect key={x} x={x - 2.5} y="20" width="5" height="50" fill={color} clipPath={`url(#glassclip-${id})`} />
        ))}
        <path d={s.line} fill="none" stroke="#fff" strokeOpacity={light ? 0.6 : 0.18} strokeWidth="1.2" />
        <path d={s.lamp.front} fill="#e8f1ff" opacity="0.95" />
        <path d={s.lamp.rear} fill="#c4242f" opacity="0.9" />

        {s.wheels.map((w) => (
          <g key={w.x}>
            <circle cx={w.x} cy={w.y} r={w.r} fill="#0d0f12" />
            <circle cx={w.x} cy={w.y} r={w.r * 0.68} fill={`url(#rim-${id})`} />
            {[0, 72, 144, 216, 288].map((deg) => (
              <line
                key={deg}
                x1={w.x}
                y1={w.y}
                x2={round(w.x + Math.cos((deg * Math.PI) / 180) * w.r * 0.64)}
                y2={round(w.y + Math.sin((deg * Math.PI) / 180) * w.r * 0.64)}
                stroke="#2c3036"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            ))}
            <circle cx={w.x} cy={w.y} r={w.r * 0.14} fill="#1b1e23" />
          </g>
        ))}
      </svg>
    </div>
  )
}
