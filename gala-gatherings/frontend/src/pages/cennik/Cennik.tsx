import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceTile from '../../components/serviceTile/ServiceTile';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './cennik.module.css';

const Cennik = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
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
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, []);


    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            <nav className={styles.nav}>
                <Link to='/kontakt' className={styles.nav__button}>Kontakt</Link>
                <Link to='/jak-to-dziala' className={styles.nav__button}>Jak to działa</Link>
                <Link to='/lokacje' className={styles.nav__button}>Lokacje</Link>
            </nav>
            <main className={styles.main}>
                {
                    services.length > 0 &&
                    services.map(service => {
                        return (
                            <ServiceTile
                                key={service.id}
                                title={service.title}
                                image={service.image}
                                price={service.price}
                            >
                                {service.description}
                            </ServiceTile>
                        )
                    })
                }
            </main>
        </>
    )
}

export default Cennik
