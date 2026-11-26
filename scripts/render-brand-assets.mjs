// Renders the sharing images and site icons into public/. The images use the
// fonts of the built site, so run `pnpm generate` first, then
// `node scripts/render-brand-assets.mjs`, and commit the result.
import { writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const graphite = '#111419'
const white = '#F2F0E9'
const lime = '#E2F36B'

const sharingImages = [
  {
    file: 'og-mile-ferenc.png',
    lang: 'hu',
    themes: 'Technológia · Emberek · Rendszerek',
    claim: 'A problémák érdekelnek.',
  },
  {
    file: 'og-mile-ferenc-en.png',
    lang: 'en',
    themes: 'Technology · People · Systems',
    claim: 'Problems we have learned to accept.',
  },
]

// A geometric "p." on a 64×64 grid, drawn without a font
const mark = `
  <path fill="${white}" d="M10 11h8v42h-8zM25 11a14 14 0 1 1 0 28 14 14 0 1 1 0-28zm0 7.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 1 0 0-13z"/>
  <circle fill="${lime}" cx="48.5" cy="33.5" r="5.5"/>`

const icon = ({ radius = 0, scale = 1 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="${graphite}"/>
  <g transform="translate(32 32) scale(${scale}) translate(-32 -32)">${mark}
  </g>
</svg>
`

const favicon = icon({ radius: 12 })
// Home screen icons get cropped to a circle or squircle, so the mark stays inside
const appIcon = icon({ scale: 0.8 })

/** ICO container around PNG images */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = header.length
  images.forEach(({ size, png }, index) => {
    const entry = 6 + index * 16
    header.writeUInt8(size, entry)
    header.writeUInt8(size, entry + 1)
    header.writeUInt16LE(1, entry + 4)
    header.writeUInt16LE(32, entry + 6)
    header.writeUInt32LE(png.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += png.length
  })
  return Buffer.concat([header, ...images.map(image => image.png)])
}

process.env.PORT ||= '4180'
await import('./serve-static.mjs')

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, javaScriptEnabled: false })
  await page.goto(`http://localhost:${process.env.PORT}/`)

  for (const { file, lang, themes, claim } of sharingImages) {
    await page.evaluate(({ lang, html }) => {
      document.documentElement.lang = lang
      document.body.innerHTML = html
    }, {
      lang,
      html: `
        <style>
          body { margin: 0; }
          .card { position: fixed; inset: 0; z-index: 1000; display: flex; flex-direction: column; justify-content: space-between; padding: 76px 84px; background: ${graphite}; color: ${white}; }
          .card p { margin: 0; line-height: 1.2; }
          .name { font: 700 156px/1 "Space Grotesk"; letter-spacing: -.06em; margin-left: -6px; }
          .name span { color: ${lime}; }
          .themes { margin-top: 34px !important; color: ${lime}; font: 600 32px "IBM Plex Mono"; letter-spacing: .06em; text-transform: uppercase; }
          .claim { font: 500 56px "Space Grotesk"; letter-spacing: -.025em; }
          .site { display: flex; align-items: center; gap: 24px; font: 600 30px "IBM Plex Mono"; }
          .site::after { content: ""; flex: 1; height: 2px; background: #3A424B; }
        </style>
        <div class="card">
          <div>
            <p class="name">Mile Ferenc<span>.</span></p>
            <p class="themes">${themes}</p>
          </div>
          <p class="claim">${claim}</p>
          <p class="site">problemas.hu</p>
        </div>`,
    })
    const fonts = await page.evaluate(async () => {
      const wanted = ['700 156px "Space Grotesk"', '500 56px "Space Grotesk"', '600 32px "IBM Plex Mono"']
      const loaded = await Promise.all(wanted.map(font => document.fonts.load(font, 'AŐŰáé')))
      await document.fonts.ready
      return loaded.every(faces => faces.length > 0)
    })
    if (!fonts) throw new Error('The built site fonts did not load')

    const overflow = await page.locator('.card').evaluate(card =>
      [...card.querySelectorAll('p')].some(p => p.scrollWidth > p.clientWidth || p.getBoundingClientRect().bottom > 630))
    if (overflow) throw new Error(`Text does not fit in ${file}`)

    await page.screenshot({ path: `public/${file}` })
  }

  const render = async (svg, size) => {
    await page.setViewportSize({ width: size, height: size })
    await page.setContent(`<style>body { margin: 0; } svg { display: block; width: ${size}px; height: ${size}px; }</style>${svg}`)
    return page.screenshot({ omitBackground: true })
  }

  await writeFile('public/favicon.svg', favicon)
  await writeFile('public/favicon-96x96.png', await render(favicon, 96))
  const icoImages = []
  for (const size of [16, 32, 48]) icoImages.push({ size, png: await render(favicon, size) })
  await writeFile('public/favicon.ico', ico(icoImages))
  await writeFile('public/apple-touch-icon.png', await render(appIcon, 180))
  for (const size of [192, 512]) {
    await writeFile(`public/web-app-manifest-${size}x${size}.png`, await render(appIcon, size))
  }
}
finally {
  await browser.close()
}
process.exit()
