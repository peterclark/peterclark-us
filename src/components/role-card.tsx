import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { LogoMark } from "@/components/logo-mark"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { Role } from "@/data/resume"

function period(role: Role) {
  return `${role.start} – ${role.end === "present" ? "present" : role.end}`
}

export function RoleCard({ role }: { role: Role }) {
  const current = role.end === "present"

  return (
    <Card
      className={cn(
        "print-block print-flat p-5",
        current && "border-primary/40",
      )}
    >
      <div className="flex flex-wrap items-start gap-3">
        {role.logo && <LogoMark src={role.logo} alt="" className="size-10" />}

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold tracking-[-0.01em]">
            {role.href ? (
              <a
                href={role.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {role.org}
              </a>
            ) : (
              role.org
            )}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{role.title}</p>
        </div>

        <span
          className={cn(
            "shrink-0 rounded-md border px-2 py-0.5 font-mono text-xs tabular-nums",
            current
              ? "border-transparent bg-accent font-semibold text-accent-foreground"
              : "border-border bg-secondary text-muted-foreground",
          )}
        >
          {period(role)}
        </span>
      </div>

      {role.clients && (
        <div className="mt-4 flex flex-wrap gap-2 rounded-lg border border-border bg-secondary p-3">
          {role.clients.map((client) => (
            <Tooltip key={client.name}>
              <TooltipTrigger asChild>
                <a
                  href={client.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={client.name}
                  className="print-no-url rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                >
                  <LogoMark
                    src={client.logo}
                    alt={client.name}
                    onDark={client.onDark}
                    className="size-9"
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent>{client.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}

      <p className="mt-4 max-w-[76ch] text-sm text-muted-foreground">{role.summary}</p>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {role.stack.map((item) => (
          <Badge key={item} variant={role.lead?.includes(item) ? "solid" : "default"}>
            {item}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
