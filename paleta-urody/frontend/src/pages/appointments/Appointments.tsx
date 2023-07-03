import { useState, useEffect } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';

import getPostDate from '../../components/getPostDate';
import styles from './appointments.module.css';
import axiosClient from '../../axiosClient';
import axios from 'axios';

interface Link {
    url: string | null;
    label: string;
    active: boolean;
}
interface Appointment {
    id: number;
    phone_number: string;
    email: string;
    date: string;
    created_at: string;
    updated_at: string;
}
interface Appointments {
    current_page: number;
    data: Appointment[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

const Appointments = () => {
    const [appointments, setAppointments] = useState<Appointments | null>(null);
    const [page, setPage] = useState<number>(1);

    const formatDate = (dateString: string): string => {
        const dateObject = new Date(dateString);
        const day = getPostDate(dateObject);
        return `${day} ${dateObject.getHours()}:00`;
    }

    useEffect(() => {
        setAppointments(null);
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/appointments?page=${page}`,
            cancelToken: source.token
        })
            .then(res => {
                setAppointments(res.data);
            })
            .catch(err => console.error(err));

        return () => {
            source.cancel();
        }
    }, [page]);

    return (
        <main className={styles.main}>
            <h1 className={styles.heading}>Wizyty</h1>
            {!appointments ? <img src="/img/loading.gif" alt="loading" style={{ display: 'block', margin: '0 auto' }} /> :
                <>
                    <div className={styles.main__appointments}>
                        {
                            appointments.data.map(appointment => {
                                return (
                                    <div className={styles.appointment} key={appointment.id}>
                                        <div className={styles.appointment__phone}>
                                            <p className={styles.appointment__phone__title}>Nr telefonu</p>
                                            <p className={styles.appointment__phone__value}>{appointment.phone_number}</p>
                                        </div>
                                        <div className={styles.appointment__email}>
                                            <p className={styles.appointment__email__title}>Adres e-mail</p>
                                            <p className={styles.appointment__email__value}>{appointment.email}</p>
                                        </div>
                                        <div className={styles.appointment__date}>
                                            <p className={styles.appointment__date__title}>Data</p>
                                            <p className={styles.appointment__date__value}>{formatDate(appointment.date)}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.main__links}>
                        <button
                            onClick={() => setPage(1)}
                            className={`${styles.links__link} ${styles.links__edge} ${page === 1 && styles.links__link_disabled}`}
                            disabled={page === 1}>
                            <GrPrevious className={styles.links__icon} />
                            <GrPrevious className={styles.links__icon} />
                        </button>
                        <button
                            onClick={() => setPage(prev => prev - 1)}
                            className={`${styles.links__link} ${page === 1 && styles.links__link_disabled}`}
                            disabled={page === 1}>
                            <GrPrevious className={styles.links__icon} />
                        </button>
                        <button
                            onClick={() => setPage(prev => prev + 1)}
                            className={`${styles.links__link} ${page === appointments.last_page && styles.links__link_disabled}`}
                            disabled={page === appointments.last_page}>
                            <GrNext className={styles.links__icon} />
                        </button>
                        <button
                            onClick={() => setPage(appointments.last_page)}
                            className={`${styles.links__link} ${styles.links__edge} ${page === appointments.last_page && styles.links__link_disabled}`}
                            disabled={page === appointments.last_page}>
                            <GrNext className={styles.links__icon} />
                            <GrNext className={styles.links__icon} />
                        </button>
                    </div>
                    <p className={styles.main__page}>Strona: {page}</p>
                </>
            }
        </main>
    )
}

export default Appointments
