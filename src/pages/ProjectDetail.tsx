import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Project from '../components/project'
import { getProjects, getProjectImages, ProjectData } from '../utils/data'

const ProjectDetail = () => {
  const { slug } = useParams()
  const [project, setProject] = useState<ProjectData | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [prev, setPrev] = useState<ProjectData | null>(null)
  const [next, setNext] = useState<ProjectData | null>(null)

  useEffect(() => {
    const loadData = async () => {
      const allProjects = await getProjects()
      const index = allProjects.findIndex((p) => p.slug === `/${slug}`)

      if (index !== -1) {
        setProject(allProjects[index])
        setPrev(index > 0 ? allProjects[index - 1] : null)
        setNext(index < allProjects.length - 1 ? allProjects[index + 1] : null)

        const projectImages = await getProjectImages(slug || '')
        setImages(projectImages)
      }
    }

    loadData()
  }, [slug])

  if (!project) return null

  const Content = project.content

  return (
    <Project project={project} images={images} prev={prev} next={next}>
      <Content />
    </Project>
  )
}

export default ProjectDetail
