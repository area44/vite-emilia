import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { renderToReadableStream } from "react-dom/server";

import { createRouter } from "@/router";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
) {
  const url = new URL(request.url);
  const router = createRouter();

  router.update({
    history: createMemoryHistory({
      initialEntries: [url.pathname],
    }),
  });

  await router.load();

  const stream = await renderToReadableStream(<RouterProvider router={router} />, {
    onError(error: unknown) {
      console.error(error);
      responseStatusCode = 500;
    },
  });

  await stream.allReady;

  responseHeaders.set("Content-Type", "text/html; charset=utf-8");

  return new Response(stream, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
