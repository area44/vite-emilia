
import Card from "./card"

type ProjectPaginationProps = {
  prev: {
    slug: string
    title: string
    cover: string
  } | null
  next: {
    slug: string
    title: string
    cover: string
  } | null
}

const ProjectPagination = ({ prev, next }: ProjectPaginationProps) => (
  <div className="mt-12 mb-8">
    <div className="grid grid-cols-[auto_1fr] md:grid-cols-[250px_1fr] items-center mb-8 gap-4">
      <h2
        className="text-text-muted font-medium tracking-widest uppercase text-sm m-0 whitespace-nowrap"
      >
        More Projects
      </h2>
      <div className="w-full h-0.5 bg-muted" />
    </div>
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
    >
      {prev && <Card item={prev} />}
      {next && <Card item={next} />}
    </div>
  </div>
)

export default ProjectPagination
