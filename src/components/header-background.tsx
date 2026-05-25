import React from "react";

const GeometricLines = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-background-pattern"
    viewBox="0 0 1600 560"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <g className="opacity-40">
      {/* Diagonal dashed lines */}
      <path
        d="M300 -200L1400 600"
        stroke="currentColor"
        strokeDasharray="4 4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M-100 500L1200 -200"
        stroke="currentColor"
        strokeDasharray="4 4"
        vectorEffect="non-scaling-stroke"
      />
    </g>

    <g className="opacity-60">
      {/* Structural lines */}
      <path d="M1200 0V560" stroke="currentColor" vectorEffect="non-scaling-stroke" />
      <path d="M1600 280H1000" stroke="currentColor" vectorEffect="non-scaling-stroke" />
      <path d="M1000 560V0" stroke="currentColor" vectorEffect="non-scaling-stroke" />
    </g>

    <g className="opacity-30">
      {/* Decorative rectangles */}
      <rect x="1000" y="200" width="150" height="150" stroke="currentColor" vectorEffect="non-scaling-stroke" />
      <rect x="1150" y="250" width="50" height="50" stroke="currentColor" vectorEffect="non-scaling-stroke" />
    </g>

    {/* The signature curve from hero-01 */}
    <path
      className="text-primary/20"
      d="M1149.8 240.3C1149.8 210.8 1169.4 187.3 1194.8 187.3C1220.3 187.3 1239.8 210.8 1239.8 240.3C1239.8 290.2 1199.8 330.3 1149.8 330.3C1079.4 330.3 1019.9 270.7 1019.9 200.3C1019.9 100.0 1099.5 20.4 1194.8 20.5C1364.6 20.5 1502.7 158.6 1502.7 330.3C1502.7 586.3 1251.0 794.0 1019.9 794.0C619.1 794.0 285.2 460.2 285.2 59.5C285.2 -640.6 865.0 -1140.5 1600.2 -1140.5"
      stroke="currentColor"
      strokeWidth="2"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

const HeaderBackground = () => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />

      {/* Layer 1 - Primary Lines */}
      <div className="mask-fade-out absolute inset-0 h-full w-full animate-drift opacity-80">
        <GeometricLines />
      </div>

      {/* Layer 2 - Secondary Offset Lines */}
      <div
        className="mask-fade-out absolute inset-0 h-full w-full scale-110 animate-drift-slow opacity-30 blur-[0.5px]"
        style={{ transformOrigin: "center center" }}
      >
        <GeometricLines />
      </div>

      {/* Gradients to fade edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
    </div>
  );
};

export default React.memo(HeaderBackground);
