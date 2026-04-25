import { Link } from "@tanstack/react-router";

import avatarUrl from "../assets/avatar.svg";
import useEmiliaConfig from "../hooks/use-emilia-config";
import HeaderBackground from "./header-background";

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
        <div className="animate-in fade-in duration-700">
          <div className="flex justify-center">
            <Link
              to="/"
              aria-label={`${name} - Back to homepage`}
              className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white shadow-md transition-transform hover:scale-110"
            >
              {avatarUrl && (
                <img src={avatarUrl} alt="Avatar" className="h-full w-full object-contain p-1.5" />
              )}
            </Link>
          </div>
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
              <div className="mx-auto mt-12 max-w-[900px] text-left break-words">{description}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderProject;
