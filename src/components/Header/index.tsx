import React from 'react'
import './header.css'

interface HeaderProps {
    children?: React.ReactNode
}

const Header = ({ children }: HeaderProps): JSX.Element => {
    return <header> {children}</header>
}

export default Header
