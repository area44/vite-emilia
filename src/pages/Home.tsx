import { useLoaderData, type MetaFunction } from "react-router";

import Projects from "../components/projects";
import useSiteMetadata from "../hooks/use-site-metadata";
import { getProjects } from "../utils/data";

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

export const meta: MetaFunction = () => {
  const site = useSiteMetadata();
  return [
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
  ];
};

const Home = () => {
  const { projects } = useLoaderData<typeof loader>();
  return <Projects projects={projects} />;
};

export default Home;
