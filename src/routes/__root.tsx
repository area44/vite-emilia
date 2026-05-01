import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import "@/index.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </>
  );
}
