import avatar from "@/assets/logos/pc-icon.png"
import { SectionNav } from "@/components/section-nav"
import { PROFILE } from "@/data/resume"

/**
 * The mobile header. It sits outside the page grid on purpose: a sticky element
 * can only travel within its parent's box, and the sidebar column is far
 * shorter than the page, so a nav pinned inside it would scroll away.
 *
 * Hidden at lg, where the sidebar itself is sticky and nothing passes behind it.
 * Kept in print — this is where the name comes from on paper — but the print
 * stylesheet strips its bar treatment and the nav is `no-print`.
 */
export function SiteHeader({ active }: { active: string }) {
  return (
    // Opacity stays high on purpose: at lower values the content passing
    // behind it ghosts through and collides with the nav labels.
    <header className="site-header sticky top-0 z-40 border-b border-border bg-background/97 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-2.5 px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt=""
            className="size-9 shrink-0 rounded-lg border border-border bg-secondary p-1.5"
          />
          <div>
            <p className="text-[15px] font-semibold leading-tight tracking-[-0.01em]">
              {PROFILE.name}
            </p>
            <p className="mt-px text-[13px] text-muted-foreground">{PROFILE.location}</p>
          </div>
        </div>

        <SectionNav active={active} layout="bar" />
      </div>
    </header>
  )
}
