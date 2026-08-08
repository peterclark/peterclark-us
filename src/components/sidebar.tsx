import { Download, Mail, Moon, Phone, Sun } from "lucide-react"

import avatar from "@/assets/logos/pc-icon.png"
import { GithubIcon } from "@/components/github-icon"
import { SectionNav } from "@/components/section-nav"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { PROFILE } from "@/data/resume"

/**
 * The desktop sidebar: sticky beside the content, so nothing scrolls behind it
 * and it needs no background of its own. Below lg the identity and nav move to
 * SiteHeader, and only the action buttons remain here.
 */
export function Sidebar({ active }: { active: string }) {
  const { toggle } = useTheme()

  return (
    <aside className="flex flex-col self-start lg:sticky lg:top-0 lg:h-dvh lg:py-7">
      <div className="hidden items-center gap-3 pb-6 lg:flex">
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

      <div className="hidden lg:block">
        <SectionNav active={active} layout="rail" />
      </div>

      <div className="no-print flex gap-2 py-6 lg:mt-auto lg:flex-col lg:items-stretch lg:pb-0">
        <Button variant="outline" size="sm" asChild>
          <a href="/resume.pdf" download="peter-clark-resume.pdf">
            <Download aria-hidden="true" />
            Download résumé
          </a>
        </Button>
        <Button variant="ghost" size="sm" onClick={toggle}>
          <Sun aria-hidden="true" className="hidden dark:block" />
          <Moon aria-hidden="true" className="block dark:hidden" />
          <span className="dark:hidden">Dark mode</span>
          <span className="hidden dark:inline">Light mode</span>
        </Button>
      </div>

      <div className="no-print hidden flex-col gap-1.5 pt-6 text-xs text-muted-foreground lg:flex">
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
