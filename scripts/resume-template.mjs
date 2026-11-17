/**
 * The downloadable résumé as a plain, single-column HTML document.
 *
 * Kept apart from the site on purpose: recruiters and applicant tracking
 * systems expect a conventional résumé (contact line, summary, experience,
 * skills, education), not a print of the portfolio. Every fact comes from
 * src/data/resume.ts, so the site and the PDF stay in step.
 */
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const bareUrl = (href) => href.replace(/^https?:\/\//, "").replace(/\/$/, "")

/** Geist is the site's typeface; embedding it keeps the PDF identical on every machine. */
function fontFace() {
  const file = require.resolve("@fontsource-variable/geist/files/geist-latin-wght-normal.woff2")
  const data = readFileSync(file).toString("base64")
  return `@font-face{font-family:"Geist";font-weight:100 900;font-style:normal;src:url(data:font/woff2;base64,${data}) format("woff2")}`
}

const years = (r) => `${r.start} – ${r.end === "present" ? "Present" : r.end}`

export function renderResumeHtml({ PROFILE, ROLES, PROJECTS, SKILLS, EDUCATION, CERTIFICATIONS }) {
  const contact = [
    esc(PROFILE.location),
    `<a href="${esc(PROFILE.phoneHref)}">${esc(PROFILE.phone)}</a>`,
    `<a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a>`,
    `<a href="${esc(PROFILE.siteHref)}">${esc(PROFILE.site)}</a>`,
    `<a href="${esc(PROFILE.githubHref)}">github.com/${esc(PROFILE.github)}</a>`,
  ].join('<span class="sep">|</span>')

  const roles = ROLES.map((r) => {
    const title = r.product ? `${esc(r.title)}, ${esc(r.product.name)}` : esc(r.title)
    const clients = r.clients?.length
      ? `<p class="meta"><span class="k">Clients:</span> ${r.clients.map((c) => esc(c.name)).join(", ")}</p>`
      : ""
    return `
      <div class="role">
        <div class="row"><span class="org">${esc(r.org)}</span><span class="dates">${years(r)}</span></div>
        <div class="title">${title}</div>
        <ul>${r.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        ${clients}
        <p class="meta"><span class="k">Technologies:</span> ${r.stack.map(esc).join(", ")}</p>
      </div>`
  }).join("")

  const skills = SKILLS.map(
    (g) => `<li><span class="k">${esc(g.label)}:</span> ${g.items.map(esc).join(", ")}</li>`,
  ).join("")

  const projects = PROJECTS.filter((p) => !p.hidden)
    .map(
      (p) =>
        `<li><span class="k">${esc(p.name)}</span> (<a href="${esc(p.href)}">${esc(bareUrl(p.href))}</a>): ${esc(p.summary)}</li>`,
    )
    .join("")

  const education = EDUCATION.map((e) => {
    const detail = [e.field, ...e.honors, e.gpa].filter(Boolean).map(esc).join(", ")
    return `<li><span class="k">${esc(e.school)}</span>: ${detail}</li>`
  }).join("")

  const certs = CERTIFICATIONS.map((c) => `${esc(c.name)} (${c.year})`).join(", ")

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(PROFILE.name)} – Résumé</title>
<meta name="author" content="${esc(PROFILE.name)}">
<style>
${fontFace()}
@page { size: Letter; margin: 0.5in 0.6in; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; }
body { margin: 0; font-family: "Geist", Helvetica, Arial, sans-serif; font-size: 9.6pt; line-height: 1.32; color: #000; }
a { color: inherit; text-decoration: none; }
h1 { font-size: 21pt; font-weight: 700; letter-spacing: 0.01em; margin: 0; text-align: center; }
.headline { text-align: center; font-size: 10.5pt; margin: 2pt 0 3pt; }
.contact { text-align: center; font-size: 9pt; }
.sep { margin: 0 6pt; color: #555; }
h2 { font-size: 10.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
     border-bottom: 0.75pt solid #000; padding-bottom: 1.5pt; margin: 11pt 0 5pt; }
p { margin: 0; }
.role { margin-bottom: 7pt; break-inside: avoid; }
.row { display: flex; justify-content: space-between; align-items: baseline; }
.org { font-weight: 700; font-size: 10.2pt; }
.dates { font-weight: 600; }
.title { font-style: italic; margin-bottom: 1.5pt; }
ul { margin: 0; padding-left: 13pt; }
li { margin: 0 0 1.2pt; }
.meta { margin-top: 2pt; font-size: 9pt; }
.k { font-weight: 600; }
ul.plain { list-style: none; padding-left: 0; }
section { break-inside: avoid; }
h2 { break-after: avoid; }
</style>
</head>
<body>
  <header>
    <h1>${esc(PROFILE.name)}</h1>
    <div class="headline">${esc(PROFILE.title.replace(/\s+\d+$/, ""))} | Full-Stack TypeScript, React, NestJS, AWS</div>
    <div class="contact">${contact}</div>
  </header>

  <h2>Summary</h2>
  <p>Full-stack engineer working in TypeScript and React on the front end, with NestJS and AWS behind it. Author of an AI orchestration pipeline that carries Jira tickets through to open pull requests. Previously lead developer for USAA, Starbucks, and the City of Boston, and IT director for a multi-company retail group, leading 19 IT professionals.</p>

  <h2>Experience</h2>
  ${roles}

  <section>
  <h2>Skills</h2>
  <ul class="plain">${skills}</ul>
  </section>

  <section>
  <h2>Projects</h2>
  <ul class="plain">${projects}</ul>
  </section>

  <section>
  <h2>Education</h2>
  <ul class="plain">${education}</ul>
  </section>

  <section>
  <h2>Certifications &amp; Awards</h2>
  <p>${certs}</p>
  </section>
</body>
</html>`
}
