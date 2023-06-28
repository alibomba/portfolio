import { Link } from 'react-router-dom';
import { BsTwitter, BsFacebook, BsInstagram, BsDribbble, BsTiktok, BsYoutube } from 'react-icons/bs';

import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link to='/'>
                <img className={styles.footer__img} src="/img/logo.png" alt="logo" />
            </Link>
            <nav className={styles.footer__nav}>
                <a href="#" className={styles.footer__navLink}>Lorem</a>
                <a href="#" className={styles.footer__navLink}>Ipsum</a>
                <a href="#" className={styles.footer__navLink}>Dolor</a>
                <a href="#" className={styles.footer__navLink}>Sit</a>
                <a href="#" className={styles.footer__navLink}>Amet</a>
            </nav>
            <div className={styles.footer__nav}>
                <a aria-label='twitter' href="#">
                    <BsTwitter className={styles.footer__socialLink} />
                </a>
                <a aria-label='facebook' href="#">
                    <BsFacebook className={styles.footer__socialLink} />
                </a>
                <a aria-label='instagram' href="#">
                    <BsInstagram className={styles.footer__socialLink} />
                </a>
                <a aria-label='dribbble' href="#">
                    <BsDribbble className={styles.footer__socialLink} />
                </a>
                <a aria-label='tiktok' href="#">
                    <BsTiktok className={styles.footer__socialLink} />
                </a>
                <a aria-label='youtube' href="#">
                    <BsYoutube className={styles.footer__socialLink} />
                </a>
            </div>
        </footer>
    )
}

export default Footer
