import * as React from "react"
import useSiteMetadata from "../hooks/use-site-metadata"

type SEOProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  children?: React.ReactNode
}

const Seo = ({ title = ``, description = ``, pathname = ``, image = ``, children = null }: SEOProps) => {
  const site = useSiteMetadata()

  const {
    siteTitle,
    siteTitleAlt: defaultTitle,
    siteUrl,
    siteDescription: defaultDescription,
    siteImage: defaultImage,
    author,
    siteLanguage,
  } = site

  const seo = {
    title: title ? `${title} | ${siteTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || defaultImage}`,
  }

  React.useEffect(() => {
    document.title = seo.title
    document.documentElement.lang = siteLanguage
  }, [seo.title, siteLanguage])

  return (
    <>
      {children}
    </>
  )
}

export default Seo
