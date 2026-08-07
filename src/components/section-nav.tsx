import { cn } from "@/lib/utils"
import { SECTIONS } from "@/data/resume"

type SectionNavProps = {
  active: string
  /** "bar" is the horizontal mobile header; "rail" is the desktop sidebar column. */
  layout: "bar" | "rail"
}

export function SectionNav({ active, layout }: SectionNavProps) {
  const bar = layout === "bar"

  return (
    <nav
      aria-label="Sections"
      className={cn(
        "no-print flex",
        bar
          ? "gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "flex-col gap-px",
      )}
    >
      {SECTIONS.map((section) => {
        const current = active === section.id
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={current ? "true" : undefined}
            className={cn(
              "shrink-0 rounded-md px-3 py-1.5 text-[13.5px] font-medium transition-colors",
              bar && "border border-border",
              current
                ? "bg-accent font-semibold text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              current && bar && "border-transparent",
            )}
          >
            {section.label}
          </a>
        )
      })}
    </nav>
  )
}
