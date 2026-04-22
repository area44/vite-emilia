import { Link } from "react-router-dom";

import avatarUrl from "../content/assets/avatar.svg";
import useEmiliaConfig from "../hooks/use-emilia-config";
import HeaderBackground from "./header-background";
import Svg from "./svg";

type HeaderProjectProps = {
  title: string;
  areas: string[];
  description?: React.ReactNode;
  date: string;
};

const HeaderProject = ({ title, areas, description = ``, date }: HeaderProjectProps) => {
  const { name } = useEmiliaConfig();

  return (
    <header className="relative flex justify-center overflow-hidden">
      <HeaderBackground />
      <div className="z-10 container my-8 text-center">
        <div className="animate-in slide-in-from-left-8 duration-700">
          <Link
            to="/"
            aria-label={`${name} - Back to homepage`}
            className="group inline-flex items-center text-text no-underline"
          >
            <Svg
              id="leftArrow"
              width="20"
              height="18"
              className="transition-transform duration-250 group-hover:-translate-x-1.5 group-focus:-translate-x-1.5"
            />
            <div className="mx-2 inline-block h-10 w-10 overflow-hidden rounded-full shadow-md">
              {avatarUrl && <img src={avatarUrl} alt="Avatar" className="h-10 w-10 object-cover" />}
            </div>
            <span className="font-medium">{name}</span>
          </Link>
        </div>
        <div className="mt-8 mb-24 md:mb-32">
          <div className="animate-in slide-in-from-top-8 duration-700">
            <h1 className="mt-4 text-4xl font-bold text-heading md:text-5xl">{title}</h1>
          </div>
          <div className="animate-in fade-in delay-500 duration-700">
            <p className="mt-8 mb-0 text-lg">{date}</p>
            <div className="text-text-muted">
              {areas.map((area, index) => (
                <span key={area}>
                  {index > 0 && `, `}
                  {area}
                </span>
              ))}
            </div>
            {description && (
              <div className="max-width-[900px] mx-auto mt-12 text-left break-words">
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderProject;
