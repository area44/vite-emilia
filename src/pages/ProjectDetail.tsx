import React, { useEffect, useState } from "react";

import Project from "../components/project";
import { getProjects, getProjectImages, type ProjectData, type ProjectImage } from "../utils/data";

const ProjectDetail = () => {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [prev, setPrev] = useState<ProjectData | null>(null);
  const [next, setNext] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const slug = window.location.pathname;
      if (!slug || slug === "/") {
        setLoading(false);
        return;
      }

      const allProjects = await getProjects();
      const index = allProjects.findIndex((p) => p.slug === slug || p.slug === `/${slug}`);

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
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return null;
  if (!project)
    return (
      <div className="container py-20 text-center">
        <p className="text-xl">Project not found.</p>
      </div>
    );

  const Content = project.content;

  return (
    <Project project={project} images={images} prev={prev} next={next}>
      <Content />
    </Project>
  );
};

export default ProjectDetail;
