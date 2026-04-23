import { useLoaderData } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

import Projects from "../components/projects";
import { getProjects, type ProjectData } from "../utils/data";

const Home = () => {
  const { projects: initialProjects } = useLoaderData({ from: "/" });
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects || []);

  useEffect(() => {
    if (projects.length === 0) {
      getProjects().then(setProjects);
    }
  }, [projects.length]);

  return <Projects projects={projects} />;
};

export default Home;
