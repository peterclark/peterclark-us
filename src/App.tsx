import { TooltipProvider } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DetailRow } from "@/components/detail-row"
import { RoleCard } from "@/components/role-card"
import { Section } from "@/components/section"
import { Sidebar } from "@/components/sidebar"
import { SiteHeader } from "@/components/site-header"
import { StatTiles, type Stat } from "@/components/stat-tiles"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { CERTIFICATIONS, EDUCATION, PROFILE, ROLES, SECTIONS, SKILLS } from "@/data/resume"

const SECTION_IDS = SECTIONS.map((section) => section.id)

const STATS: Stat[] = [
  { label: "Roles", value: String(ROLES.length), detail: "Engineer → director" },
  { label: "Consulting clients", value: "8", detail: "Fortune 500 to startup" },
  { label: "Largest team led", value: "19", detail: "7 direct reports" },
  {
    label: "Certifications",
    value: String(CERTIFICATIONS.length),
    detail: "React, MongoDB, Scrum, Java",
  },
]

export default function App() {
  const active = useScrollSpy(SECTION_IDS)

  return (
    <TooltipProvider delayDuration={150}>
      <SiteHeader active={active} />

      <div className="mx-auto grid max-w-[1180px] gap-x-9 px-6 pb-24 lg:grid-cols-[236px_minmax(0,1fr)]">
        <Sidebar active={active} />

        <main className="min-w-0 pt-7">
          <Section id="overview" title="Overview">
            <div className="print-tight mb-7">
              <span className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-ok-soft px-2.5 py-1 text-xs font-semibold text-ok">
                <span aria-hidden="true" className="no-print size-1.5 rounded-full bg-current" />
                {PROFILE.title} at {PROFILE.employer}
              </span>

              <h1 className="text-pretty text-[clamp(1.75rem,4.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.028em]">
                Full-stack engineer building endpoint security at scale.
              </h1>

              <p className="mt-3 max-w-[66ch] text-base text-muted-foreground">
                {PROFILE.summary}
              </p>
            </div>

            <StatTiles stats={STATS} />
          </Section>

          <Section id="work" title="Experience" count={`${ROLES.length} roles`}>
            <div className="flex flex-col gap-3">
              {ROLES.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </Section>

          <Section id="skills" title="Stack" count={`${SKILLS.length} groups`}>
            <div className="grid gap-3 sm:grid-cols-2">
              {SKILLS.map((group) => (
                <Card key={group.label} className="print-block print-flat p-4">
                  <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge
                        key={item}
                        variant={group.lead?.includes(item) ? "solid" : "default"}
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section id="education" title="Education" count={String(EDUCATION.length)}>
            <div className="flex flex-col gap-2">
              {EDUCATION.map((entry) => (
                <DetailRow
                  key={entry.school}
                  title={
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {entry.school}
                    </a>
                  }
                  subtitle={entry.field}
                  trailing={
                    <>
                      {entry.honors.map((honor) => (
                        <Badge key={honor} variant="solid">
                          {honor}
                        </Badge>
                      ))}
                      <Badge className="font-mono tabular-nums">{entry.gpa}</Badge>
                    </>
                  }
                />
              ))}
            </div>
          </Section>

          <Section
            id="certifications"
            title="Certifications & awards"
            count={String(CERTIFICATIONS.length)}
          >
            <div className="flex flex-col gap-2">
              {CERTIFICATIONS.map((cert) => (
                <DetailRow
                  key={cert.name}
                  title={
                    cert.href ? (
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        {cert.name}
                      </a>
                    ) : (
                      cert.name
                    )
                  }
                  trailing={<Badge className="font-mono tabular-nums">{cert.year}</Badge>}
                />
              ))}
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="grid gap-2 sm:grid-cols-2">
              <DetailRow
                overline="Email"
                title={
                  <a href={`mailto:${PROFILE.email}`} className="hover:text-primary">
                    {PROFILE.email}
                  </a>
                }
              />
              <DetailRow
                overline="Phone"
                title={
                  <a href={PROFILE.phoneHref} className="hover:text-primary">
                    {PROFILE.phone}
                  </a>
                }
              />
              <DetailRow
                overline="Website"
                title={
                  <a href={PROFILE.siteHref} className="hover:text-primary">
                    {PROFILE.site}
                  </a>
                }
              />
              <DetailRow
                overline="GitHub"
                title={
                  <a
                    href={PROFILE.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    @{PROFILE.github}
                  </a>
                }
              />
            </div>
          </Section>
        </main>
      </div>
    </TooltipProvider>
  )
}
