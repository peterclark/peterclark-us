import { Card } from "@/components/ui/card"
import type { Project } from "@/data/resume"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="print-block print-flat flex flex-col overflow-hidden">
      {/* Screenshots are for browsing; on paper they would cost a page. */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="no-print block border-b border-border"
      >
        <img
          src={project.screenshot}
          alt=""
          width={800}
          height={500}
          className="aspect-[16/10] w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      </a>

      <div className="flex flex-1 flex-col gap-2 px-4 py-3.5 print:p-0">
        <div className="min-w-0">
          <p className="text-sm font-semibold">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {project.name}
            </a>
          </p>
          <p className="mt-0.5 text-[13px] text-muted-foreground">{project.summary}</p>
        </div>

        {/* Badges report live CI state, so they say nothing frozen into the
            PDF — and rendering them there would put a network fetch in the
            middle of `npm run resume:pdf`. */}
        {project.badges.length > 0 && (
          <div className="no-print mt-auto flex flex-wrap items-center gap-2">
            {project.badges.map((badge) => (
              <a key={badge.label} href={badge.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={badge.src}
                  alt={`${project.name} ${badge.label}`}
                  className="h-5 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
