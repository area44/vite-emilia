import React, { useState } from "react";

import HeaderProject from "./header-project";
import Image from "./image";
import Layout from "./layout";
import Lightbox from "./lightbox";
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  const prevImage = () =>
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));

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
            {images.map((image, index) => {
              const ratio = image.width && image.height ? image.width / image.height : 1;
              return (
                <button
                  key={image.url}
                  onClick={() => openLightbox(index)}
                  className="relative h-auto w-full cursor-zoom-in border-none p-0 text-left outline-none md:h-64 md:w-auto md:grow lg:h-80"
                  style={{
                    flexBasis: `${ratio * 12}rem`,
                    flexGrow: ratio,
                  }}
                  aria-label={`View ${image.name} in full screen`}
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    hash={image.hash}
                    width={image.width}
                    height={image.height}
                    className="block h-full w-full object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                  />
                </button>
              );
            })}
            {/* Prevent last row stretching - only on md+ */}
            <div className="hidden grow-[100] md:block" style={{ flexBasis: "24rem" }} />
          </div>
        </div>
        <ProjectPagination prev={prev} next={next} />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </Layout>
  );
};

export default Project;
