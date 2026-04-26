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
          <div className="animate-in fade-in flex flex-col gap-4 delay-800 duration-700 md:flex-row md:flex-wrap">
            {images.map((image) => {
              const ratio = image.width && image.height ? image.width / image.height : 1;
              return (
                <div
                  key={image.url}
                  className="relative h-auto w-full md:h-64 md:w-auto md:grow lg:h-80"
                  style={{
                    // Only apply flex properties on md and above
                    // We use a CSS variable or inline media query logic is hard,
                    // so we'll rely on tailwind classes for the container behavior.
                    // The style object below will be ignored by flex-col on mobile.
                    flexBasis: `${ratio * 12}rem`,
                    flexGrow: ratio,
                  }}
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    hash={image.hash}
                    width={image.width}
                    height={image.height}
                    className="block h-full w-full object-cover shadow-lg"
                  />
                </div>
              );
            })}
            {/* Prevent last row stretching - only on md+ */}
            <div className="hidden grow-[100] md:block" style={{ flexBasis: "24rem" }} />
          </div>
        </div>
        <ProjectPagination prev={prev} next={next} />
      </div>
    </Layout>
  );
};

export default Project;
