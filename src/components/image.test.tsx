import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import React from "react";
import Image from "./image";

// Mock blurhash decode
vi.mock("blurhash", () => ({
  decode: vi.fn<() => Uint8ClampedArray>(() => new Uint8ClampedArray(32 * 32 * 4)),
}));

describe("Image", () => {
  it("renders the img tag with correct attributes", () => {
    render(<Image src="test.jpg" alt="test alt" />);
    const img = screen.getByRole("img", { hidden: true });
    expect(img).toHaveAttribute("src", "test.jpg");
    expect(img).toHaveAttribute("alt", "test alt");
  });

  it("shows the image and hides placeholder when loaded", () => {
    render(<Image src="test.jpg" alt="test alt" hash="L6PZf_jE.AyE_3t7t7RjZRQ-IyRj" />);
    const img = screen.getByRole("img", { hidden: true });

    // Simulate image load
    fireEvent.load(img);

    expect(img).toHaveStyle("opacity: 1");
  });
});
