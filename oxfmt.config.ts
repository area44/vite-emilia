import { defineConfig } from "oxfmt";

import oxfmtConfig from "@area44/oxfmt-config";

export default defineConfig({
  ...oxfmtConfig,
  sortTailwindcss: {
    stylesheet: "./src/index.css",
    attributes: ["class", "className"],
    functions: ["clsx", "cn", "cva", "tv"],
  },
});
