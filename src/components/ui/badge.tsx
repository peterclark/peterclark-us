import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-normal transition-colors whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-border bg-secondary text-muted-foreground",
        solid: "border-transparent bg-accent text-accent-foreground font-medium",
        ok: "border-transparent bg-ok-soft text-ok font-semibold",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
