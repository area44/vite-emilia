import { Link } from "@tanstack/react-router";
import React from "react";

import Image from "./image";

type CardProps = {
  item: {
    slug: string;
    cover: string;
    title: string;
    contentFilePath?: string;
    coverHash?: string;
    coverWidth?: number;
    coverHeight?: number;
  };
  overlay?: string;
  shadow?: string[];
  eager?: boolean;
  aspectRatio?: string;
};

const Card = React.memo(({ item, overlay = "#000000", eager, aspectRatio }: CardProps) => {
  return (
    <Link
      aria-label={`Visit ${item.title} project page`}
      className="group relative block shadow-fan transition-all duration-300 ease-in-out outline-none hover:z-20 focus:ring-[10px] focus:ring-black/50"
      to={item.slug}
      onClick={(e) => e.currentTarget.blur()}
    >
      <div
        className="absolute inset-0 z-20 flex items-center justify-center p-4 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-focus:opacity-100"
        style={{ backgroundColor: `${overlay}E6` }}
        data-name="card-overlay"
      >
        <h2 className="m-0 text-center text-2xl font-bold text-white shadow-text-soft md:text-3xl">
          {item.title}
        </h2>
      </div>
      <Image
        loading={eager ? "eager" : "lazy"}
        src={item.cover}
        alt=""
        hash={item.coverHash}
        width={item.coverWidth}
        height={item.coverHeight}
        aspectRatio={aspectRatio}
        className="block w-full"
      />
    </Link>
  );
});

Card.displayName = "Card";

export default Card;
