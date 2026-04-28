const siteUrl = import.meta.env.VITE_SITE_URL || "https://vite-emilia.onrender.com";
const basePath = process.env.BASE || "/";

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
  siteUrl,
  basePath,
  siteDescription:
    "Minimalistic portfolio/photography site with masonry grid, page transitions and big images.",
  siteImage: `${siteUrl.replace(/\/$/, "")}${basePath.replace(/\/$/, "")}/og-image.jpg`,
  siteLanguage: "en",
  author: "@torn4dom4n",
};

export type SiteConfig = typeof siteConfig;
