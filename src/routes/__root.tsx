import { createRootRoute, Outlet, HeadContent, Scripts } from "@tanstack/react-router";

import "@/index.css";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div style={{ padding: "5rem 2rem", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>404</h1>
      <p style={{ fontSize: "1.25rem", marginTop: "1rem", color: "#666" }}>
        Page Not Found (TanStack Router)
      </p>
      <div style={{ marginTop: "2rem" }}>
        <a
          href="/"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "0.5rem",
            textDecoration: "none",
          }}
        >
          Go Back Home
        </a>
      </div>
    </div>
  ),
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
              try {
                var theme = localStorage.getItem("theme");
                var supportDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches === true;
                if (!theme && supportDarkMode) theme = "dark";
                if (theme === "dark") document.documentElement.classList.add("dark");
              } catch (e) {}
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
