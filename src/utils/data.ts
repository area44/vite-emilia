export interface ProjectFrontmatter {
  title: string
  date: string
  areas: string[]
  cover: string
  background?: string
  slug?: string
}

export interface ProjectData extends ProjectFrontmatter {
  slug: string
  content: any
  excerpt: string
}

interface MdxModule {
  frontmatter: ProjectFrontmatter
  default: any
}

// All images from src/content/projects
const allImages = import.meta.glob<string>(
  '/src/content/projects/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' },
)

// All project modules
const projectModules = import.meta.glob<MdxModule>(
  '/src/content/projects/*/index.mdx',
  { eager: true },
)

export const getProjects = async (): Promise<ProjectData[]> => {
  const projects = Object.entries(projectModules).map(([path, module]) => {
    // path: "/src/content/projects/minimal-blog/index.mdx"
    const projectDir = path.substring(0, path.lastIndexOf('/') + 1)
    const folderName = path.split('/').slice(-2, -1)[0]
    const { frontmatter } = module

    const coverFileName = frontmatter.cover.replace(/^\.\//, '')
    const fullCoverPath = `${projectDir}${coverFileName}`

    // Find the image in our globbed map
    const coverUrl = allImages[fullCoverPath] || frontmatter.cover

    return {
      slug: frontmatter.slug || `/${folderName}`,
      title: frontmatter.title,
      date: frontmatter.date,
      areas: frontmatter.areas,
      cover: coverUrl,
      background: frontmatter.background,
      content: module.default,
      excerpt: frontmatter.title,
    }
  })

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export const getProjectImages = async (
  slug: string,
): Promise<{ name: string; url: string }[]> => {
  let projectDir = ''
  for (const [path, module] of Object.entries(projectModules)) {
    const folderName = path.split('/').slice(-2, -1)[0]
    const currentSlug = module.frontmatter.slug || `/${folderName}`
    if (currentSlug === slug) {
      projectDir = path.substring(0, path.lastIndexOf('/') + 1)
      break
    }
  }

  if (!projectDir) return []

  return Object.entries(allImages)
    .filter(([path]) => path.startsWith(projectDir))
    .map(([path, url]) => ({
      name: path.split('/').pop() || '',
      url: url,
    }))
}
