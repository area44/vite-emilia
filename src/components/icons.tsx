import React from "react";

export const LeftArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18" {...props}>
    <path
      fill="currentColor"
      d="M7.832 17.642.345 9.864a1.256 1.256 0 0 1 0-1.728L7.832.358a1.146 1.146 0 0 1 1.663 0c.46.477.46 1.251 0 1.728L4.017 7.778H20v2.444H4.017l5.478 5.692c.46.477.46 1.250 0 1.728a1.146 1.146 0 0 1-1.663 0"
    />
  </svg>
);

export const RightArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18" {...props}>
    <path
      fill="currentColor"
      d="m12.168.358 7.487 7.778a1.256 1.256 0 0 1 0 1.728l-7.487 7.778a1.146 1.146 0 0 1-1.663 0 1.23 1.23 0 0 1 0-1.728l5.478-5.692H0V7.778h15.983l-5.478-5.692a1.23 1.23 0 0 1 0-1.728 1.146 1.146 0 0 1 1.663 0"
    />
  </svg>
);

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const LocationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
      className="location-primary"
    />
    <path
      fill="currentColor"
      d="M12 1a9 9 0 0 1 6.36 15.36l-5.65 5.66a1 1 0 0 1-.71.3V13a3 3 0 0 0 0-6z"
      className="location-secondary"
    />
  </svg>
);
