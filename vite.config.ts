import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite-plus";

const base = process.env.BASE || "/";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: [
      "*.min.*",
      "*.map",
      "**/public",
      "**/build",
      "**/dist",
      "**/out",
      "**/.github",
      "**/.next",
      "**/.astro",
      "**/.netlify",
      "src/routeTree.gen.ts",
    ],
    sortImports: {
      groups: [
        "type-import",
        ["value-builtin", "value-external"],
        "type-internal",
        "value-internal",
        ["type-parent", "type-sibling", "type-index"],
        ["value-parent", "value-sibling", "value-index"],
        "unknown",
      ],
    },
    sortTailwindcss: {
      stylesheet: "./src/index.css",
      attributes: ["class", "className"],
      functions: ["clsx", "cn", "cva", "tv"],
    },
  },
  lint: {
    plugins: [
      "typescript",
      "unicorn",
      "react",
      "react-perf",
      "import",
      "jsx-a11y",
      "node",
      "promise",
      "vitest",
    ],
    ignorePatterns: [
      "*.min.*",
      "*.map",
      "**/public",
      "**/build",
      "**/dist",
      "**/out",
      "**/.github",
      "**/.next",
      "**/.astro",
      "**/.netlify",
      "src/routeTree.gen.ts",
    ],
  },
  base,
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    react(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    tailwindcss(),
  ],
  build: {
    minify: "oxc",
  },
});
