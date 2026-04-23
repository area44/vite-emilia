import React, { useEffect } from "react";

import Header from "./components/header";
import Layout from "./components/layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

const NotFound = () => (
  <Layout>
    <Header />
    <div className="container py-20 text-center">
      <p className="text-xl">
        Oh, no!
        <br />
        You found a page that doesn't exist.
      </p>
    </div>
  </Layout>
);

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const path = window.location.pathname;

  // Render component based on initial path
  if (path === "/" || path === "/index.html") {
    return <Home />;
  }

  if (path.startsWith("/") && path.length > 1) {
    return <ProjectDetail />;
  }

  return <NotFound />;
};

export default App;
