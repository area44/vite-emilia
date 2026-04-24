import type { SVGProps as ReactSVGProps } from "react";

type IconType = "bgPattern" | "location";

interface SVGProps extends ReactSVGProps<SVGSVGElement> {
  id: IconType;
}

const Svg = ({ id, ...props }: SVGProps) => (
  <svg {...props}>
    <use href={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/icons.svg#${id}`} />
  </svg>
);

export default Svg;
