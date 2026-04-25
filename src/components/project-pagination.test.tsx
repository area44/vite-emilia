import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import ProjectPagination from "./project-pagination";

// Mock Card component
vi.mock("./card", () => ({
  default: ({ item }: any) => <div data-testid={`card-${item.slug}`}>{item.title}</div>,
}));

describe("ProjectPagination", () => {
  const prev = { slug: "/prev", title: "Prev Project", cover: "prev.jpg" };
  const next = { slug: "/next", title: "Next Project", cover: "next.jpg" };

  it("renders both prev and next projects", () => {
    render(<ProjectPagination prev={prev} next={next} />);
    expect(screen.getByTestId("card-/prev")).toBeInTheDocument();
    expect(screen.getByTestId("card-/next")).toBeInTheDocument();
    expect(screen.getByText("Prev Project")).toBeInTheDocument();
    expect(screen.getByText("Next Project")).toBeInTheDocument();
  });

  it("renders only next project if prev is null", () => {
    render(<ProjectPagination prev={null} next={next} />);
    expect(screen.queryByTestId("card-/prev")).not.toBeInTheDocument();
    expect(screen.getByTestId("card-/next")).toBeInTheDocument();
  });

  it("renders only prev project if next is null", () => {
    render(<ProjectPagination prev={prev} next={null} />);
    expect(screen.getByTestId("card-/prev")).toBeInTheDocument();
    expect(screen.queryByTestId("card-/next")).not.toBeInTheDocument();
  });
});
