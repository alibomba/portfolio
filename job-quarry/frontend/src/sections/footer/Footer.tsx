
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__top}>
                <Link to='/'>
                    <img className={styles.footer__logo} src={`${import.meta.env.VITE_API_URL}/storage/text-logo.png`} alt="logo Job Quarry" />
                </Link>
                <a className={styles.footer__socialLink} title='Facebook' href="https://facebook.com" target='_blank'>
                    <FaFacebook />
                </a>
                <a className={styles.footer__socialLink} title='Linkedin' href="https://linkedin.com" target='_blank'>
                    <FaLinkedin />
                </a>
                <a className={styles.footer__socialLink} title='Instagram' href="https://instagram.com" target='_blank'>
                    <FaInstagram />
                </a>
            </div>
            <nav className={styles.footer__nav}>
                <Link to='#' className={styles.footer__navLink}>Regulamin serwisu</Link>
                <Link to='#' className={styles.footer__navLink}>Polityka prywatności</Link>
            </nav>
            <p className={styles.footer__text}>Copyright &copy; 2023 Job Quarry</p>
        </footer>
    )
}

export default Footer
