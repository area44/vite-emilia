import { createRequire } from "module";
import { defineConfig } from "oxfmt";

const require = createRequire(import.meta.url);
const oxfmtConfig = require("@area44/oxfmt-config");

export default defineConfig({
  ...oxfmtConfig,
  sortTailwindcss: {
    stylesheet: "./src/index.css",
    attributes: ["class", "className"],
    functions: ["clsx", "cn", "cva", "tv"],
  },
});
