import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

import styles from './header.module.css';

const Header = () => {
    const [isNavActive, setIsNavActive] = useState(false);

    function hideNav(): void {
        setIsNavActive(false);
    }

    return (
        <header className={styles.header}>
            <Link onClick={hideNav} to='/'>
                <img src="/img/logo.png" alt="logo" className={styles.header__logo} />
            </Link>

            <GiHamburgerMenu
                onClick={e => setIsNavActive(prev => !prev)}
                className={`${styles.header__hamburger} ${isNavActive && styles.header__hamburger_active}`}
                size={50}
                color='var(--black)' />

            <nav className={`${styles.header__nav} ${isNavActive && styles.header__nav_active}`}>
                <NavLink
                    onClick={hideNav}
                    to='/rezerwacja'
                    className={({ isActive }) =>
                        `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}
                >Rezerwacja</NavLink>

                <NavLink
                    onClick={hideNav}
                    to='/blog'
                    className={({ isActive }) =>
                        `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}
                >Blog</NavLink>

                <NavLink
                    onClick={hideNav}
                    to='/galeria'
                    className={({ isActive }) =>
                        `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}
                >Galeria</NavLink>

                <NavLink
                    onClick={hideNav}
                    to='/kontakt'
                    className={({ isActive }) =>
                        `${styles.header__navLink} ${isActive && styles.header__navLink_active}`}
                >Kontakt</NavLink>
            </nav>
        </header>
    )
}

export default Header
