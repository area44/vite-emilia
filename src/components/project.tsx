import React from "react";

import HeaderProject from "./header-project";
import Image from "./image";
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
    coverHash?: string;
    coverWidth?: number;
    coverHeight?: number;
  };
  images: {
    name: string;
    url: string;
    hash?: string;
    width?: number;
    height?: number;
  }[];
  prev: {
    slug: string;
    title: string;
    cover: string;
    coverHash?: string;
    coverWidth?: number;
    coverHeight?: number;
  } | null;
  next: {
    slug: string;
    title: string;
    cover: string;
    coverHash?: string;
    coverWidth?: number;
    coverHeight?: number;
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
      <Seo />
      <HeaderProject
        title={project.title}
        description={children}
        areas={project.areas}
        date={project.date}
      />
      <div className="relative z-10 container -mt-24 md:-mt-32">
        <div className="mx-auto max-w-6xl">
          <div className="animate-in fade-in columns-1 gap-2 delay-800 duration-700 md:columns-2 md:gap-4">
            {images.map((image) => {
              const isLandscape = image.width && image.height && image.width > image.height * 1.1;
              return (
                <div
                  key={image.url}
                  className={`mb-2 break-inside-avoid md:mb-4 ${
                    isLandscape ? "w-full [column-span:all]" : ""
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    hash={image.hash}
                    width={image.width}
                    height={image.height}
                    className="block w-full shadow-lg"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <ProjectPagination prev={prev} next={next} />
      </div>
    </Layout>
  );
};

export default Project;
