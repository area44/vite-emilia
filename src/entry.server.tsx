import type { AppLoadContext, EntryContext } from "react-router";

import { renderToString } from "react-dom/server";
import { ServerRouter } from "react-router";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  const html = renderToString(<ServerRouter context={routerContext} url={request.url} />);

  responseHeaders.set("Content-Type", "text/html; charset=utf-8");

  return new Response("<!DOCTYPE html>" + html, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
