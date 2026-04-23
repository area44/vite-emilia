import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Outlet />
      <ScrollRestoration />
    </React.Fragment>
  ),
});
