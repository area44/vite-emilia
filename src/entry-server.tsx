import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import clientAssets from "./entry-client?assets=client";
import serverAssets from "./entry-server?assets=ssr";

export default {
  async fetch(req: Request) {
    const assets = clientAssets.merge(serverAssets);
    const url = new URL(req.url);

    const html = renderToString(
      <React.StrictMode>
        <StaticRouter location={url.pathname}>
          <App />
        </StaticRouter>
      </React.StrictMode>
    );

    return new Response(
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite Emilia | AREA44</title>
    <script>
      (function () {
        try {
          var theme = localStorage.getItem("theme");
          var supportDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches === true;
          if (!theme && supportDarkMode) theme = "dark";
          if (theme === "dark") document.documentElement.classList.add("dark");
        } catch (e) {}
      })();
    </script>
    ${assets.css.map((attr: any) => `<link rel="stylesheet" ${Object.entries(attr).map(([k, v]) => `${k}="${v}"`).join(' ')}>`).join('\n')}
    ${assets.js.map((attr: any) => `<link rel="modulepreload" ${Object.entries(attr).map(([k, v]) => `${k}="${v}"`).join(' ')}>`).join('\n')}
    <script type="module" src="${assets.entry}"></script>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>`,
      { headers: { "Content-Type": "text/html;charset=utf-8" } }
    );
  },
};
