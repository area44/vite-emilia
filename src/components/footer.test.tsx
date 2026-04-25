import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "./footer";

describe("Footer", () => {
  it("renders the footer with the current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });
});
