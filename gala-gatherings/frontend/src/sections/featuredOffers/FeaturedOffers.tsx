import { useState, useEffect } from 'react';
import ServiceTile from '../../components/serviceTile/ServiceTile';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';

import styles from './featuredOffers.module.css';

const FeaturedOffers = () => {
    const [offers, setOffers] = useState<FeaturedOffer[]>([]);
    const [noResults, setNoResults] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/featured-offers',
            cancelToken: source.token
        })
            .then(res => {
                setOffers(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 404) {
                    setNoResults(true);
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


    if (noResults) {
        return <></>
    }

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {offers.length > 0 &&
                <section className={styles.section}>
                    <h2 className={styles.section__heading}>Polecane pakiety</h2>
                    <div className={styles.section__column}>
                        {offers.map(offer => {
                            return (
                                <ServiceTile
                                    key={offer.service.id}
                                    title={offer.service.title}
                                    image={offer.service.image}
                                    price={offer.service.price}
                                >
                                    {offer.service.description}
                                </ServiceTile>
                            )
                        })}
                    </div>
                    <Link to='/cennik' className={styles.section__button} >Zobacz więcej</Link>
                </section>
            }
        </>
    )
}

export default FeaturedOffers
