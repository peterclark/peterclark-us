import { cn } from "@/lib/utils"

type LogoMarkProps = {
  src: string
  alt: string
  className?: string
  /**
   * Set for artwork drawn in white for a dark background — the City of Boston
   * seal is invisible on a light tile without it.
   */
  onDark?: boolean
}

/**
 * Employer and client marks sit on a constant tile in both themes. Most of
 * these logos carry dark detail on a transparent background, so a light ground
 * is what keeps them legible — and brand recognition is the point of showing
 * them at all, which is why they stay in full color.
 */
export function LogoMark({ src, alt, className, onDark = false }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-md border",
        onDark
          ? "border-transparent bg-[#1c2426]"
          : "border-border bg-white dark:border-white/15 dark:bg-white/92",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="size-[74%] object-contain"
      />
    </span>
  )
}
