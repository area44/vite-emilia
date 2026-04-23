import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  base: "/",
  plugins: [
    TanStackRouterVite(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react(),
    tailwindcss(),
    imagetools(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
