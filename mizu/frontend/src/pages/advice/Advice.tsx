import { useState, useEffect } from 'react';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import AdviceTile from '../../components/adviceTile/AdviceTile';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './advice.module.css';

const Advice = () => {
    const [advice, setAdvice] = useState<Advice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/advice',
            cancelToken: source.token
        })
            .then(res => {
                setAdvice(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setError(err?.response?.data?.message);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, []);


    if (error) {
        return <Error>{error}</Error>
    }

    if (loading) {
        return <Loading />
    }

    return (
        <main className={styles.main}>
            {
                advice.length !== 0 &&
                advice.map((advice, index) => {
                    return (
                        <AdviceTile
                            key={advice.id}
                            heading={advice.title}
                            content={advice.content}
                            color={index % 2 === 0 ? 'primary' : 'secondary'}
                        />
                    )
                })
            }
        </main>
    )
}

export default Advice
