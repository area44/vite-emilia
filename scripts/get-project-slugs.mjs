import fs from "node:fs";
import path from "node:path";

const PROJECTS_DIR = "src/content/projects";

export async function getProjectSlugs() {
  const slugs = ["/"];
  const projects = await fs.promises.readdir(PROJECTS_DIR);

  for (const project of projects) {
    const indexPath = path.join(PROJECTS_DIR, project, "index.mdx");
    if (fs.existsSync(indexPath)) {
      const content = await fs.promises.readFile(indexPath, "utf-8");
      const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)["']?/);
      if (slugMatch && slugMatch[1]) {
        slugs.push(slugMatch[1].startsWith("/") ? slugMatch[1] : `/${slugMatch[1]}`);
      } else {
        slugs.push(`/${project}`);
      }
    }
  }

  return slugs;
}

// If run directly
if (process.argv[1] === import.meta.filename) {
  getProjectSlugs().then((slugs) => console.log(slugs.join("\n")));
}
