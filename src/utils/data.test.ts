import { describe, expect, it } from "vitest";

import { getProjects } from "./data";

describe("data utils", () => {
  it("getProjects should return an array of projects", async () => {
    const projects = await getProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty("slug");
    expect(projects[0]).toHaveProperty("title");
  });
});
