import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocationTile from '../../components/locationTile/LocationTile';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';


import styles from './locations.module.css';

const Location = () => {
    const [locations, setLocations] = useState<LocationDB[]>([]);
    const [howMany, setHowMany] = useState<number>(5);
    const [isMore, setIsMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/locations-cms?howManyParam=${howMany}`,
            cancelToken: source.token
        })
            .then(res => {
                const data = res.data;
                setLocations(data.locations);
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
            <Link to='/lokacje/dodaj' className={styles.main__button}>Dodaj</Link>
            <div className={styles.main__locations}>
                {
                    locations.length > 0 ?
                        locations.map(location => {
                            return (
                                <LocationTile
                                    key={location.id}
                                    id={location.id}
                                    image={location.image}
                                    name={location.name}
                                    standard={location.standard}
                                    setLocations={setLocations}
                                />
                            )
                        })
                        :
                        <p className={styles.main__noResults}>Brak lokacji</p>
                }
            </div>
            {
                isMore && <button onClick={() => setHowMany(prev => prev + 5)} className={styles.main__showMore}>Pokaż więcej</button>
            }
        </main>
    )
}

export default Location
