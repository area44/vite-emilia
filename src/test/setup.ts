import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn<(query: string) => any>().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn<() => void>(), // deprecated
    removeListener: vi.fn<() => void>(), // deprecated
    addEventListener: vi.fn<() => void>(),
    removeEventListener: vi.fn<() => void>(),
    dispatchEvent: vi.fn<() => boolean>(),
  })),
});

// Mock HTMLCanvasElement.prototype.getContext
HTMLCanvasElement.prototype.getContext = vi.fn<() => any>().mockReturnValue({
  createImageData: vi.fn<() => any>().mockReturnValue({
    data: new Uint8ClampedArray(32 * 32 * 4),
  }),
  putImageData: vi.fn<() => void>(),
}) as any;
