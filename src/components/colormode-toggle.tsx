
import * as React from "react"

const ColorModeToggle = () => {
  // Simplified for now as we are focusing on Tailwind migration
  // We can re-add complex color mode logic later if needed
  return (
    <div className="flex items-center justify-center lg:justify-end">
      <div className="mr-2 text-text-muted">Toggle Mode (Simplified)</div>
      <button
        type="button"
        className="opacity-65 hover:opacity-100 transition-opacity cursor-pointer p-2"
        onClick={() => {
            document.documentElement.classList.toggle('dark')
        }}
      >
        🌓
      </button>
    </div>
  )
}

export default ColorModeToggle
