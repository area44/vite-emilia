import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import useEmiliaConfig from "./use-emilia-config";
import useSiteMetadata from "./use-site-metadata";

describe("useEmiliaConfig", () => {
  it("returns the correct configuration", () => {
    const { result } = renderHook(() => useEmiliaConfig());
    expect(result.current).toEqual({
      name: "Emilia",
      location: "VietNam",
      assetsPath: "assets",
      socialMedia: [],
    });
  });
});

describe("useSiteMetadata", () => {
  it("returns the correct site metadata", () => {
    const { result } = renderHook(() => useSiteMetadata());
    expect(result.current.siteTitle).toBe("Vite Emilia");
    expect(result.current.author).toBe("@torn4dom4n");
    expect(result.current.siteLanguage).toBe("en");
  });
});
