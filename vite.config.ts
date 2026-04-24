import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

const base = process.env.BASE || "/";

export default defineConfig({
  base,
  define: {
    "process.env.BASE": JSON.stringify(base),
  },
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    tailwindcss(),
    imagetools(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
