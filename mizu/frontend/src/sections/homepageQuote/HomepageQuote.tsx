

import styles from './homepageQuote.module.css';

const HomepageQuote = () => {
    return (
        <section className={styles.section}>
            <img className={styles.section__img} src={`${process.env.REACT_APP_BACKEND_URL}/storage/assets/quote-man.webp`} alt="inspirująca postać" />
            <q className={styles.section__quote}>Ziemski krajobraz to nasza wspólna przestrzeń do ochrony i zachowania dla przyszłych pokoleń. To w naszych rękach leży zdrowa i zrównoważona przyszłość naszej planety.</q>
        </section>
    )
}

export default HomepageQuote
