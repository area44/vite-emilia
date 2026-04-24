import { createFileRoute } from "@tanstack/react-router";

import Projects from "../components/projects";
import useSiteMetadata from "../hooks/use-site-metadata";
import { getProjects } from "../utils/data";

export const Route = createFileRoute("/")({
  loader: async () => {
    const projects = await getProjects();
    return { projects };
  },
  head: () => {
    const site = useSiteMetadata();
    return {
      meta: [
        { title: site.siteTitleAlt },
        { name: "description", content: site.siteDescription },
        { property: "og:title", content: site.siteTitleAlt },
        { property: "og:description", content: site.siteDescription },
        { property: "og:image", content: site.siteImage },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: site.siteTitleAlt },
        { name: "twitter:description", content: site.siteDescription },
        { name: "twitter:image", content: site.siteImage },
      ],
    };
  },
  component: HomeComponent,
});

function HomeComponent() {
  const { projects } = Route.useLoaderData();
  return <Projects projects={projects} />;
}
