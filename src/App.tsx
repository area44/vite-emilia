import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Layout from "./components/layout";
import ScrollToTop from "./components/scroll-to-top";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

const NotFound = () => (
  <Layout>
    <Header />
    <div className="container">
      <p>
        Oh, no!
        <br />
        You found a page that doesn't exist.
      </p>
    </div>
  </Layout>
);

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
