import { Link } from 'react-router-dom';
import { BsFacebook, BsYoutube, BsInstagram } from 'react-icons/bs';
import { RiTwitterXFill } from 'react-icons/ri';

import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link to='/'>
                <img className={styles.footer__logo} src="/img/logo.png" alt="logo organizacji" />
            </Link>
            <nav className={styles.footer__nav}>
                <Link to='/aktualnosci' className={styles.footer__navLink}>Aktualności</Link>
                <Link to='/o-nas' className={styles.footer__navLink}>O nas</Link>
                <Link to='/faq' className={styles.footer__navLink}>FAQ</Link>
                <Link to='/kontakt' className={styles.footer__navLink}>Kontakt</Link>
            </nav>
            <div className={styles.footer__nav}>
                <a title='Facebook' className={styles.footer__socialLink} href="https://www.facebook.com/" target='_blank'>
                    <BsFacebook />
                </a>
                <a title='Youtube' className={styles.footer__socialLink} href="https://www.youtube.com/" target='_blank'>
                    <BsYoutube />
                </a>
                <a title='Instagram' className={styles.footer__socialLink} href="https://www.instagram.com/" target='_blank'>
                    <BsInstagram />
                </a>
                <a title='Twitter' className={styles.footer__socialLink} href="https://twitter.com/home" target='_blank'>
                    <RiTwitterXFill />
                </a>
            </div>
            <p className={styles.footer__copyright}>Mizu &copy; 2023 Wszelkie prawa zastrzeżone</p>
        </footer>
    )
}

export default Footer
