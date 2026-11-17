/**
 * Renders a conventional, single-column résumé to public/resume.pdf.
 *
 * The content comes from src/data/resume.ts (loaded through Vite so its `@/`
 * imports resolve) and the layout from scripts/resume-template.mjs. It is a
 * separate document, not a print of the site, so the download reads like a
 * standard résumé and stays friendly to applicant tracking systems.
 *
 * The PDF is a committed artifact, not a build step — Netlify never runs this,
 * so no headless browser is needed in CI. Regenerate whenever the résumé
 * content changes:
 *
 *   npm run resume:pdf
 *
 * Requires the `playwright` devDependency and its Chromium. If Chromium lives
 * somewhere non-standard, point PLAYWRIGHT_CHROMIUM_PATH at the executable.
 */
import { createServer } from "vite"
import { chromium } from "playwright"
import path from "node:path"
import { renderResumeHtml } from "./resume-template.mjs"

const OUT = path.resolve(import.meta.dirname, "../public/resume.pdf")

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "warn" })
let data
try {
  data = await vite.ssrLoadModule("/src/data/resume.ts")
} finally {
  await vite.close()
}

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
})

try {
  const page = await browser.newPage()
  await page.setContent(renderResumeHtml(data), { waitUntil: "load" })
  await page.evaluate(() => document.fonts.ready)
  await page.emulateMedia({ media: "print" })
  await page.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true })
  console.log(`Wrote ${path.relative(process.cwd(), OUT)}`)
} finally {
  await browser.close()
}
