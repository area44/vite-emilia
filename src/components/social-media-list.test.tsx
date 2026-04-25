import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import * as useEmiliaConfigModule from "../hooks/use-emilia-config";
import SocialMediaList from "./social-media-list";

vi.mock("../hooks/use-emilia-config");

describe("SocialMediaList", () => {
  it("renders social media links from config", () => {
    const mockSocialMedia = [
      { title: "Twitter", href: "https://twitter.com" },
      { title: "GitHub", href: "https://github.com" },
    ];

    vi.mocked(useEmiliaConfigModule.default).mockReturnValue({
      name: "Emilia",
      location: "VietNam",
      assetsPath: "assets",
      socialMedia: mockSocialMedia,
    });

    render(<SocialMediaList />);

    const twitterLink = screen.getByText("Twitter");
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute("href", "https://twitter.com");

    const githubLink = screen.getByText("GitHub");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com");
  });

  it("renders nothing when socialMedia is empty", () => {
    vi.mocked(useEmiliaConfigModule.default).mockReturnValue({
      name: "Emilia",
      location: "VietNam",
      assetsPath: "assets",
      socialMedia: [],
    });

    const { container } = render(<SocialMediaList />);
    expect(container.firstChild).toBeNull();
  });
});
