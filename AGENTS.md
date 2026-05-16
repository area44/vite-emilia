# Project Context for AI Agents

This repository is a modern React portfolio site built with TanStack Start, optimized for pure Static Site Generation (SSG).

## Tech Stack

- React 19
- Vite 8+
- TanStack Start (Full-stack framework)
- TanStack Router (File-based routing)
- Tailwind CSS 4
- MDX for content
- Sharp for image processing

## Directory Structure

- `src/assets`: Static assets like SVG icons, patterns, and avatars.
- `src/components`: UI components.
- `src/content`: Project data in MDX format and associated images.
- `src/routes`: TanStack Router/Start route definitions.
- `src/lib`: Shared utilities and site configuration.
- `scripts/`: Build and utility scripts.

## Configuration

Site configuration and metadata are centralized in `src/lib/site.config.ts`. This includes profile details, SEO settings, and social links.

## Build Pipeline

The build process is defined in `package.json` and executed sequentially:

1. `generate:metadata`: Pre-calculates BlurHash and dimensions for images in `src/content`.
2. `vite build`: Generates the static production build with prerendering enabled (`NITRO_PRESET=static`).
3. Output Flattening: The build script flattens `dist/client` into `dist/` and creates a `404.html` fallback for better static host compatibility.
4. `optimize:images`: Optimizes images in the production output directory (`dist/assets`).

The static output is generated in `dist/`.

## Coding Conventions

- No emojis are allowed in any part of the project (source code, commits, documentation).
- Use a package manager like `pnpm`, `npm`, or `bun` for all script execution (install, lint, build, format). `pnpm` is preferred for this repository.
- Use `oxfmt` for formatting and `oxlint` for linting.
- Prefer functional components and hooks.
- Use Tailwind CSS 4 utility classes for styling.
- All projects must have an `index.mdx` file with valid frontmatter in `src/content`.
- Path aliases are used; the @/ prefix points to the src directory.

## Accessibility

- Maintain the "Skip to Content" link in `src/components/layout.tsx`.
- Ensure all interactive elements have visible `focus-visible` rings (defined in `src/index.css`).
- Use descriptive `aria-label` attributes for icon-only buttons.

## Asset Handling

- Images are optimized during build. Metadata is stored in `src/content/image-metadata.json`.
- Use the `Image` component for lazy loading and BlurHash placeholders.
- SVG icons and components are centralized in `src/components/icons.tsx`.
