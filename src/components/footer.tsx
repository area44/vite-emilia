
import useEmiliaConfig from "../hooks/use-emilia-config"
import SocialMediaList from "./social-media-list"
import ColorModeToggle from "./colormode-toggle"
import AboutMeMDX from "../texts/about-me.mdx"

const Footer = () => {
  const { showThemeAuthor } = useEmiliaConfig()

  return (
    <footer className="pt-24 pb-16 bg-gradient-to-b from-transparent to-black/5 dark:to-black/30 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          <div className="[&_p]:mb-0 [&_h2]:mt-0 [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:font-bold">
            <AboutMeMDX />
          </div>
          <div className="flex flex-col justify-between text-center lg:text-right gap-8">
            <ColorModeToggle />
            <div>
              <div className="flex justify-center lg:justify-end gap-4 mb-4">
                <SocialMediaList />
              </div>
              <div className="text-text-muted">
                Copyright &copy; {new Date().getFullYear()}. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
      {showThemeAuthor && (
        <div className="container flex justify-center items-center font-semibold mt-16 gap-2">
          <img
            width="30"
            height="30"
            src="https://img.lekoarts.de/gatsby/logo_v2_w30.png"
            alt="LekoArts Logo"
            className="dark:invert"
          />
          <a
            aria-label="Link to the theme's GitHub repository"
            href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-emilia"
            className="text-text"
          >
            Theme
          </a>
          <div className="mx-1">by</div>
          <a
            aria-label="Link to the theme author's website"
            href="https://www.lekoarts.de?utm_source=emilia&utm_medium=Theme"
            className="text-text"
          >
            LekoArts
          </a>
        </div>
      )}
    </footer>
  )
}

export default Footer
