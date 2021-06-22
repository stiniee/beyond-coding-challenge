import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './layout.css'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout
