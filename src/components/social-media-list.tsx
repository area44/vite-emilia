import React from "react";

import { siteConfig } from "../utils/site.config";

const SocialMediaList = () => {
  const { socialMedia } = siteConfig;

  return (
    <>
      {socialMedia.map((entry) => (
        <a key={entry.title} href={entry.href} className="text-primary hover:text-secondary">
          {entry.title}
        </a>
      ))}
    </>
  );
};

export default React.memo(SocialMediaList);
