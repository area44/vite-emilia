import React, { useEffect, useState } from 'react'
import Projects from '../components/projects'
import { getProjects, ProjectData } from '../utils/data'

const Home = () => {
  const [projects, setProjects] = useState<ProjectData[]>([])

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  return <Projects projects={projects} />
}

export default Home
