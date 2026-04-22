import React from "react";

import useSiteMetadata from "../hooks/use-site-metadata";

type SEOProps = {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  children?: React.ReactNode;
};

const Seo = ({
  title = "",
  description = "",
  pathname = "",
  image = "",
  children = null,
}: SEOProps) => {
  const site = useSiteMetadata();

  const {
    siteTitle,
    siteTitleAlt: defaultTitle,
    siteUrl,
    siteDescription: defaultDescription,
    siteImage: defaultImage,
    siteLanguage,
  } = site;

  const seo = {
    title: title ? `${title} | ${siteTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ""}`,
    image: `${siteUrl}${image || defaultImage}`,
  };

  React.useEffect(() => {
    document.title = seo.title;
    document.documentElement.lang = siteLanguage;

    const updateMetaTag = (name: string, content: string, attr = "name") => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMetaTag("description", seo.description);
    updateMetaTag("og:title", seo.title, "property");
    updateMetaTag("og:description", seo.description, "property");
    updateMetaTag("og:image", seo.image, "property");
    updateMetaTag("og:url", seo.url, "property");
    updateMetaTag("og:type", "website", "property");
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", seo.title);
    updateMetaTag("twitter:description", seo.description);
    updateMetaTag("twitter:image", seo.image);

    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", seo.url);
  }, [seo.title, seo.description, seo.image, seo.url, siteLanguage]);

  return <>{children}</>;
};

export default Seo;
