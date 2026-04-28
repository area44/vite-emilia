# Vite Emilia

Vite Emilia is a minimalistic portfolio/photography site featuring a masonry grid, page transitions, and large images. It is built with React 19, Vite, TanStack Router, and Tailwind CSS v4, optimized for Static Site Generation (SSG).

[Preview](https://area44.github.io/vite-emilia/)

## Features

- **SSG Ready**: Pre-renders all routes into static HTML for maximum performance and SEO.
- **Modern Stack**: React 19, Vite 8+, TanStack Router, Tailwind CSS 4.
- **Image Optimization**: Automatic BlurHash generation and responsive image handling.
- **Minimal Design**: Clean typography and masonry layout focusing on photography.
- **MDX Support**: Author projects using MDX with frontmatter.

## Installation

To install and run the starter locally, you can use:

```bash
pnpm install
pnpm dev
```

The site will be running at `http://localhost:5173`.

## Deployment

To build the static site:

```bash
pnpm build
```

The generated static files will be in the `dist/` directory.

## Quick Start

### Adding a New Project

Projects are automatically loaded from `src/content`.

1. Create a new folder inside `src/content`.
2. Create an `index.mdx` file and add the frontmatter.
3. Add images to the folder created in step 1.
4. Reference your desired image as your `cover` in the frontmatter.

Example `index.mdx`:

```md
---
cover: "./cover-image.jpg"
date: "2024-03-20"
title: "My New Project"
areas:
  - Photography
  - Design
---

Your optional content here...
```

### Configuration

- **Site Metadata**: Edit `src/lib/site.config.ts` to update the site title, description, and social handles.
- **Styling**: Uses Tailwind CSS v4. Edit `src/index.css` to change theme colors and variables.

## Credits

This project is based on [Gatsby Starter Portfolio: Emilia](https://github.com/LekoArts/gatsby-starter-portfolio-emilia) by LekoArts.
