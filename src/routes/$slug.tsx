import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import ProjectDetail from '../pages/ProjectDetail'
import { getProjects, getProjectImages } from '../utils/data'

export const Route = createFileRoute('/$slug')({
  loader: async ({ params }) => {
    const allProjects = await getProjects()
    const index = allProjects.findIndex((p) => p.slug === `/${params.slug}` || p.slug === params.slug)

    if (index === -1) return { project: null, images: [], prev: null, next: null }

    const project = allProjects[index]
    const images = await getProjectImages(project.slug)
    const prev = index > 0 ? allProjects[index - 1] : null
    const next = index < allProjects.length - 1 ? allProjects[index + 1] : null

    return { project, images, prev, next }
  },
  component: ProjectDetail,
})
