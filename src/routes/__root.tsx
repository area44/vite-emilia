import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import "../index.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = localStorage.getItem("theme");
                  var supportDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches === true;
                  if (!theme && supportDarkMode) theme = "dark";
                  if (theme === "dark") document.documentElement.classList.add("dark");
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <TanStackRouterDevtools />
      </body>
    </html>
  );
}
