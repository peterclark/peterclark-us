import type { ReactNode } from "react"

type SectionProps = {
  id: string
  title: string
  count?: string
  children: ReactNode
}

export function Section({ id, title, count, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-6 pb-11">
      <div className="mb-4 flex items-baseline gap-2.5">
        <h2 className="text-[17px] font-semibold tracking-[-0.015em]">{title}</h2>
        {count && (
          <span className="no-print rounded-full border border-border bg-secondary px-2 py-px font-mono text-xs tabular-nums text-muted-foreground">
            {count}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}
