import SocialMediaList from './social-media-list'
import ColorModeToggle from './colormode-toggle'

const Footer = () => {
  return (
    <footer className="pt-24 pb-16 bg-gradient-to-b from-transparent to-black/5 dark:to-black/30 mt-auto">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center gap-8">
          <ColorModeToggle />
          <div>
            <div className="flex justify-center gap-4 mb-4">
              <SocialMediaList />
            </div>
            <div className="text-text-muted">
              Copyright &copy; {new Date().getFullYear()}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
