import { Link } from "react-router-dom";

type CardProps = {
  item: {
    slug: string;
    cover: string;
    title: string;
    contentFilePath?: string;
  };
  overlay?: string;
  shadow?: string[];
  eager?: boolean;
};

const Card = ({ item, overlay = `#000`, eager }: CardProps) => {
  return (
    <Link
      aria-label={`Visit ${item.title} project page`}
      className="group relative block outline-none transition-shadow hover:z-20 focus:ring-8 focus:ring-primary/50 shadow-xl"
      to={item.slug}
    >
      <div
        className="z-20 flex justify-center items-center opacity-0 transition-all duration-300 ease-in-out text-white absolute inset-0 group-hover:opacity-100 group-focus:opacity-100 p-4"
        style={{ backgroundColor: `${overlay}E6` }} // 0.9 opacity in hex is E6
        data-name="card-overlay"
      >
        <h2 className="m-0 text-white text-center text-2xl font-bold drop-shadow-lg">
          {item.title}
        </h2>
      </div>
      <img loading={eager ? `eager` : `lazy`} src={item.cover} alt="" className="w-full block" />
    </Link>
  );
};

export default Card;
