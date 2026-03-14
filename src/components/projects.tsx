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
        <div className="container">
          <p className="mb-4">
            Hi!{` `}
            <span role="img" aria-label="Wave emoji">
              👋
            </span>
            {` `}
            <br />
            Thanks for using <b>@lekoarts/gatsby-theme-emilia</b>. You currently
            don't have any content in your{` `}
            <i>projects</i> folder - that's why this page displays a placeholder
            text. Head over to the{` `}
            <a
              href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-emilia"
              className="text-primary hover:underline"
            >
              README
            </a>
            {` `}
            to learn how to setup them.
          </p>
          <p>
            <b>TL;DR:</b> <br />
            The starter automatically created the folder{' '}
            <code>content/projects</code>. Go into this folder, create a new
            folder called <code>example</code> and create an{' '}
            <code>index.mdx</code> file there and place an image. Edit the
            frontmatter like described in the{` `}
            <a
              href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-emilia"
              className="text-primary hover:underline"
            >
              README
            </a>
            .
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
