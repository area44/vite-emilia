import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import Svg from "./svg";

// Mock the iconsUrl import
vi.mock("../assets/icons.svg?url", () => ({
  default: "icons.svg",
}));

describe("Svg", () => {
  it("renders an svg with a use element pointing to the correct id", () => {
    const { container } = render(<Svg id="location" width="24" height="24" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "24");

    const use = container.querySelector("use");
    expect(use).toHaveAttribute("href", "icons.svg#location");
  });
});
