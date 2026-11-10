// Renders the Home Screen and favicon PNGs from the SVG sources in scripts/icons/.
//
//   npm run icons
//
// icon.svg          full-bleed square art → apple-touch-icon (180), icon-192, icon-512
// icon-maskable.svg same art with the foreground pulled into Android's safe zone
// public/favicon.svg rounded-square art for browser tabs → favicon.png (96)
//
// iOS rounds the apple-touch-icon itself and fills transparency with black, so
// that one is flattened onto its own background and never has alpha.
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"
import sharp from "sharp"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const src = (f) => path.join(root, "scripts/icons", f)
const out = (f) => path.join(root, "public", f)

const icon = await readFile(src("icon.svg"))
const maskable = await readFile(src("icon-maskable.svg"))
const favicon = await readFile(out("favicon.svg"))

const render = (svg, size) => sharp(svg, { density: 72 * (size / 512) * 4 }).resize(size, size)

await render(icon, 180).flatten().png().toFile(out("apple-touch-icon.png"))
await render(icon, 192).png().toFile(out("icon-192.png"))
await render(icon, 512).png().toFile(out("icon-512.png"))
await render(maskable, 512).png().toFile(out("icon-maskable-512.png"))
await render(favicon, 96).png().toFile(out("favicon.png"))

console.log("icons written to public/")
