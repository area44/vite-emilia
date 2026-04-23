import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
