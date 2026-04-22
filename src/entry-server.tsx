import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export async function render(url: string) {
  const history = createMemoryHistory({
    initialEntries: [url],
  })

  const router = createRouter({
    routeTree,
    history,
  })

  await router.load()

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )

  return html
}
