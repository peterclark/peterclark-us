import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type DetailRowProps = {
  title: ReactNode
  subtitle?: ReactNode
  /** Small print above the title — used for the contact labels. */
  overline?: ReactNode
  trailing?: ReactNode
  /**
   * An icon shown in a shaded tab flush with the card's left edge, with a gentle
   * curve on the right only — used for education, certifications and contact.
   */
  leading?: ReactNode
  /** Quieter tab for plain glyphs, so they sit back rather than pop. */
  subtle?: boolean
}

export function DetailRow({ title, subtitle, overline, trailing, leading, subtle = false }: DetailRowProps) {
  const body = (
    <div className="print-flat flex flex-1 flex-col items-start justify-between gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-0">
        {overline && <p className="text-[13px] text-muted-foreground">{overline}</p>}
        <p className="text-sm font-semibold">{title}</p>
        {subtitle && <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
      {trailing && <div className="flex shrink-0 items-center gap-2">{trailing}</div>}
    </div>
  )

  if (!leading) {
    return <Card className="print-block print-card flex">{body}</Card>
  }

  return (
    <Card className="print-block print-card flex overflow-hidden">
      <div
        className={cn(
          "icon-tab flex w-16 shrink-0 items-center justify-center rounded-tr-[0.5rem_50%] rounded-br-[0.5rem_50%]",
          subtle ? "bg-muted text-faint" : "bg-accent",
        )}
      >
        {leading}
      </div>
      {body}
    </Card>
  )
}
