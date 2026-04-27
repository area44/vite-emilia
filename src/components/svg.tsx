import type { SVGProps as ReactSVGProps } from "react";

import iconsUrl from "../assets/icons.svg?url";

type IconType = "bgPattern" | "location" | "leftArrow";

interface SVGProps extends ReactSVGProps<SVGSVGElement> {
  id: IconType;
}

const Svg = ({ id, ...props }: SVGProps) => (
  <svg {...props}>
    <use href={`${iconsUrl}#${id}`} />
  </svg>
);

export default Svg;
