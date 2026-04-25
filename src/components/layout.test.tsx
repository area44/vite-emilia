import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import Layout from "./layout";

// Mock Footer
vi.mock("./footer", () => ({
  default: () => <footer data-testid="mock-footer" />,
}));

describe("Layout", () => {
  it("renders children and the skip to content link", () => {
    render(
      <Layout>
        <div data-testid="child">Test Content</div>
      </Layout>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Skip to content")).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("renders the footer", () => {
    render(<Layout>Content</Layout>);
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });
});
