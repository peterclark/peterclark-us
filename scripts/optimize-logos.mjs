/**
 * The logo PNGs came off the old Gatsby site at up to 1200px square, but they
 * render here at 32–40px. This downsamples them in place to a sane cap and
 * strips the excess, cutting roughly a megabyte off the bundle.
 *
 * Run with: npm run optimize:logos
 */
import { readdir, readFile, writeFile, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const DIR = path.resolve(import.meta.dirname, "../src/assets/logos")
const MAX = 160

const kb = (n) => `${(n / 1024).toFixed(1)} kB`

const files = (await readdir(DIR)).filter((f) => f.endsWith(".png"))

let before = 0
let after = 0

for (const file of files) {
  const full = path.join(DIR, file)
  const original = await stat(full)
  before += original.size

  const input = await readFile(full)
  const { width = 0, height = 0 } = await sharp(input).metadata()

  const output = await sharp(input)
    .resize({
      width: Math.min(width, MAX),
      height: Math.min(height, MAX),
      fit: "inside",
      withoutEnlargement: true,
    })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer()

  // Keep whichever is smaller — a few of these are already well optimized.
  if (output.length < original.size) {
    await writeFile(full, output)
    after += output.length
    console.log(`  ${file.padEnd(24)} ${kb(original.size).padStart(9)} → ${kb(output.length)}`)
  } else {
    after += original.size
    console.log(`  ${file.padEnd(24)} ${kb(original.size).padStart(9)}   (kept)`)
  }
}

console.log(`\nTotal ${kb(before)} → ${kb(after)}`)
