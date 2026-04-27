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

- `src/assets`: Static assets like SVG icons and avatars.
- `src/components`: UI components.
- `src/content`: Project data in MDX format and associated images.
- `src/hooks`: Custom hooks and site configuration.
- `src/routes`: TanStack Router route definitions.
- `scripts/`: Build and prerender scripts.

## Build Pipeline (SSG)

The build process is defined in `package.json` as:

1. `scripts/generate-image-metadata.mjs`: Pre-calculates BlurHash and dimensions for images in `src/content`.
2. `vite build`: Client-side bundle.
3. `vite build --ssr`: Server-side bundle for prerendering.
4. `scripts/prerender.mjs`: Generate static HTML for all routes.

## Coding Conventions

- Use `oxfmt` for formatting.
- Use `oxlint` for linting.
- Prefer functional components and hooks.
- Use Tailwind CSS 4 utility classes for styling.
- All projects must have an `index.mdx` file with valid frontmatter in `src/content`.

## Image Handling

- Images are automatically optimized during build.
- Metadata (hash, width, height) is stored in `src/content/image-metadata.json`.
- Use the `Image` component for lazy loading and BlurHash placeholders.
