import { useState, useEffect } from 'react';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';

import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './nearestDate.module.css';

const NearestDate = () => {
    const [date, setDate] = useState<string | null>(null);
    const [remaining, setRemaining] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/nearest-date',
            cancelToken: source.token
        })
            .then(res => {
                const data = res.data;
                setDate(data.date);
                setRemaining(data.remaining);
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, [])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                (date && remaining) &&
                <section className={styles.section}>
                    <h2 className={styles.section__heading}>Najbliższy wolny termin</h2>
                    <div className={styles.section__dateContainer}>
                        <p className={styles.section__date}>{date}</p>
                    </div>
                    <p className={styles.section__remaining}>Pozostało: {remaining} dni</p>
                </section>
            }
        </>
    )
}

export default NearestDate
