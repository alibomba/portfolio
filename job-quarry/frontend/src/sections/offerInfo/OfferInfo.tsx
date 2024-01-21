


import formatDate from '../../utils/formatDate';
import formatNumber from '../../utils/formatNumber';
import styles from './offerInfo.module.css';

interface Props {
    mode: string,
    location: string,
    level: string,
    expiresAt: string,
    contractType: string,
    salary: number
}

const OfferInfo = ({ mode, location, level, expiresAt, contractType, salary }: Props) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Podstawowe informacje</h2>
            <p className={styles.section__info}>
                <span className={styles.info__key}>Tryb: </span>
                <span className={styles.info__value}>{mode}</span>
            </p>
            <p className={styles.section__info}>
                <span className={styles.info__key}>Lokalizacja: </span>
                <span className={styles.info__value}>{location}</span>
            </p>
            <p className={styles.section__info}>
                <span className={styles.info__key}>Poziom: </span>
                <span className={styles.info__value}>{level}</span>
            </p>
            <p className={styles.section__info}>
                <span className={styles.info__key}>Ważne do: </span>
                <span className={styles.info__value}>{formatDate(expiresAt)}</span>
            </p>
            <p className={styles.section__info}>
                <span className={styles.info__key}>Typ umowy: </span>
                <span className={styles.info__value}>{contractType}</span>
            </p>
            <p className={styles.section__info}>
                <span className={styles.info__key}>Zarobki: </span>
                <span className={styles.info__value}>{formatNumber(salary)}zł</span>
            </p>
        </section>
    )
}

export default OfferInfo
