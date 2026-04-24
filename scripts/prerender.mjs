import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, '..', p)

async function prerender() {
  const dist = toAbsolute('dist')
  const serverEntry = toAbsolute('dist/server/entry.server.js')

  if (!fs.existsSync(serverEntry)) {
    console.error('Server entry not found. Did you run the SSR build?')
    process.exit(1)
  }

  const { default: handleRequest } = await import(serverEntry)

  // Get project slugs for prerendering
  const projectsDir = toAbsolute('src/content/projects')
  const directories = fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())

  const routes = ['/']

  for (const dirent of directories) {
    const mdxPath = path.join(projectsDir, dirent.name, 'index.mdx')
    try {
      const content = fs.readFileSync(mdxPath, 'utf-8')
      const match = content.match(/slug:\s*["']?([^"'\n]+)["']?/)
      if (match && match[1]) {
        const s = match[1]
        routes.push(s.startsWith('/') ? s : `/${s}`)
      } else {
        routes.push(`/${dirent.name}`)
      }
    } catch {
      routes.push(`/${dirent.name}`)
    }
  }

  console.log('Prerendering routes:', routes)

  const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')

  for (const url of routes) {
    const request = new Request(`http://localhost${url}`)
    const responseHeaders = new Headers()

    const response = await handleRequest(request, 200, responseHeaders)
    const bodyHtml = await streamToString(response.body)

    // Extract head and body from the rendered HTML
    const headMatch = bodyHtml.match(/<head>([\s\S]*?)<\/head>/)
    const headContent = headMatch ? headMatch[1] : ''

    const bodyMatch = bodyHtml.match(/<body>([\s\S]*?)<\/body>/)
    const bodyContent = bodyMatch ? bodyMatch[1] : ''

    // Replace placeholders in template
    let finalHtml = template
      .replace(/<title>.*?<\/title>/, '') // Remove default title
      .replace('</head>', `${headContent}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`)

    const filePath = path.join(dist, url === '/' ? 'index.html' : `${url}/index.html`)
    const dirPath = path.dirname(filePath)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    fs.writeFileSync(filePath, finalHtml)
    console.log('Prerendered:', url)
  }
}

async function streamToString(stream) {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let result = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    result += decoder.decode(value, { stream: true })
  }

  return result
}

prerender()
