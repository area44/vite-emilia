/* eslint no-shadow: 0 */
import Layout from './layout'
import Header from './header'
import Card from './card'
import Seo from './seo'

type Props = {
  projects: {
    slug: string
    title: string
    cover: string
    background?: string
  }[]
}

const Projects = ({ projects }: Props) => {
  if (projects.length === 0) {
    return (
      <Layout>
        <Header />
        <div className="container py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">No projects found</h2>
          <p className="text-text-muted">
            It looks like you haven't added any projects yet. Check the README
            for instructions on how to get started!
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo />
      <Header />
      <main className="relative">
        <div className="animate-in slide-in-from-bottom-8 duration-700 delay-600">
          <div className="container -mt-32 grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 items-start">
            {projects.map((project, index) => {
              const val = project.background || '#000'
              return (
                <Card
                  key={project.slug}
                  eager={index === 0}
                  item={project}
                  overlay={val}
                />
              )
            })}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Projects
