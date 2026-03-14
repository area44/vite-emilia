import * as React from 'react'
import Footer from './footer'

type LayoutProps = { children: React.ReactNode }

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow relative">{children}</main>
    <Footer />
  </div>
)

export default Layout
