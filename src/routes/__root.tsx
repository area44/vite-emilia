import * as React from 'react'
import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Outlet />
      <ScrollRestoration />
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </React.Fragment>
  ),
})
