import { StartClient } from "@tanstack/react-start";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { router } from "@/router";

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
);
