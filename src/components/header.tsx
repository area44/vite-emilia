import useEmiliaConfig from '../hooks/use-emilia-config'
import HeaderBackground from './header-background'
import SocialMediaList from './social-media-list'
import Svg from './svg'
import avatarUrl from '../../content/assets/avatar.png'

const Header = () => {
  const { name, location, assetsPath } = useEmiliaConfig()

  return (
    <header className="relative overflow-hidden flex justify-center py-20">
      <HeaderBackground />
      <div className="text-center z-10">
        <div className="animate-in fade-in duration-700">
          <div className="overflow-hidden rounded-full h-[100px] w-[100px] md:h-[140px] md:w-[140px] inline-block shadow-lg">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="text-xs absolute inset-0 p-3 bg-red-200"
                data-placeholder="true"
              >
                Place an image with the name "avatar" inside the directory "
                {assetsPath}"
              </div>
            )}
          </div>
        </div>
        <div className="animate-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold mt-4 text-heading">
            {name}
          </h1>
        </div>
        <div className="animate-in slide-in-from-bottom-8 duration-700 delay-250">
          <div className="flex justify-center items-center text-text mt-2">
            <Svg
              id="location"
              width="20px"
              height="20px"
              className="text-icon-primary mr-2"
            />
            {location}
          </div>
        </div>
        <div
          data-testid="social-header"
          className="mt-8 mb-12 flex justify-center gap-4 animate-in fade-in duration-700 delay-600"
        >
          <SocialMediaList />
        </div>
      </div>
    </header>
  )
}

export default Header
