import type { Config } from "@react-router/dev/config";

import fs from "node:fs";
import path from "node:path";

const basename = process.env.BASE_URL || "/";

export default {
  // Use ssr: false for SPA mode which is more compatible with static hosting (SSG)
  // Prerendering will still generate static HTML files for all routes.
  ssr: false,
  appDirectory: "src",
  basename,
  async prerender() {
    const projectsDir = path.join(process.cwd(), "src/content/projects");
    const directories = fs
      .readdirSync(projectsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory());

    const slugs = directories.map((dirent) => {
      const mdxPath = path.join(projectsDir, dirent.name, "index.mdx");
      try {
        const content = fs.readFileSync(mdxPath, "utf-8");
        const match = content.match(/slug:\s*["']?([^"'\n]+)["']?/);
        if (match && match[1]) {
          const s = match[1];
          return s.startsWith("/") ? s : `/${s}`;
        }
      } catch {
        // Fallback to folder name
      }
      return `/${dirent.name}`;
    });

    return ["/", ...slugs];
  },
} satisfies Config;
