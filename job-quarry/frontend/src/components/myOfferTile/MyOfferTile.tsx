import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_OFFER } from '../../graphql/mutations';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import { GiDiploma } from 'react-icons/gi';
import { RiFilePaper2Fill, RiTimerFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styles from './myOfferTile.module.css';
import formatNumber from '../../utils/formatNumber';
import formatDate from '../../utils/formatDate';
import { GET_COMPANY_PROFILE, GET_MY_OFFERS, GET_OFFER, OFFER_SEARCH } from '../../graphql/queries';
import Error from '../error/Error';
import Popup from '../popup/Popup';

interface Props extends MyOffer {
    setOffers: React.Dispatch<React.SetStateAction<MyOffer[]>>;
}

const MyOfferTile = ({ _id, title, salary, level, contractType, expiresAt, setOffers }: Props) => {
    const [deleteMutation] = useMutation(DELETE_OFFER, { refetchQueries: [{ query: GET_COMPANY_PROFILE }, { query: GET_MY_OFFERS }, { query: GET_OFFER }, { query: OFFER_SEARCH }] });
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });

    async function deleteOffer() {
        const confirmation = window.confirm('Czy na pewno chcesz usunąć ofertę?');
        if (confirmation) {
            try {
                await deleteMutation({ variables: { deleteOfferId: _id } });
                setOffers(prev => {
                    const newValue = prev.filter(item => item._id !== _id);
                    return newValue;
                });
                setPopup({ content: 'Usunięto ofertę', active: true, type: 'good' });
                setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <article className={styles.offer}>
            <div className={styles.offer__left}>
                <h3 className={styles.offer__title}>{title}</h3>
                <div className={styles.offer__info}>
                    <p className={styles.info__item}>
                        <PiCurrencyDollarSimpleBold className={styles.info__icon} />
                        <span>{formatNumber(salary)}zł</span>
                    </p>
                    <p className={styles.info__item}>
                        <GiDiploma className={styles.info__icon} />
                        <span>{level}</span>
                    </p>
                    <p className={styles.info__item}>
                        <RiFilePaper2Fill className={styles.info__icon} />
                        <span>{contractType}</span>
                    </p>
                    <p className={styles.info__item}>
                        <RiTimerFill className={styles.info__icon} />
                        <span>{formatDate(expiresAt)}</span>
                    </p>
                </div>
            </div>
            <div className={styles.offer__right}>
                <Link className={styles.offer__button} to={`/analityka/${_id}`}>Statystyki</Link>
                <Link className={styles.offer__button} to={`/oferta/${_id}`}>Podgląd</Link>
                <Link className={styles.offer__button} to={`/edytuj-oferte/${_id}`}>Edytuj</Link>
                <button onClick={deleteOffer} className={`${styles.offer__button} ${styles.offer__button_delete}`}>Usuń</button>
            </div>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </article>
    )
}

export default MyOfferTile
