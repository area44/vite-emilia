import React from "react";

import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
      >
        Skip to content
      </a>
      <main id="main-content" tabIndex={-1} className="relative flex-grow outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
