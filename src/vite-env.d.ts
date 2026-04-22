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

declare module "*?as=metadata" {
  const metadata: {
    src: string;
    width: number;
    height: number;
    format: string;
  };
  export default metadata;
}
