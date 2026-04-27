import React from "react";

import { siteConfig } from "../site.config";

// This component is now mostly a side-effect manager for things Meta can't easily do
// like lang attribute or other head elements that need effect-based updates.
// React Router's Meta export handles the main SEO tags.
const Seo = () => {
  React.useEffect(() => {
    document.documentElement.lang = siteConfig.siteLanguage;
  }, []);

  return null;
};

export default Seo;
