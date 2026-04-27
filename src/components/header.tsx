import avatarUrl from "../assets/avatar.svg";
import locationSvg from "../assets/location.svg?raw";
import { siteConfig } from "../utils/site.config";
import HeaderBackground from "./header-background";
import SocialMediaList from "./social-media-list";

const Header = () => {
  const { name, location, assetsPath } = siteConfig;

  return (
    <header className="relative flex justify-center overflow-hidden py-20">
      <HeaderBackground />
      <div className="z-10 text-center">
        <div className="animate-in fade-in duration-700">
          <div className="inline-flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-white shadow-lg md:h-[140px] md:w-[140px]">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="h-full w-full object-contain p-4" />
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
          <div className="mt-2 flex items-center justify-center gap-2 text-text">
            <div
              className="h-5 w-5 text-icon-primary"
              dangerouslySetInnerHTML={{ __html: locationSvg }}
            />
            {location}
          </div>
        </div>
        <div
          data-testid="social-header"
          className="animate-in fade-in mt-8 mb-12 flex justify-center gap-4 delay-600 duration-700"
        >
          <SocialMediaList />
        </div>
      </div>
    </header>
  );
};

export default Header;
