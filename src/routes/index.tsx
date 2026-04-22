import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Home from '../pages/Home'
import { getProjects } from '../utils/data'

export const Route = createFileRoute('/')({
  loader: async () => {
    const projects = await getProjects()
    return { projects }
  },
  component: Home,
})
