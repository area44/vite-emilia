import type { Config } from "@react-router/dev/config";

import fs from "node:fs";
import path from "node:path";

export default {
  ssr: true,
  appDirectory: "src",
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
          return match[1];
        }
      } catch {
        // Fallback to folder name
      }
      return `/${dirent.name}`;
    });

    return ["/", ...slugs];
  },
} satisfies Config;
