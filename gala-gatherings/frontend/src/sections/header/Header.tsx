import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

import styles from './header.module.css';

const Header = () => {
    const [isNavActive, setIsNavActive] = useState<boolean>(false);

    return (
        <>
            <header className={styles.header}>
                <Link to='/'>
                    <img className={styles.header__logo} src="/img/logo.png" alt="logo GalaGatherings" />
                </Link>
                <nav className={styles.header__nav}>
                    <NavLink className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/'>Home</NavLink>
                    <NavLink className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/cennik'>Cennik</NavLink>
                    <NavLink className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/portfolio'>Portfolio</NavLink>
                    <NavLink className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/o-nas'>O nas</NavLink>
                    <NavLink className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/kontakt'>Kontakt</NavLink>
                </nav>
            </header>
            <header className={styles.header_mobile}>
                <div className={styles.header_mobile__top}>
                    <Link onClick={() => setIsNavActive(false)} to='/'>
                        <img className={styles.header__logo} src="/img/logo.png" alt="logo GalaGatherings" />
                    </Link>
                    <button onClick={() => setIsNavActive(prev => !prev)} title='Zmień widoczność nawigacji' className={`${styles.header_mobile__hamburger} ${isNavActive && styles.header_mobile__hamburger_active}`}>
                        <GiHamburgerMenu />
                    </button>
                </div>
                <nav className={`${styles.header_mobile__nav} ${isNavActive && styles.header_mobile__nav_active}`}>
                    <NavLink onClick={() => setIsNavActive(false)} className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/'>Home</NavLink>
                    <NavLink onClick={() => setIsNavActive(false)} className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/cennik'>Cennik</NavLink>
                    <NavLink onClick={() => setIsNavActive(false)} className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/portfolio'>Portfolio</NavLink>
                    <NavLink onClick={() => setIsNavActive(false)} className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/o-nas'>O nas</NavLink>
                    <NavLink onClick={() => setIsNavActive(false)} className={({ isActive }) => `${styles.header__navLink} ${isActive && styles.header__navLink_active}`} to='/kontakt'>Kontakt</NavLink>
                </nav>
            </header>
        </>
    )
}

export default Header
