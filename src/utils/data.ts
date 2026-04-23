import type { ComponentType } from "react";

import imageMetadataRaw from "../content/image-metadata.json";

const imageMetadata = imageMetadataRaw as Record<
  string,
  { hash: string; width: number; height: number }
>;

export interface ProjectFrontmatter {
  title: string;
  date: string;
  areas: string[];
  cover: string;
  background?: string;
  slug?: string;
}

export interface ProjectData extends ProjectFrontmatter {
  slug: string;
  excerpt: string;
  coverHash?: string;
  coverWidth?: number;
  coverHeight?: number;
}

export interface ProjectImage {
  name: string;
  url: string;
  hash?: string;
  width?: number;
  height?: number;
}

interface MdxModule {
  frontmatter: ProjectFrontmatter;
  default: ComponentType;
}

// All images from src/content/projects
const allImages = import.meta.glob<string>("../content/projects/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const getMetadataKey = (path: string) => {
  // Convert "../content/projects/..." to "src/content/projects/..."
  return path.replace(/^\.\.\/content\//, "src/content/");
};

export const getProjects = async (): Promise<ProjectData[]> => {
  const modules = import.meta.glob<MdxModule>("../content/projects/*/index.mdx", {
    eager: true,
  });

  const projects = Object.entries(modules).map(([path, module]) => {
    // path: "../content/projects/minimal-blog/index.mdx"
    const projectDir = path.substring(0, path.lastIndexOf("/") + 1);
    const folderName = path.split("/").slice(-2, -1)[0] ?? "unknown";
    const { frontmatter } = module;

    const coverFileName = frontmatter.cover.replace(/^\.\//, "");
    const fullCoverPath = `${projectDir}${coverFileName}`;

    // Find the image in our globbed map
    const coverUrl = allImages[fullCoverPath] ?? frontmatter.cover;
    const metadataKey = getMetadataKey(fullCoverPath);
    const metadata = imageMetadata[metadataKey];

    // Normalize slug: start with slash, use frontmatter or folder name
    let slug = frontmatter.slug ?? `/${folderName}`;
    if (!slug.startsWith("/")) {
      slug = `/${slug}`;
    }

    const project: ProjectData = {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      areas: frontmatter.areas,
      cover: coverUrl,
      excerpt: frontmatter.title,
      coverHash: metadata?.hash,
      coverWidth: metadata?.width,
      coverHeight: metadata?.height,
    };

    if (frontmatter.background !== undefined) {
      project.background = frontmatter.background;
    }

    return project;
  });

  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getProjectImages = async (slug: string): Promise<ProjectImage[]> => {
  const modules = import.meta.glob<MdxModule>("../content/projects/*/index.mdx", {
    eager: true,
  });

  let projectDir = "";
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;

  for (const [path, module] of Object.entries(modules)) {
    const folderName = path.split("/").slice(-2, -1)[0] ?? "unknown";
    let currentSlug = module.frontmatter.slug ?? `/${folderName}`;
    if (!currentSlug.startsWith("/")) {
      currentSlug = `/${currentSlug}`;
    }

    if (currentSlug === normalizedSlug) {
      projectDir = path.substring(0, path.lastIndexOf("/") + 1);
      break;
    }
  }

  if (!projectDir) return [];

  return Object.entries(allImages)
    .filter(([path]) => path.startsWith(projectDir))
    .map(([path, url]) => {
      const metadataKey = getMetadataKey(path);
      const metadata = imageMetadata[metadataKey];
      return {
        name: path.split("/").pop() ?? "",
        url: url,
        hash: metadata?.hash,
        width: metadata?.width,
        height: metadata?.height,
      };
    });
};
