// Serves the generated site the way GitHub Pages does, for the e2e tests:
// directory URLs get a trailing slash and unknown paths return 404.html.
import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, resolve, sep } from 'node:path'

const root = resolve('.output/public')
const port = Number(process.env.PORT) || 4173
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.webmanifest': 'application/manifest+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
}

async function send(response, status, file) {
  const body = await readFile(file)
  response.writeHead(status, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
  response.end(body)
}

createServer(async (request, response) => {
  try {
    const { pathname, search } = new URL(request.url, 'http://localhost')
    let file = join(root, decodeURIComponent(pathname))
    if (file !== root && !file.startsWith(root + sep)) throw new Error('Outside the site root')

    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(301, { location: `${pathname}/${search}` })
        return response.end()
      }
      file = join(file, 'index.html')
    }
    await send(response, 200, file)
  }
  catch {
    await send(response, 404, join(root, '404.html')).catch(() => {
      response.writeHead(404)
      response.end()
    })
  }
}).listen(port, '127.0.0.1', () => console.log(`Serving ${root} on http://localhost:${port}`))
