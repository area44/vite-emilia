import { defineNitroConfig } from "nitro/config";

import { getProjectSlugs } from "./scripts/get-project-slugs.mjs";

export default defineNitroConfig({
  compatibilityDate: "2025-04-15",
  publicDir: "dist",
  prerender: {
    routes: await getProjectSlugs(),
  },
  hooks: {
    async compiled(_nitro) {
      const fs = await import("node:fs/promises");
      const path = await import("node:path");

      const indexPath = path.resolve(process.cwd(), "dist/index.html");
      const indexHtml = await fs.readFile(indexPath, "utf-8");

      const publicDir = path.resolve(process.cwd(), ".output/public");

      // Fix the root index.html as well
      await fs.writeFile(path.join(publicDir, "index.html"), indexHtml);

      const slugs = await getProjectSlugs();
      for (const slug of slugs) {
        if (slug === "/") continue;
        const routeDir = path.join(publicDir, slug);
        await fs.mkdir(routeDir, { recursive: true });
        await fs.writeFile(path.join(routeDir, "index.html"), indexHtml);
      }
    },
  },
});
