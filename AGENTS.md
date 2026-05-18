# AI Agents Guide

This repository is a modern React portfolio site built with TanStack Start and Vite+, optimized for Static Site Generation (SSG).

## Tech Stack

- React 19
- Vite+ (Unified toolchain)
- TanStack Start (Full-stack framework)
- Tailwind CSS 4
- MDX for content
- Sharp for image processing

## Commands

Vite+ replaces standalone tools for common tasks:

- `vp install`: Install dependencies.
- `vp dev`: Start the development server.
- `vp build`: Build the production site.
- `vp check`: Run linting, formatting, and type checks.
- `vp run <script>`: Run custom scripts from `package.json`.

## Directory Structure

- `src/assets`: Static assets like SVG icons, patterns, and avatars.
- `src/components`: UI components.
- `src/content`: Project data in MDX format and associated images.
- `src/routes`: TanStack Router/Start route definitions.
- `src/lib`: Shared utilities and site configuration.
- `scripts`: Build and utility scripts.

## Configuration

Site configuration and metadata are centralized in `src/lib/site.config.ts`. This includes profile details, SEO settings, and social links.
Tool configurations for Vite, Oxlint, and Oxfmt are unified in `vite.config.ts`.

## Build Pipeline

The build process is managed by Vite+ and custom scripts in `package.json`:

1. `generate:metadata`: Pre-calculates BlurHash and dimensions for images in `src/content`.
2. `vp build`: Generates the static production build with prerendering enabled.
3. `optimize:images`: Optimizes images in the production output directory (`dist/client/assets`).

The static output is generated in `dist/client`.

## Coding Conventions

- Images are optimized during build. Metadata is stored in `src/content/image-metadata.json`.
- Use the `Image` component for lazy loading and BlurHash placeholders.
- SVG icons and components are centralized in `src/components/icons.tsx`.

## Animated Backgrounds

- Use custom @keyframes and CSS variables in src/index.css under the @theme block for global animations.
- Implement dual-layered patterns with varying opacities and animation timings to create visual depth and a "dynamic texture" effect.
- Utilize transform scaling and subtle blurs on background layers to enhance the focus on foreground content.
