import type { Config } from "@react-router/dev/config";

import fs from "node:fs";
import path from "node:path";

const base = process.env.BASE || "/";
const basename = base === "/" ? "/" : base.replace(/\/$/, "");

export default {
  // Enable SSR for full HTML generation during prerendering (SSG)
  ssr: true,
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
