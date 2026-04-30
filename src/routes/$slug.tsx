import type { ComponentType } from "react";

import { createFileRoute } from "@tanstack/react-router";

import Project from "../components/project";
import { getProjects, getProjectImages } from "../lib/data";
import { siteConfig } from "../lib/site.config";

interface MdxModule {
  frontmatter: {
    slug?: string;
    title: string;
  };
  default: ComponentType;
}

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    const { slug } = params;
    const allProjects = await getProjects();

    const index = allProjects.findIndex((p) => {
      const pSlug = p.slug.startsWith("/") ? p.slug.substring(1) : p.slug;
      return pSlug === slug;
    });

    if (index === -1) {
      throw new Error("Project not found");
    }

    const project = allProjects[index]!;
    const prev = index > 0 ? (allProjects[index - 1] ?? null) : null;
    const next = index < allProjects.length - 1 ? (allProjects[index + 1] ?? null) : null;
    const images = await getProjectImages(project.slug);

    return { project, images, prev, next };
  },
  head: ({ data }) => {
    const project = data?.project;

    if (!project) {
      return {
        meta: [{ title: siteConfig.siteTitle }],
      };
    }

    const title = `${project.title} | ${siteConfig.siteTitle}`;
    const description = project.description || project.excerpt;
    const ogImage = project.ogImage || project.cover;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: ogImage },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
      ],
    };
  },
  component: ProjectDetailComponent,
});

function ProjectDetailComponent() {
  const { project, images, prev, next } = Route.useLoaderData();

  const mdxModules = import.meta.glob<MdxModule>("../content/*/index.mdx", {
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
}
