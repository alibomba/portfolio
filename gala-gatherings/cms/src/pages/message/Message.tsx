import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './message.module.css';

const Message = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState<ContactMessage | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/contact/${id}`,
            cancelToken: source.token
        })
            .then(res => {
                setMessage(res.data);
                axiosClient({
                    method: 'post',
                    url: `/set-as-seen/${id}`,
                    cancelToken: source.token
                })
                    .catch(err => {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    });
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    navigate('/wiadomosci');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, [id]);


    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                message &&
                <main className={styles.main}>
                    <h1 className={styles.main__author}>{message.fullName}</h1>
                    {
                        message.companyName && <p className={styles.main__subText}>{message.companyName}</p>
                    }
                    <p className={styles.main__subText}>{message.email}</p>
                    <p className={styles.main__subText}>Tel: {message.phoneNumber}</p>
                    <p className={styles.main__subText}>{message.subject}</p>
                    <p className={styles.main__text}>{message.details}</p>
                </main>
            }
        </>
    )
}

export default Message
