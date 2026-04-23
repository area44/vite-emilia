import { r as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite Emilia | AREA44</title>\n    <script>\n      (function () {\n        try {\n          var theme = localStorage.getItem(\"theme\");\n          var supportDarkMode = window.matchMedia(\"(prefers-color-scheme: dark)\").matches === true;\n          if (!theme && supportDarkMode) theme = \"dark\";\n          if (theme === \"dark\") document.documentElement.classList.add(\"dark\");\n        } catch (e) {}\n      })();\n    <\/script>\n    <script type=\"module\" crossorigin src=\"/app/assets/index-DmFiDlrw.js\"><\/script>\n    <link rel=\"stylesheet\" crossorigin href=\"/app/assets/index-BldFUZoQ.css\">\n  </head>\n  <body>\n    <div id=\"root\"></div>\n  </body>\n</html>\n", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260415-beta_chokidar@5.0.0_dotenv@17.4.2_giget@3.2.0_ioredis@5.10.1_jiti@2.6._7d5522b61c00d498891b60027fe7d186/node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
