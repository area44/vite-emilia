import React from "react";
import { useLoaderData } from "@tanstack/react-router";

import Project from "../components/project";

const ProjectDetail = () => {
  const { project, images, prev, next } = useLoaderData({ from: '/$slug' });

  if (!project) return null;

  const Content = project.content;

  return (
    <Project project={project} images={images} prev={prev} next={next}>
      <Content />
    </Project>
  );
};

export default ProjectDetail;
