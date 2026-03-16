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

interface ImageModule {
  default: string
}

// All images from src/content/projects
const allImages = import.meta.glob<ImageModule>(
  '../content/projects/**/*.(jpg|jpeg|png|webp)',
  { eager: true },
)

export const getProjects = async (): Promise<ProjectData[]> => {
  const modules = import.meta.glob<MdxModule>(
    '../content/projects/*/index.mdx',
    {
      eager: true,
    },
  )

  const projects = Object.entries(modules).map(([path, module]) => {
    const projectDir = path.replace('index.mdx', '')
    const folderName = path.split('/').slice(-2, -1)[0]
    const { frontmatter } = module

    // Resolve cover image path
    const coverFileName = frontmatter.cover.replace('./', '')
    const fullCoverPath = `${projectDir}${coverFileName}`
    const coverUrl = allImages[fullCoverPath]?.default || fullCoverPath

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
  const modules = import.meta.glob<MdxModule>(
    '../content/projects/*/index.mdx',
    {
      eager: true,
    },
  )

  let projectDir = ''
  for (const [path, module] of Object.entries(modules)) {
    const folderName = path.split('/').slice(-2, -1)[0]
    if (module.frontmatter.slug === slug || `/${folderName}` === slug) {
      projectDir = path.replace('index.mdx', '')
      break
    }
  }

  if (!projectDir) return []

  return Object.entries(allImages)
    .filter(([path]) => path.startsWith(projectDir) && !path.includes('avatar'))
    .map(([path, module]) => ({
      name: path.split('/').pop() || '',
      url: module.default,
    }))
}
