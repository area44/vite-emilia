import React from "react";

import useSiteMetadata from "../hooks/use-site-metadata";

// This component is now mostly a side-effect manager for things Meta can't easily do
// like lang attribute or other head elements that need effect-based updates.
// React Router's Meta export handles the main SEO tags.
const Seo = () => {
  const site = useSiteMetadata();

  React.useEffect(() => {
    document.documentElement.lang = site.siteLanguage;
  }, [site.siteLanguage]);

  return null;
};

export default Seo;
