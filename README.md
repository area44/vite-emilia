# Vite Emilia

Vite Emilia is a minimalistic portfolio/photography site that features a masonry grid and large images.

## Installation

To install and run the starter, follow these steps:

```bash
pnpm install
pnpm dev
```

The site will now be running at `http://localhost:5173`!

## SSG Build

This project uses @tanstack/router and supports Static Site Generation (SSG).

```bash
pnpm run build
```

The static files will be generated in the `dist` directory.

## Quick Start

### Adding a New Project

New projects are displayed on the index page and can be added by creating MDX files inside the `src/content/projects` folder.

1. Create a new folder inside `src/content/projects`.
2. Create a new `index.mdx` file and add the frontmatter.
3. Add images to the folder created in step 1.
4. Reference your desired images as your `cover` in the frontmatter.
5. Write your content below the frontmatter (optional).

Example frontmatter:

```md
---
cover: "./sean-foley-0JD7kvxAq0Y-unsplash.jpg"
date: "2019-09-10"
title: "Emilia"
areas:
  - Neon
  - Lights
---
```

### Configuration

- **Styling**: Uses Tailwind CSS. Edit `src/index.css` to change theme variables.
- **Routing**: Uses @tanstack/react-router with file-based routing in `src/routes`.
- **Data**: Projects are automatically loaded from `src/content/projects`.
- **Images**: Place images in project folders and reference them in MDX frontmatter or content.

## Credits

This project is based on [Gatsby Starter Portfolio: Emilia](https://github.com/LekoArts/gatsby-starter-portfolio-emilia) by Lennart.
