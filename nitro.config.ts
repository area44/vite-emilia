import { defineNitroConfig } from "nitro/config";

import { getProjectSlugs } from "./scripts/get-project-slugs.mjs";

export default defineNitroConfig({
  compatibilityDate: "2025-04-15",
  output: {
    dir: "dist",
    publicDir: "dist",
  },
  prerender: {
    routes: await getProjectSlugs(),
  },
});
