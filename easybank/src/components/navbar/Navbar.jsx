import { useState } from 'react';
import Button from '../button/Button';
import './navbar.css';

const Navbar = () => {
    const [isNavShowing, setIsNavShowing] = useState(false);

    function toggleNav() {
        setIsNavShowing(prev => !prev);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1100) {
            setIsNavShowing(false);
        }
    })

    return (
        <header className='header'>
            <a href="#"><img className='header__logo' src="img/logo.svg" alt="logo" /></a>
            <nav className={`header__nav ${isNavShowing && 'header__nav--active'}`}>
                <a href="#" className="header__nav-link">Home</a>
                <a href="#" className="header__nav-link">About</a>
                <a href="#" className="header__nav-link">Contact</a>
                <a href="#" className="header__nav-link">Blog</a>
                <a href="#" className="header__nav-link">Careers</a>
            </nav>
            <img onClick={toggleNav} className='header__toggle' src={isNavShowing ? 'img/icon-close.svg' : 'img/icon-hamburger.svg'} alt="hamburger icon" />
            <Button header={true}>Request Invite</Button>
        </header>
    )
}

export default Navbar
