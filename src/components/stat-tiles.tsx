import { Card } from "@/components/ui/card"

export type Stat = {
  label: string
  value: string
  detail: string
}

export function StatTiles({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="print-flat p-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="mt-2 font-mono text-[27px] font-semibold leading-none tracking-[-0.03em] tabular-nums">
            {stat.value}
          </dd>
          <dd className="mt-1.5 text-xs text-faint">{stat.detail}</dd>
        </Card>
      ))}
    </dl>
  )
}
