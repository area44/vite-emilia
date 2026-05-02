import { createRequire } from "module";
const require = createRequire(import.meta.url);
try {
  const config = require("@area44/oxlint-config");
  console.log("Success:", !!config);
  console.log("Plugins:", config.plugins);
} catch (e) {
  console.error("Failed:", e.message);
}
