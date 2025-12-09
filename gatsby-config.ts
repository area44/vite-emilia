import type { GatsbyConfig, PluginRef } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    siteTitle: `Gatsby Starter Emilia`,
    siteTitleAlt: `Gatsby Starter Emilia | AREA44`,
    siteHeadline: `Gatsby Starter Emilia | AREA44`,
    siteUrl: `https://starter-emilia.netlify.app`,
    siteDescription:
      'Minimalistic portfolio/photography site with masonry grid, page transitions and big images.',
    siteImage: `/og-image.jpg`,
    siteLanguage: `en`,
    author: `@torn4dom4n`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-emilia`,
      options: {
        name: `Gatsby Starter Emilia`,
        socialMedia: [{}],
        showThemeAuthor: false,
        location: `Vietnam`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Emilia | AREA44`,
        short_name: `Emilia`,
        description: `Minimalistic portfolio/photography site with masonry grid, page transitions and big images.`,
        start_url: `/`,
        background_color: `#fff`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
}

export default config
