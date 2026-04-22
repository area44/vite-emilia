import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
