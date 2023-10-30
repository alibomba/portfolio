import { useState, useEffect } from 'react';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../axiosClient';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';

import LocationTile from '../../components/locationTile/LocationTile';

import styles from './lokacje.module.css';

const Lokacje = () => {
    const [locations, setLocations] = useState<PaginationResponse<LocationDB> | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/locations?page=${page}`,
            cancelToken: source.token
        })
            .then(res => {
                setLocations(res.data);
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => setLoading(false));

        return () => {
            source.cancel();
        }

    }, [page]);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <div className={styles.main__grid}>
                {
                    (locations && locations.data.length > 0) &&
                    locations.data.map(location => {
                        return (
                            <LocationTile
                                key={location.id}
                                name={location.name}
                                standard={location.standard}
                                image={location.image}
                            />
                        )
                    })
                }
            </div>
            <Pagination
                page={page}
                lastPage={locations?.lastPage}
                setPage={setPage}
            />
        </main>
    )
}

export default Lokacje
