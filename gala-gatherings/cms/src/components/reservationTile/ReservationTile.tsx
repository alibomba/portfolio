import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

import formatDate from '../../utilities/formatDate';
import axiosClient from '../../axiosClient';
import Error from '../error/Error';
import styles from './reservationTile.module.css';

interface Props extends Reservation {
    setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
}

const ReservationTile = ({ id, service, price, date, setReservations }: Props) => {
    const [error, setError] = useState<string | null>(null);

    async function deleteReservation() {
        const confirmation = window.confirm('Czy na pewno chcesz usunąć rezerwację?');
        if (confirmation) {
            try {
                await axiosClient({
                    method: 'delete',
                    url: `/reservations/${id}`
                });
                setReservations(prev => {
                    const newValue = prev.filter(item => item.id !== id);
                    return newValue;
                });
            } catch (err: any) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            }
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <article className={styles.reservation}>
            <h3 className={styles.reservation__name}>{service}</h3>
            <p className={styles.reservation__price}>{price} PLN</p>
            <p className={styles.reservation__date}>{formatDate(date)}</p>
            <Link className={`${styles.reservation__button} ${styles.reservation__edit}`} to={`/rezerwacje/${id}`}>
                <MdEdit />
            </Link>
            <button onClick={deleteReservation} className={`${styles.reservation__button} ${styles.reservation__delete}`}>
                <AiFillDelete />
            </button>
        </article>
    )
}

export default ReservationTile
