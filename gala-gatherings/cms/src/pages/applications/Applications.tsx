import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import ApplicationTile from '../../components/applicationTile/ApplicationTile';

import styles from './applications.module.css';

const Applications = () => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [howMany, setHowMany] = useState<number>(5);
    const [isMore, setIsMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/job-applications?howManyParam=${howMany}`,
            cancelToken: source.token
        })
            .then(res => {
                const data = res.data;
                setApplications(data.applications);
                setIsMore(data.isMore);
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, [howMany]);



    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <div className={styles.main__applications}>
                {
                    applications.length > 0 ?
                        applications.map(item => {
                            return (
                                <ApplicationTile
                                    key={item.id}
                                    id={item.id}
                                    author={`${item.firstName} ${item.lastName}`}
                                    position={item.jobPosition}
                                />
                            )
                        })
                        :
                        <p className={styles.main__noResults}>Brak aplikacji</p>
                }
            </div>
            {
                isMore && <button className={styles.main__showMore}>Pokaż więcej</button>
            }
        </main>
    )
}

export default Applications
