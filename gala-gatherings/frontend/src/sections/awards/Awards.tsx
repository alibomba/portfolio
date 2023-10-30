import { FaMedal } from 'react-icons/fa';


import styles from './awards.module.css';

const Awards = () => {
    return (
        <section className={styles.awards}>
            <h2 className={styles.awards__heading}>Nagrody</h2>
            <div className={styles.awards__grid}>
                <article className={styles.award}>
                    <FaMedal className={styles.award__icon} aria-label='ikona medalu' />
                    <p className={styles.award__text}>Certyfikat Eskpercki w Planowaniu i Koordynacji Wydarzen</p>
                </article>
                <article className={styles.award}>
                    <FaMedal className={styles.award__icon} aria-label='ikona medalu' />
                    <p className={styles.award__text}>Najlepsza Obsługa Cateringu na Imprezach</p>
                </article>
                <article className={styles.award}>
                    <FaMedal className={styles.award__icon} aria-label='ikona medalu' />
                    <p className={styles.award__text}>Firma Roku w Obszarze Imprez Firmowych</p>
                </article>
                <article className={styles.award}>
                    <FaMedal className={styles.award__icon} aria-label='ikona medalu' />
                    <p className={styles.award__text}>Wyróżnienie za Innowacyjność w Dekoracjach Wydarzeń</p>
                </article>
            </div>
        </section>
    )
}

export default Awards
