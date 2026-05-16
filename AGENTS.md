# AI Agents Guide

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
- `scripts`: Build and utility scripts.

## Configuration

Site configuration and metadata are centralized in `src/lib/site.config.ts`. This includes profile details, SEO settings, and social links.

## Build Pipeline

The build process is defined in `package.json` and executed sequentially:

1. `generate:metadata`: Pre-calculates BlurHash and dimensions for images in `src/content`.
2. `vite build`: Generates the static production build with prerendering enabled.
3. `optimize:images`: Optimizes images in the production output directory (`dist/client/assets`).

The static output is generated in `dist/client`.

## Coding Conventions

- Images are optimized during build. Metadata is stored in `src/content/image-metadata.json`.
- Use the `Image` component for lazy loading and BlurHash placeholders.
- SVG icons and components are centralized in `src/components/icons.tsx`.
