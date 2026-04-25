import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import Card from "./card";

// Mock TanStack Router's Link component
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, "aria-label": ariaLabel, ...props }: any) => (
    <a href={to} aria-label={ariaLabel} {...props}>
      {children}
    </a>
  ),
}));

// Mock Image component
vi.mock("./image", () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} data-testid="card-image" />,
}));

describe("Card", () => {
  const mockItem = {
    slug: "/test-project",
    cover: "test-cover.jpg",
    title: "Test Project Title",
  };

  it("renders the project title and cover image", () => {
    render(<Card item={mockItem} />);

    expect(screen.getByText("Test Project Title")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Visit Test Project Title project page/i });
    expect(link).toHaveAttribute("href", "/test-project");

    const img = screen.getByTestId("card-image");
    expect(img).toHaveAttribute("src", "test-cover.jpg");
  });

  it("applies the overlay color correctly", () => {
    render(<Card item={mockItem} overlay="#ff0000" />);
    // Use the data-name attribute since I can't easily add data-testid to the original component without modifying it.
    // Wait, the error log showed data-name="card-overlay".
    const overlay = screen.getByText("Test Project Title").parentElement;
    expect(overlay).toHaveAttribute("data-name", "card-overlay");
    // JSDOM might convert hex to rgb
    expect(overlay).toHaveStyle({ "background-color": "rgba(255, 0, 0, 0.9)" });
  });
});
