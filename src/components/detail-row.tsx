import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"

type DetailRowProps = {
  title: ReactNode
  subtitle?: ReactNode
  /** Small print above the title — used for the contact labels. */
  overline?: ReactNode
  trailing?: ReactNode
}

export function DetailRow({ title, subtitle, overline, trailing }: DetailRowProps) {
  return (
    <Card className="print-block print-flat flex flex-col items-start justify-between gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-0">
        {overline && <p className="text-[13px] text-muted-foreground">{overline}</p>}
        <p className="text-sm font-semibold">{title}</p>
        {subtitle && <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
      {trailing && <div className="flex shrink-0 items-center gap-2">{trailing}</div>}
    </Card>
  )
}
