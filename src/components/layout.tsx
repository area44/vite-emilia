import * as React from "react";

import Footer from "./footer";

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <main className="relative flex-grow">{children}</main>
    <Footer />
  </div>
);

export default Layout;
