import React from "react";

import HeaderProject from "./header-project";
import Layout from "./layout";
import ProjectPagination from "./project-pagination";
import Seo from "./seo";

export type EmiliaProjectProps = {
  project: {
    excerpt: string;
    date: string;
    slug: string;
    title: string;
    areas: string[];
    cover: string;
  };
  images: {
    name: string;
    url: string;
  }[];
  prev: {
    slug: string;
    title: string;
    cover: string;
  } | null;
  next: {
    slug: string;
    title: string;
    cover: string;
  } | null;
};

const Project: React.FC<React.PropsWithChildren<EmiliaProjectProps>> = ({
  project,
  images,
  prev,
  next,
  children,
}) => {
  return (
    <Layout>
      <Seo
        title={project.title}
        description={project.excerpt}
        pathname={project.slug}
        image={project.cover}
      />
      <HeaderProject
        title={project.title}
        description={children}
        areas={project.areas}
        date={project.date}
      />
      <div className="relative z-10 container -mt-24 md:-mt-32">
        <div className="animate-in fade-in delay-800 duration-700">
          {images.map((image) => (
            <img
              key={image.name}
              src={image.url}
              alt={image.name}
              className="mb-8 block w-full shadow-2xl md:mb-12"
            />
          ))}
        </div>
        <ProjectPagination prev={prev} next={next} />
      </div>
    </Layout>
  );
};

export default Project;
