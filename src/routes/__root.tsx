import { createRootRoute, Outlet, HeadContent, Scripts } from "@tanstack/react-router";

import "@/index.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <HeadContent />
      </head>
      <body className="bg-background text-text">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
