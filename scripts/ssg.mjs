import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function ssg() {
  // 1. Build the client and server
  console.log('Building client...')
  await build({
    build: {
      ssr: false,
      outDir: 'dist',
    },
  })

  console.log('Building server...')
  await build({
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist/server',
    },
  })

  // 2. Import the render function from the server build
  let serverPath = path.resolve(root, 'dist/server/entry-server.js')
  if (!fs.existsSync(serverPath)) {
    serverPath = path.resolve(root, 'dist/server/entry-server.mjs')
  }

  const { render } = await import(serverPath)

  // 3. Define routes to render
  const projectDirs = fs.readdirSync(path.resolve(root, 'src/content/projects'))
  const routes = ['/', '/not-found']

  for (const dir of projectDirs) {
    const mdxPath = path.resolve(root, `src/content/projects/${dir}/index.mdx`)
    if (fs.existsSync(mdxPath)) {
      const content = fs.readFileSync(mdxPath, 'utf-8')
      const slugMatch = content.match(/slug:\s*["'](.+?)["']/)
      if (slugMatch && slugMatch[1]) {
        routes.push(slugMatch[1])
      } else {
        routes.push(`/${dir}`)
      }
    }
  }

  const template = fs.readFileSync(path.resolve(root, 'dist/index.html'), 'utf-8')

  // 4. Render each route
  for (const url of routes) {
    console.log(`Rendering ${url}...`)
    const appHtml = await render(url)
    const html = template.replace('<!--ssr-outlet-->', appHtml || '')

    // Normalize url for file path
    const normalizedUrl = url === '/' ? '/index' : url
    const filePath = path.join(root, 'dist', `${normalizedUrl}.html`)

    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, html)

    // Also create directory/index.html for clean URLs if not /index
    if (url !== '/') {
        const cleanPath = path.join(root, 'dist', url, 'index.html')
        const cleanDir = path.dirname(cleanPath)
        if (!fs.existsSync(cleanDir)) {
          fs.mkdirSync(cleanDir, { recursive: true })
        }
        fs.writeFileSync(cleanPath, html)
    }
  }

  console.log('SSG complete!')
}

ssg().catch(err => {
  console.error(err)
  process.exit(1)
})
