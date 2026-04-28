import { createFileRoute } from "@tanstack/react-router";

import Projects from "../components/projects";
import { getProjects } from "../lib/data";
import { siteConfig } from "../lib/site.config";

export const Route = createFileRoute("/")({
  loader: async () => {
    const projects = await getProjects();
    return { projects };
  },
  head: () => {
    return {
      meta: [
        { title: siteConfig.siteTitleAlt },
        { name: "description", content: siteConfig.siteDescription },
        { property: "og:title", content: siteConfig.siteTitleAlt },
        { property: "og:description", content: siteConfig.siteDescription },
        { property: "og:image", content: siteConfig.siteImage },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: siteConfig.siteTitleAlt },
        { name: "twitter:description", content: siteConfig.siteDescription },
        { name: "twitter:image", content: siteConfig.siteImage },
      ],
    };
  },
  component: HomeComponent,
});

function HomeComponent() {
  const { projects } = Route.useLoaderData();
  return <Projects projects={projects} />;
}
