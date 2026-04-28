# Project Context for AI Agents

This repository is a modern React portfolio site optimized for Static Site Generation (SSG).

## Tech Stack

- React 19
- Vite 8+
- TanStack Router (File-based routing)
- Tailwind CSS 4
- MDX for content
- Sharp for image processing

## Directory Structure

- `src/assets`: Static assets like SVG icons, patterns, and avatars.
- `src/components`: UI components.
- `src/content`: Project data in MDX format and associated images.
- `src/routes`: TanStack Router route definitions.
- `src/lib`: Shared utilities and site configuration.
- `scripts/`: Build and prerender scripts.

## Configuration

Site configuration and metadata are centralized in `src/lib/site.config.ts`. This includes profile details, SEO settings, and social links.

## Build Pipeline (SSG)

The build process is defined in `package.json` and executed sequentially:

1. `generate:metadata` (node --run generate:metadata): Pre-calculates BlurHash and dimensions for images in `src/content`.
2. `vite build`: Generates the client-side bundle.
3. `ssr:build`: Generates the server-side bundle for prerendering.
4. `prerender` (node --run prerender): Generates static HTML for all routes using `scripts/prerender.mjs`.

## Coding Conventions

- Use a package manager like `pnpm`, `npm`, or `bun` for all script execution (install, lint, build, format). `pnpm` is preferred for this repository.
- Use `oxfmt` for formatting and `oxlint` for linting.
- Prefer functional components and hooks.
- Use Tailwind CSS 4 utility classes for styling.
- All projects must have an `index.mdx` file with valid frontmatter in `src/content`.
- Native Vite path resolution is used; avoid adding path aliases unless necessary.

## Accessibility

- Maintain the "Skip to Content" link in `src/components/layout.tsx`.
- Ensure all interactive elements have visible `focus-visible` rings (defined in `src/index.css`).
- Use descriptive `aria-label` attributes for icon-only buttons.

## Asset Handling

- Images are optimized during build. Metadata is stored in `src/content/image-metadata.json`.
- Use the `Image` component for lazy loading and BlurHash placeholders.
- SVG icons and patterns in `src/assets` are imported with the `?raw` suffix and inlined to allow CSS styling via `currentColor`.
