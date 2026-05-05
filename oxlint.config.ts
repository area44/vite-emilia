import { createRequire } from "module";
import { defineConfig } from "oxlint";

const require = createRequire(import.meta.url);
const oxlintConfig = require("@area44/oxlint-config");

export default defineConfig({
  extends: [oxlintConfig],
});
