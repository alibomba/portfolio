import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

import styles from './header.module.css';

const Header = () => {
    const [isNavActive, setIsNavActive] = useState<boolean>(false);

    return (
        <>
            <header className={styles.header}>
                <Link to='/'>
                    <img className={styles.header__logo} src="/img/logo.png" alt="logo organizacji" />
                </Link>
                <nav className={styles.header__nav}>
                    <Link className={styles.header__navLink} to='/wesprzyj'>Wesprzyj</Link>
                    <Link className={styles.header__navLink} to='/projekty'>Projekty</Link>
                    <Link className={styles.header__navLink} to='/o-nas'>O nas</Link>
                    <Link className={styles.header__navLink} to='/kontakt'>Kontakt</Link>
                </nav>
            </header>
            <header className={styles.header_mobile}>
                <div className={styles.header_mobile__top}>
                    <Link onClick={() => setIsNavActive(false)} to='/'>
                        <img className={styles.header__logo} src="/img/logo.png" alt="logo organizacji" />
                    </Link>
                    <button title='Zmień widoczność menu nawigacji' onClick={() => setIsNavActive(prev => !prev)} className={`${styles.header_mobile__toggle} ${isNavActive && styles.header_mobile__toggle_active}`}>
                        <GiHamburgerMenu />
                    </button>
                </div>
                <nav className={`${styles.header_mobile__nav} ${isNavActive && styles.header_mobile__nav_active}`}>
                    <Link onClick={() => setIsNavActive(false)} to='/wesprzyj' className={styles.header__navLink}>Wesprzyj</Link>
                    <Link onClick={() => setIsNavActive(false)} to='/projekty' className={styles.header__navLink}>Projekty</Link>
                    <Link onClick={() => setIsNavActive(false)} to='/o-nas' className={styles.header__navLink}>O nas</Link>
                    <Link onClick={() => setIsNavActive(false)} to='/kontakt' className={styles.header__navLink}>Kontakt</Link>
                </nav>
            </header>
        </>
    )
}

export default Header
