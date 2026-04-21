import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Layout from "./components/layout";
import Header from "./components/header";

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:slug" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
