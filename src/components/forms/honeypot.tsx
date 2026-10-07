import type { UseFormRegisterReturn } from "react-hook-form"

/**
 * Feld, das nur Spam-Bots ausfüllen. Für Menschen ist es unsichtbar und per Tab nicht erreichbar,
 * Screenreader überspringen es. Ist es befüllt, verwirft die Server-Action die Anfrage still.
 */
export function Honeypot(props: UseFormRegisterReturn<"website">) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Webseite
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  )
}
