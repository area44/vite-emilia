import avatarUrl from "@/assets/avatar.svg";
import HeaderBackground from "@/components/header-background";
import { LocationIcon } from "@/components/icons";
import SocialMediaList from "@/components/social-media-list";
import { siteConfig } from "@/lib/site.config";

const Header = () => {
  const { name, location, siteDescription } = siteConfig;

  return (
    <header className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden py-16 md:min-h-[600px] md:py-24">
      <HeaderBackground />

      <div className="z-10 container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Avatar and Location Badge */}
          <div className="animate-in fade-in duration-700">
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-secondary opacity-30 blur transition duration-1000 group-hover:opacity-60" />
              <div className="relative inline-flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-background shadow-xl md:h-[140px] md:w-[140px]">
                {avatarUrl && (
                  <img src={avatarUrl} alt="Avatar" className="h-full w-full object-contain p-4" />
                )}
              </div>
            </div>

            <div className="animate-in slide-in-from-bottom-4 mt-6 inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-sm font-medium text-text-muted backdrop-blur-sm delay-200 duration-700">
              <LocationIcon className="size-4 text-primary" />
              {location}
            </div>
          </div>

          {/* Impactful Headline */}
          <div className="animate-in slide-in-from-bottom-8 mt-8 delay-300 duration-700">
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-heading sm:text-6xl md:text-7xl lg:text-8xl">
              Hi, I'm <span className="text-primary">{name}</span>.
            </h1>
          </div>

          {/* Description */}
          <div className="animate-in slide-in-from-bottom-8 mt-6 max-w-2xl delay-400 duration-700">
            <p className="text-lg leading-relaxed text-text-muted md:text-xl">{siteDescription}</p>
          </div>

          {/* Call to Actions */}
          <div className="animate-in fade-in mt-10 flex flex-wrap justify-center gap-4 delay-600 duration-700">
            <a
              href="#work"
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-secondary hover:shadow-primary/25 active:scale-95"
            >
              See my work
            </a>
            <div className="flex items-center gap-4 rounded-lg bg-background/50 px-6 py-3 text-sm font-medium backdrop-blur-sm">
              <SocialMediaList />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
