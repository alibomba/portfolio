
import { FaWallet, FaLock } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { HiReceiptRefund } from 'react-icons/hi2';
import styles from './homeSecurity.module.css';

const HomeSecurity = () => {
    return (
        <section className={styles.security}>
            <h2 className={styles.security__heading}>Bezpieczeństwo</h2>
            <div className={styles.security__grid}>
                <article className={styles.security__article}>
                    <FaWallet className={styles.article__icon} />
                    <p className={styles.article__text}>Dbamy o Twoje bezpieczeństwo płatności. Oferujemy różne wygodne metody, takie jak Visa, MasterCard, PayPal, Apple Pay i BLIK, które możesz wybrać według swoich preferencji. Twoje dane są zawsze chronione, a nasze protokoły zapewniają bezpieczeństwo transakcji.</p>
                </article>
                <article className={styles.security__article}>
                    <MdLocalShipping className={styles.article__icon} />
                    <p className={styles.article__text}>Dbamy o Twoje bezpieczeństwo płatności. Oferujemy różne wygodne metody, takie jak Visa, MasterCard, PayPal, Apple Pay i BLIK, które możesz wybrać według swoich preferencji. Twoje dane są zawsze chronione, a nasze protokoły zapewniają bezpieczeństwo transakcji.</p>
                </article>
                <article className={styles.security__article}>
                    <HiReceiptRefund className={styles.article__icon} />
                    <p className={styles.article__text}>Dbamy o Twoje bezpieczeństwo płatności. Oferujemy różne wygodne metody, takie jak Visa, MasterCard, PayPal, Apple Pay i BLIK, które możesz wybrać według swoich preferencji. Twoje dane są zawsze chronione, a nasze protokoły zapewniają bezpieczeństwo transakcji.</p>
                </article>
                <article className={styles.security__article}>
                    <FaLock className={styles.article__icon} />
                    <p className={styles.article__text}>Dbamy o Twoje bezpieczeństwo płatności. Oferujemy różne wygodne metody, takie jak Visa, MasterCard, PayPal, Apple Pay i BLIK, które możesz wybrać według swoich preferencji. Twoje dane są zawsze chronione, a nasze protokoły zapewniają bezpieczeństwo transakcji.</p>
                </article>
            </div>
        </section>
    )
}

export default HomeSecurity
