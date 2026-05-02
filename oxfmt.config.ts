import { defineConfig } from "oxfmt";

import oxfmtConfig from "./node_modules/@area44/oxfmt-config/.oxfmtrc.json" with { type: "json" };

export default defineConfig({
  ...oxfmtConfig,
  sortTailwindcss: {
    stylesheet: "./src/index.css",
    attributes: ["class", "className"],
    functions: ["clsx", "cn", "cva", "tv"],
  },
});
