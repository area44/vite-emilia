import fs from "node:fs";
import path from "node:path";

const projectsDir = "src/content/projects";
const slugs = [];

if (fs.existsSync(projectsDir)) {
  const folders = fs.readdirSync(projectsDir);
  for (const folder of folders) {
    const indexPath = path.join(projectsDir, folder, "index.mdx");
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, "utf-8");
      const slugMatch = content.match(/slug:\s*["'](.+?)["']/);
      if (slugMatch) {
        slugs.push(slugMatch[1]);
      } else {
        slugs.push(`/${folder}`);
      }
    }
  }
}

process.stdout.write(JSON.stringify(slugs));
