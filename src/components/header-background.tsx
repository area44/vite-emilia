import React from "react";

import bgPatternSvg from "@/assets/bg-pattern.svg?raw";

const HeaderBackground = () => {
  return (
    <>
      <div
        className="absolute inset-0 h-full w-full overflow-hidden text-background-pattern"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 h-full w-full"
          dangerouslySetInnerHTML={{ __html: bgPatternSvg }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15 dark:to-black/35" />
    </>
  );
};

export default React.memo(HeaderBackground);
