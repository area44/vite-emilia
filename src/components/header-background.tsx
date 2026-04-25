import React from "react";

import Svg from "./svg";

const HeaderBackground = () => {
  return (
    <>
      <div className="absolute inset-0 h-full w-full text-background-pattern">
        <Svg id="bgPattern" height="100%" width="100%" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15 dark:to-black/35" />
    </>
  );
};

export default React.memo(HeaderBackground);
