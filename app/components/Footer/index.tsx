import React from 'react'
import './footer.css'

interface FooterProps {
    children?: React.ReactNode
}

const Footer = ({ children }: FooterProps): JSX.Element => {
    return <footer>{children}</footer>
}

export default Footer
