import { defineConfig } from "oxlint";
import oxlintConfig from "./node_modules/@area44/oxlint-config/.oxlintrc.json" with { type: "json" };

export default defineConfig({
  extends: [oxlintConfig],
});
