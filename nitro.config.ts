import { getProjectSlugs } from "./scripts/get-project-slugs.mjs";

export default defineNitroConfig({
  compatibilityDate: "2025-02-12",
  ssr: false,
  prerender: {
    routes: getProjectSlugs(),
  },
  output: {
    publicDir: "dist",
  },
});
