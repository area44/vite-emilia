export interface ProjectFrontmatter {
  title: string
  date: string
  areas: string[]
  cover: string
  background?: string
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

const allImages = import.meta.glob<ImageModule>('/content/projects/**/*.(jpg|jpeg|png|webp)', { eager: true })

export const getProjects = async (): Promise<ProjectData[]> => {
  const modules = import.meta.glob<MdxModule>('/content/projects/*/index.mdx', { eager: true })

  const projects = Object.entries(modules).map(([path, module]) => {
    const projectDir = path.replace('index.mdx', '')
    const slug = path.replace('/content/projects/', '').replace('/index.mdx', '')
    const { frontmatter } = module

    // Resolve cover image path using the globbed images
    const coverFileName = frontmatter.cover.replace('./', '')
    const fullCoverPath = `${projectDir}${coverFileName}`
    const coverUrl = allImages[fullCoverPath]?.default || fullCoverPath

    return {
      slug: `/${slug}`,
      title: frontmatter.title,
      date: frontmatter.date,
      areas: frontmatter.areas,
      cover: coverUrl,
      background: frontmatter.background,
      content: module.default,
      excerpt: frontmatter.title // Simple excerpt for now
    }
  })

  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getProjectImages = async (slug: string): Promise<{ name: string; url: string }[]> => {
  const projectSlug = slug.replace('/', '')
  const projectPathPrefix = `/content/projects/${projectSlug}/`

  return Object.entries(allImages)
    .filter(([path]) => path.startsWith(projectPathPrefix) && !path.includes('avatar'))
    .map(([path, module]) => ({
      name: path.split('/').pop() || '',
      url: module.default
    }))
}
