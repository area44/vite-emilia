/// <reference types="vite/client" />

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.mdx" {
  import type { ComponentType } from "react";
  const content: ComponentType;
  export default content;
}
