import LanguagePicker from '../../components/languagePicker/LanguagePicker';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.footer__heading}>Pytania? Zadzwoń pod numer <a href="tel:00 800 112 4392">00 800 112 4392</a></p>
            <nav className={styles.footer__nav}>
                <a href="#" className={styles.footer__navLink}>Często zadawane pytania</a>
                <a href="#" className={styles.footer__navLink}>Centrum pomocy</a>
                <a href="#" className={styles.footer__navLink}>Konto</a>
                <a href="#" className={styles.footer__navLink}>Media Center</a>
                <a href="#" className={styles.footer__navLink}>Relacje z inwestorami</a>
                <a href="#" className={styles.footer__navLink}>Praca</a>
                <a href="#" className={styles.footer__navLink}>Zrealizuj karty podarunkowe</a>
                <a href="#" className={styles.footer__navLink}>Kup karty podarunkowe</a>
                <a href="#" className={styles.footer__navLink}>Jak oglądać?</a>
                <a href="#" className={styles.footer__navLink}>Warunki korzystania</a>
                <a href="#" className={styles.footer__navLink}>Prywatność</a>
                <a href="#" className={styles.footer__navLink}>Ustawienia plików cookie</a>
                <a href="#" className={styles.footer__navLink}>Informacje o firmie</a>
                <a href="#" className={styles.footer__navLink}>Skontaktuj się z nami</a>
                <a href="#" className={styles.footer__navLink}>Test prędkości połączenia</a>
                <a href="#" className={styles.footer__navLink}>Gwarancja prawna</a>
                <a href="#" className={styles.footer__navLink}>Informacje prawne</a>
                <a href="#" className={styles.footer__navLink}>Tylko na Netflix</a>
            </nav>
            <LanguagePicker />
            <p className={styles.footer__bottom}>Netflix Polska</p>
        </footer>
    )
}

export default Footer
