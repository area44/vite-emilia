import { defineConfig } from "nitro";
import { execSync } from "node:child_process";

const getRoutes = () => {
  try {
    const output = execSync("node scripts/get-project-slugs.mjs", { encoding: "utf-8" });
    const slugs = JSON.parse(output);
    return ["/", ...slugs];
  } catch (e) {
    console.error("Failed to get project slugs:", e);
    return ["/"];
  }
};

export default defineConfig({
  compatibilityDate: "2026-04-23",
  output: {
    publicDir: "dist",
  },
  prerender: {
    crawlLinks: true,
    routes: getRoutes(),
  },
});
