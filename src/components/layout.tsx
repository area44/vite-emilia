import React from "react";

import Footer from "./footer";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      <main className="relative flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
