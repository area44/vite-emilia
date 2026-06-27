const rawSiteUrl = import.meta.env["VITE_SITE_URL"] || "https://vite-emilia.onrender.com";
const siteOrigin = new URL(rawSiteUrl).origin;

export const siteConfig = {
  // Emilia Config
  name: "Emilia",
  location: "VietNam",
  assetsPath: "assets",
  socialMedia: [] as { title: string; href: string }[],

  // Site Metadata
  siteTitle: "Vite Emilia",
  siteTitleAlt: "Vite Emilia | AREA44",
  siteHeadline: "Vite Emilia | AREA44",
  siteOrigin,
  siteUrl: `${siteOrigin}${import.meta.env.BASE_URL}`.replace(/\/$/, "") || "/",
  siteDescription:
    "Minimalistic portfolio/photography site with masonry grid, page transitions and big images.",
  siteImage: `${siteOrigin}${import.meta.env.BASE_URL}og-image.jpg`.replace(/([^:])\/\//g, "$1/"),
  siteLanguage: "en",
  author: "@torn4dom4n",
};

export type SiteConfig = typeof siteConfig;
