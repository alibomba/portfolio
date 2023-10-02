
import { Link } from 'react-router-dom';
import { FaCcVisa, FaCcMastercard, FaPaypal, FaCcApplePay } from 'react-icons/fa';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__top}>
                <Link to='/'>
                    <img className={styles.footer__logo} src="/img/logo.png" alt="logo sklepu" />
                </Link>
                <nav className={styles.footer__nav}>
                    <Link className={styles.footer__navLink} to='/sklep'>Sklep</Link>
                    <Link className={styles.footer__navLink} to='/wyszukiwarka'>Wyszukiwarka</Link>
                    <Link className={styles.footer__navLink} to='/o-firmie'>O nas</Link>
                </nav>
                <nav className={styles.footer__nav}>
                    <Link className={styles.footer__navLink} to='#'>Polityka prywatności</Link>
                    <Link className={styles.footer__navLink} to='#'>Regulamin serwisu</Link>
                    <Link className={styles.footer__navLink} to='/kontakt'>Kontakt</Link>
                </nav>
            </div>
            <div className={styles.footer__bottom}>
                <p className={styles.footer__copyright}>Luxoryx &copy; 2023</p>
                <div className={styles.footer__paymentMethods}>
                    <FaCcVisa className={styles.footer__bottom__icon} />
                    <FaCcMastercard className={styles.footer__bottom__icon} />
                    <FaPaypal className={styles.footer__bottom__icon} />
                    <FaCcApplePay className={styles.footer__bottom__icon} />
                </div>
            </div>
        </footer>
    )
}

export default Footer
