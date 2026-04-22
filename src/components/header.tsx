import avatarUrl from "../content/assets/avatar.svg";
import useEmiliaConfig from "../hooks/use-emilia-config";
import HeaderBackground from "./header-background";

const Header = () => {
  const { name, location, assetsPath } = useEmiliaConfig();

  return (
    <header className="relative flex justify-center overflow-hidden py-20">
      <HeaderBackground />
      <div className="z-10 text-center">
        <div className="animate-in fade-in duration-700">
          <div className="inline-block h-[100px] w-[100px] overflow-hidden rounded-full shadow-lg md:h-[140px] md:w-[140px]">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-red-200 p-3 text-xs" data-placeholder="true">
                Place an image with the name "avatar" inside the directory "{assetsPath}"
              </div>
            )}
          </div>
        </div>
        <div className="animate-in slide-in-from-bottom-8 duration-700">
          <h1 className="mt-4 text-4xl font-bold text-heading md:text-5xl">{name}</h1>
        </div>
        <div className="animate-in slide-in-from-bottom-8 delay-250 duration-700">
          <div className="mt-2 flex items-center justify-center text-text">{location}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
