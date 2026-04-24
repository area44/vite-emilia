import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { createRouter } from "./router";

const router = createRouter();

const root = document.getElementById("root");
if (root) {
  hydrateRoot(
    root,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
