/**
 * Renders the site's print stylesheet to public/resume.pdf.
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
import { build, preview } from "vite"
import { chromium } from "playwright"
import path from "node:path"

const OUT = path.resolve(import.meta.dirname, "../public/resume.pdf")

console.log("Building…")
await build({ logLevel: "warn" })

const server = await preview({ preview: { port: 4180, host: "127.0.0.1" } })
const url = server.resolvedUrls?.local?.[0] ?? "http://127.0.0.1:4180/"

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
})

try {
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "networkidle" })

  // Fonts must be resolved before layout is measured for pagination.
  await page.evaluate(() => document.fonts.ready)

  await page.emulateMedia({ media: "print" })
  await page.pdf({
    path: OUT,
    format: "Letter",
    printBackground: true,
    // Page margins come from the @page rule in index.css.
    preferCSSPageSize: true,
  })

  console.log(`Wrote ${path.relative(process.cwd(), OUT)}`)
} finally {
  await browser.close()
  await server.close()
}
