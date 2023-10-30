import { useEffect, useState } from 'react';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ServiceTile from '../../components/serviceTile/ServiceTile';


import styles from './services.module.css';

const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [noResults, setNoResults] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/services',
            cancelToken: source.token
        })
            .then(res => {
                setServices(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setNoResults(true);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, []);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <Link to='/uslugi/dodaj' className={styles.main__button}>Dodaj</Link>
            <section className={styles.main__services}>
                {
                    services.length > 0 &&
                    services.map(service => {
                        return (<ServiceTile
                            key={service.id}
                            id={service.id}
                            title={service.title}
                            price={service.price}
                            image={service.image}
                            setServices={setServices}
                        />)
                    })
                }
                {
                    noResults && <p className={styles.main__noResults}>Brak usług</p>
                }
            </section>
        </main>
    )
}

export default Services
