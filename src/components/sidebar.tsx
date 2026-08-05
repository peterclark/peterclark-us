import { Mail, Moon, Phone, Printer, Sun } from "lucide-react"

import avatar from "@/assets/logos/pc-icon.png"
import { GithubIcon } from "@/components/github-icon"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import { PROFILE, SECTIONS } from "@/data/resume"

export function Sidebar({ active }: { active: string }) {
  const { toggle } = useTheme()

  return (
    <aside className="sticky top-0 flex h-auto flex-col gap-6 self-start py-7 lg:h-dvh">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt=""
          className="size-10 shrink-0 rounded-lg border border-border bg-secondary p-1.5"
        />
        <div>
          <p className="text-[15px] font-semibold leading-tight tracking-[-0.01em]">
            {PROFILE.name}
          </p>
          <p className="mt-px text-[13px] text-muted-foreground">{PROFILE.location}</p>
        </div>
      </div>

      <nav
        aria-label="Sections"
        className="no-print flex flex-row flex-wrap gap-1 lg:flex-col lg:gap-px"
      >
        {SECTIONS.map((section) => {
          const current = active === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={current ? "true" : undefined}
              className={cn(
                "rounded-md px-3 py-1.5 text-[13.5px] font-medium transition-colors",
                "border border-border lg:border-transparent",
                current
                  ? "bg-accent text-accent-foreground font-semibold lg:border-transparent"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {section.label}
            </a>
          )
        })}
      </nav>

      <div className="no-print flex gap-2 lg:mt-auto lg:flex-col lg:items-stretch">
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Printer aria-hidden="true" />
          Download résumé
        </Button>
        <Button variant="ghost" size="sm" onClick={toggle}>
          <Sun aria-hidden="true" className="hidden dark:block" />
          <Moon aria-hidden="true" className="block dark:hidden" />
          <span className="dark:hidden">Dark mode</span>
          <span className="hidden dark:inline">Light mode</span>
        </Button>
      </div>

      <div className="no-print hidden flex-col gap-1.5 text-xs text-muted-foreground lg:flex">
        <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 hover:text-primary">
          <Mail aria-hidden="true" className="size-3.5" />
          {PROFILE.email}
        </a>
        <a href={PROFILE.phoneHref} className="flex items-center gap-2 hover:text-primary">
          <Phone aria-hidden="true" className="size-3.5" />
          {PROFILE.phone}
        </a>
        <a
          href={PROFILE.githubHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary"
        >
          <GithubIcon className="size-3.5" />
          {PROFILE.github}
        </a>
      </div>
    </aside>
  )
}
