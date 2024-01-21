
import { Link } from 'react-router-dom';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import styles from './myApplicationUser.module.css';
import formatNumber from '../../utils/formatNumber';

const MyApplicationUser = ({ offer: { _id: offerId, company: { _id: companyId, logo }, salary, title }, status }: Omit<MyApplicationUser, '_id'>) => {
    const statusMap = new Map([
        ['Oczekujące', 'var(--black-65)'],
        ['Odrzucone', 'red'],
        ['Zaakceptowane', '#0075FF']
    ]);

    return (
        <article className={styles.application}>
            <Link to={`/firma/${companyId}`}>
                <img className={styles.application__img} src={logo || '/default.webp'} alt="logo firmy" />
            </Link>
            <div className={styles.application__info}>
                <h3 className={styles.application__title}>{title}</h3>
                <p className={styles.application__row}>
                    <PiCurrencyDollarSimpleBold className={styles.application__dollar} />
                    <span className={styles.application__salary}>{formatNumber(salary)}zł</span>
                </p>
                <div className={styles.application__info__bottom}>
                    <Link to={`/oferta/${offerId}`} className={styles.application__button}>Zobacz ofertę</Link>
                    <p className={styles.application__status}>
                        <b>Status: </b>
                        <span style={{ color: statusMap.get(status) }}>{status}</span>
                    </p>
                </div>
            </div>
        </article>
    )
}

export default MyApplicationUser
