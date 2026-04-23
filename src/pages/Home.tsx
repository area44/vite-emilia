import { useLoaderData } from "react-router";

import Projects from "../components/projects";
import { getProjects } from "../utils/data";

export async function loader() {
  const projects = await getProjects();
  return { projects };
}

const Home = () => {
  const { projects } = useLoaderData<typeof loader>();
  return <Projects projects={projects} />;
};

export default Home;
