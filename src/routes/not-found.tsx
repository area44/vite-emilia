import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

import Header from "../components/header";
import Layout from "../components/layout";

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

export const Route = createFileRoute("/not-found")({
  component: NotFound,
});
