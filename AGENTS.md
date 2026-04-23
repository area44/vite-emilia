# Agent Instructions

## Tech Stack

- **Framework**: React 19 (Vite)
- **Router**: @tanstack/react-router
- **Styling**: Tailwind CSS v4
- **Content**: MDX (located in `src/content/projects`)
- **Build**: SSG via `scripts/ssg.mjs`

## Routing

This project uses file-based routing with TanStack Router. All routes are located in `src/routes`.

- `__root.tsx`: Root layout.
- `index.tsx`: Homepage.
- `$slug.tsx`: Project detail pages.
- `not-found.tsx`: 404 page.

## Static Site Generation (SSG)

The build process generates static HTML for all projects.

- `pnpm run build` triggers `scripts/ssg.mjs`.
- It uses `src/entry-server.tsx` to render the app to strings.
- It uses `src/entry-client.tsx` for client-side hydration.

## Linting & Formatting

- **Linter**: `oxlint` (`pnpm run lint`)
- **Formatter**: `oxfmt` (`pnpm run format`)

## Image Metadata

- Metadata (BlurHash, dimensions) is generated via `scripts/generate-image-metadata.mjs` and stored in `src/content/image-metadata.json`.
- Run `pnpm run generate:metadata` if project images change.
