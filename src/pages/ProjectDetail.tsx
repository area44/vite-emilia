import type { ComponentType } from "react";

import { useLoaderData, type LoaderFunctionArgs } from "react-router";

import Project from "../components/project";
import { getProjects, getProjectImages } from "../utils/data";

interface MdxModule {
  frontmatter: {
    slug?: string;
    title: string;
  };
  default: ComponentType;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) throw new Error("No slug provided");

  const allProjects = await getProjects();

  // Check both with and without leading slash
  const index = allProjects.findIndex((p) => {
    const pSlug = p.slug.startsWith("/") ? p.slug.substring(1) : p.slug;
    return pSlug === slug;
  });

  if (index === -1) {
    throw new Response("Not Found", { status: 404 });
  }

  const project = allProjects[index]!;
  const prev = index > 0 ? (allProjects[index - 1] ?? null) : null;
  const next = index < allProjects.length - 1 ? (allProjects[index + 1] ?? null) : null;
  const images = await getProjectImages(project.slug);

  return { project, images, prev, next };
}

const ProjectDetail = () => {
  const { project, images, prev, next } = useLoaderData<typeof loader>();

  // Find the MDX content dynamically
  const mdxModules = import.meta.glob<MdxModule>("../content/projects/*/index.mdx", {
    eager: true,
  });

  const mdxModule = Object.values(mdxModules).find((module) => {
    const mSlug =
      module.frontmatter.slug ?? `/${module.frontmatter.title.toLowerCase().replace(/\s+/g, "-")}`;
    return mSlug === project.slug;
  });

  const Content = mdxModule?.default || (() => null);

  return (
    <Project project={project} images={images} prev={prev} next={next}>
      <Content />
    </Project>
  );
};

export default ProjectDetail;
