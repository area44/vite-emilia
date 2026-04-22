import React from "react";

import ColorModeToggle from "./colormode-toggle";

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-b from-transparent to-black/5 pt-24 pb-16 dark:to-black/30">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <ColorModeToggle />
          <div>
            <div className="text-text-muted">
              Copyright &copy; {new Date().getFullYear()}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
