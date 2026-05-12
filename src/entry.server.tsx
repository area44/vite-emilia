import { createStartHandler, defaultRenderHandler } from "@tanstack/react-start/server";
import { getRouter } from "@tanstack/react-start/server";

export default createStartHandler({
  createRouter: () => getRouter(),
  renderHandler: defaultRenderHandler,
});
