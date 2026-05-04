import oxfmtConfig from "@area44/oxfmt-config";
import { defineConfig } from "oxfmt";

export default defineConfig({
  extends: [oxfmtConfig],
  sortTailwindcss: {
    stylesheet: "./src/index.css",
    attributes: ["class", "className"],
    functions: ["clsx", "cn", "cva", "tv"],
  },
});
