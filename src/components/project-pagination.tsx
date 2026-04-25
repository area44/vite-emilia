import Card from "./card";

type ProjectPaginationProps = {
  prev: {
    slug: string;
    title: string;
    cover: string;
    coverHash?: string;
    coverWidth?: number;
    coverHeight?: number;
  } | null;
  next: {
    slug: string;
    title: string;
    cover: string;
    coverHash?: string;
    coverWidth?: number;
    coverHeight?: number;
  } | null;
};

const ProjectPagination = ({ prev, next }: ProjectPaginationProps) => (
  <div className="mt-12 mb-8">
    <div className="mb-8 grid grid-cols-[auto_1fr] items-center gap-4 md:grid-cols-[250px_1fr]">
      <h2 className="m-0 text-sm font-medium tracking-widest whitespace-nowrap text-text-muted uppercase">
        More Projects
      </h2>
      <div className="h-0.5 w-full bg-muted" />
    </div>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      {prev && <Card key={prev.slug} item={prev} aspectRatio="16 / 9" />}
      {next && <Card key={next.slug} item={next} aspectRatio="16 / 9" />}
    </div>
  </div>
);

export default ProjectPagination;
