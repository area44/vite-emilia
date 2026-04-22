const useSiteMetadata = () => {
  return {
    siteTitle: `Vite Emilia`,
    siteTitleAlt: `Vite Emilia | AREA44`,
    siteHeadline: `Vite Emilia | AREA44`,
    siteUrl: import.meta.env.VITE_SITE_URL || `https://starter-emilia.netlify.app`,
    siteDescription:
      "Minimalistic portfolio/photography site with masonry grid, page transitions and big images.",
    siteImage: `/og-image.jpg`,
    siteLanguage: `en`,
    author: `@torn4dom4n`,
  };
};

export default useSiteMetadata;
