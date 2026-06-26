import type { ReactNode } from "react";

import { createRootRoute, Outlet, HeadContent, Scripts, Link } from "@tanstack/react-router";

import "@/styles/globals.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    links: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: `${import.meta.env.BASE_URL}favicon.svg`,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-4xl font-semibold">404 - Not Found</h1>
        <p className="text-text-muted">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-8 text-primary hover:underline">
          Go back home
        </Link>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script>
          {`
            (function () {
              try {
                var theme = localStorage.getItem("theme");
                var supportDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches === true;
                if (!theme && supportDarkMode) theme = "dark";
                if (theme === "dark") document.documentElement.classList.add("dark");
              } catch (e) {}
            })();
          `}
        </script>
      </head>
      <body className="bg-background text-text">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
