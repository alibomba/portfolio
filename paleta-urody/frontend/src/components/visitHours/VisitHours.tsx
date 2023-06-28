import { ReactNode, useContext, useEffect, useState } from 'react';
import { ReservationContext } from '../../pages';
import styles from './visitHours.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';


const VisitHours = () => {
    const selectedDate = useContext(ReservationContext)?.selectedDate;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [busyHours, setBusyHours] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const source = axios.CancelToken.source();

        const dateFormatted = `${selectedDate?.getFullYear()}-${selectedDate?.getMonth() && selectedDate.getMonth() + 1}-${selectedDate?.getDate()}`;

        axiosClient({
            method: 'get',
            url: `/appointments/${dateFormatted}`,
            cancelToken: source.token
        })
            .then(res => {
                setIsLoading(false);
                setBusyHours(res.data);
            })
            .catch(err => setError(err.message));


        return () => {
            source.cancel();
        }

    }, [selectedDate]);

    const hourFields: ReactNode[] = [];
    for (let i = 7; i <= 18; i++) {
        const hour: string = `${i}:00`;
        const today: Date = new Date(new Date().setHours(0, 0, 0, 0));
        const isBusy: boolean | undefined = busyHours.includes(hour) || (selectedDate && selectedDate < today);

        hourFields.push(
            <div key={i} className={`${styles.hour} ${isBusy && 'hour_disabled'}`}>
                <input type='radio' name="hour" id={hour} value={i} disabled={isBusy} aria-disabled={isBusy} />
                <label htmlFor={hour}>{hour}</label>
            </div>
        )
    }

    return (
        <fieldset>
            {error && <p role='alert' className={styles.error}>{error}</p>}
            <legend>Wybierz godzinę wizyty:</legend>
            <div className={`${isLoading ? styles.loadingContainer : styles.grid}`}>
                {
                    isLoading ? <img className={styles.loading} src="img/loading.gif" alt="loading" /> :
                        hourFields.map(item => item)
                }
            </div>
        </fieldset>
    )
}

export default VisitHours
