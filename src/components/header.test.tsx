import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import Header from "./header";

// Mock assets
vi.mock("../assets/avatar.svg", () => ({
  default: "avatar.svg",
}));

// Mock HeaderBackground
vi.mock("./header-background", () => ({
  default: () => <div data-testid="header-bg" />,
}));

// Mock Svg
vi.mock("./svg", () => ({
  default: ({ id }: { id: string }) => <div data-testid={`svg-${id}`} />,
}));

describe("Header", () => {
  it("renders name and location from config", () => {
    render(<Header />);
    expect(screen.getByText("Emilia")).toBeInTheDocument();
    expect(screen.getByText("VietNam")).toBeInTheDocument();
    expect(screen.getByAltText("Avatar")).toBeInTheDocument();
  });

  it("renders the background and location icon", () => {
    render(<Header />);
    expect(screen.getByTestId("header-bg")).toBeInTheDocument();
    expect(screen.getByTestId("svg-location")).toBeInTheDocument();
  });
});
