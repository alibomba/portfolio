
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';

import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__top}>
                <div className={styles.footer__left}>
                    <Link to='/'>
                        <img className={styles.footer__img} src="/img/logo.png" alt="logo GalaGatherings" />
                    </Link>
                    <p className={styles.footer__text}>Tworzymy Wyjątkowe Chwile. Dla nas każde wydarzenie to szansa na stworzenie niezapomnianych wspomnień. Jesteśmy zawsze gotowi, aby uczynić Twoją okazję wyjątkową.</p>
                    <div className={styles.footer__row}>
                        <a href="https://www.facebook.com/" target='_blank'>
                            <BsFacebook className={styles.footer__socialLink} />
                        </a>
                        <a href="https://www.instagram.com/" target='_blank'>
                            <BsInstagram className={styles.footer__socialLink} />
                        </a>
                        <a href="https://pl.linkedin.com/" target='_blank'>
                            <BsLinkedin className={styles.footer__socialLink} />
                        </a>
                    </div>
                </div>
                <nav className={styles.footer__nav}>
                    <div className={styles.footer__nav__column}>
                        <Link to='/cennik' className={styles.footer__navLink}>Cennik</Link>
                        <Link to='/portfolio' className={styles.footer__navLink}>Portfolio</Link>
                        <Link to='/lokacje' className={styles.footer__navLink}>Lokacje</Link>
                        <Link to='/aplikuj' className={styles.footer__navLink}>Aplikuj</Link>
                    </div>
                    <div className={styles.footer__nav__column}>
                        <Link to='/o-nas' className={styles.footer__navLink}>O firmie</Link>
                        <Link to='/kontakt' className={styles.footer__navLink}>Kontakt</Link>
                        <Link to='/jak-to-dziala' className={styles.footer__navLink}>Proces organizacji</Link>
                    </div>
                </nav>
            </div>
            <div className={styles.footer__bottom}>
                <p className={styles.footer__bottom__text}>Copyright &copy; 2023 GalaGatherings</p>
                <Link to='#' className={styles.footer__bottom__text}>Regulamin serwisu</Link>
            </div>
        </footer>
    )
}

export default Footer
