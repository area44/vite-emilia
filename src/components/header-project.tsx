import { Link } from "react-router-dom";
import HeaderBackground from "./header-background";
import useEmiliaConfig from "../hooks/use-emilia-config";
import Svg from "./svg";
import avatarUrl from "../content/assets/avatar.svg";

type HeaderProjectProps = {
  title: string;
  areas: string[];
  description?: React.ReactNode;
  date: string;
};

const HeaderProject = ({ title, areas, description = ``, date }: HeaderProjectProps) => {
  const { name } = useEmiliaConfig();

  return (
    <header className="relative overflow-hidden flex justify-center">
      <HeaderBackground />
      <div className="container text-center my-8 z-10">
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
            <div className="overflow-hidden rounded-full w-10 h-10 inline-block shadow-md mx-2">
              {avatarUrl && <img src={avatarUrl} alt="Avatar" className="w-10 h-10 object-cover" />}
            </div>
            <span className="font-medium">{name}</span>
          </Link>
        </div>
        <div className="mt-8 mb-24 md:mb-32">
          <div className="animate-in slide-in-from-top-8 duration-700">
            <h1 className="text-4xl md:text-5xl font-bold mt-4 text-heading">{title}</h1>
          </div>
          <div className="animate-in fade-in duration-700 delay-500">
            <p className="mb-0 mt-8 text-lg">{date}</p>
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
