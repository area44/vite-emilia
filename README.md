# Vite Emilia

Vite Emilia is a minimalistic portfolio/photography site that features a masonry grid and large images. It is a migration of the original Vite Emilia to Vite 8 and Tailwind CSS 4.

## Installation

To install and run the starter, follow these steps:

```bash
pnpm install
pnpm dev
```

The site will now be running at `http://localhost:5173`!

## Quick Start

### Adding a New Project

New projects are displayed on the index page and can be added by creating MDX files inside the `content/projects` folder.

1. Create a new folder inside `content/projects`.
2. Create a new `index.mdx` file and add the frontmatter.
3. Add images to the folder created in step 1.
4. Reference your desired images as your `cover` in the frontmatter.
5. Write your content below the frontmatter (optional).

Example frontmatter:

```md
---
cover: './sean-foley-0JD7kvxAq0Y-unsplash.jpg'
date: '2019-09-10'
title: 'Emilia'
areas:
  - Neon
  - Lights
---
```

### Configuration

- **Styling**: Uses Tailwind CSS 4. Edit `src/index.css` to change theme variables.
- **Data**: Projects are automatically loaded from `content/projects`.
- **Images**: Place images in project folders and reference them in MDX frontmatter or content.

## Credits

This project is a Vite-based migration of [Gatsby Starter Portfolio: Emilia](https://github.com/LekoArts/gatsby-starter-portfolio-emilia) by Lennart.
