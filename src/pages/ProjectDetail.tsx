import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Project from "../components/project";
import { getProjects, getProjectImages, type ProjectData, type ProjectImage } from "../utils/data";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [prev, setPrev] = useState<ProjectData | null>(null);
  const [next, setNext] = useState<ProjectData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      const allProjects = await getProjects();
      const index = allProjects.findIndex((p) => p.slug === `/${slug}` || p.slug === slug);

      if (index !== -1) {
        const currentProject = allProjects[index];
        if (currentProject) {
          setProject(currentProject);
          setPrev(index > 0 ? (allProjects[index - 1] ?? null) : null);
          setNext(index < allProjects.length - 1 ? (allProjects[index + 1] ?? null) : null);

          const currentSlug = currentProject.slug;
          const projectImages = await getProjectImages(currentSlug);
          setImages(projectImages);
        }
      }
    };

    loadData();
  }, [slug]);

  if (!project) return null;

  const Content = project.content;

  return (
    <Project project={project} images={images} prev={prev} next={next}>
      <Content />
    </Project>
  );
};

export default ProjectDetail;
