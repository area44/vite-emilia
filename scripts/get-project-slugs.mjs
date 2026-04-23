import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const projectsDir = join(process.cwd(), "src/content/projects");

export function getProjectSlugs() {
  const slugs = ["/"];
  try {
    const folders = readdirSync(projectsDir);
    for (const folder of folders) {
      const mdxPath = join(projectsDir, folder, "index.mdx");
      try {
        const content = readFileSync(mdxPath, "utf8");
        const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)["']?/);
        if (slugMatch && slugMatch[1]) {
          slugs.push(slugMatch[1].startsWith("/") ? slugMatch[1] : `/${slugMatch[1]}`);
        } else {
          slugs.push(`/${folder}`);
        }
      } catch {
        // Skip folders without index.mdx or other errors
      }
    }
  } catch (e) {
    console.error("Error reading projects directory:", e);
  }
  return slugs;
}
