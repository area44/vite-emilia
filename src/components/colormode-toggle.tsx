import React from "react";

const ColorModeToggle = () => {
  // Simplified for now as we are focusing on Tailwind migration
  // We can re-add complex color mode logic later if needed
  return (
    <div className="flex items-center justify-center lg:justify-end">
      <div className="mr-2 text-text-muted">Toggle Mode (Simplified)</div>
      <button
        type="button"
        className="cursor-pointer p-2 opacity-65 transition-opacity hover:opacity-100"
        onClick={() => {
          document.documentElement.classList.toggle("dark");
        }}
      >
        🌓
      </button>
    </div>
  );
};

export default ColorModeToggle;
