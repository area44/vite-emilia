/// <reference types="vite-plus/client" />

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.md" {
  import type { ComponentType } from "react";
  const html: string;
  export const frontmatter: Record<string, any>;
  const content: ComponentType;
  export default content;
}

declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const frontmatter: Record<string, any>;
  const content: ComponentType;
  export default content;
}
