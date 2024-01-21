import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MY_BOOKMARKS } from '../../graphql/queries';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Pagination from '../../components/pagination/Pagination';
import styles from './bookmarks.module.css';
import OfferTile from '../../components/offerTile/OfferTile';

const Bookmarks = () => {
    const [bookmarkQuery] = useLazyQuery(GET_MY_BOOKMARKS);
    const [offers, setOffers] = useState<PaginationResponse<OfferTile> | null>(null);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await bookmarkQuery({ variables: { page } });
            if (error) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
                return;
            }
            setOffers(data.getMyBookmarks);
            setIsLoading(false);
        }

        fetchData();
    }, [page]);

    if (isLoading || !offers) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <div className={styles.main__column}>
                {
                    offers.data.length > 0 ?
                        offers.data.map(offer => {
                            return (
                                <OfferTile
                                    key={offer._id}
                                    _id={offer._id}
                                    title={offer.title}
                                    company={offer.company}
                                    mode={offer.mode}
                                    location={offer.location}
                                    requiredTechnologies={offer.requiredTechnologies}
                                    salary={offer.salary}
                                />
                            )
                        })
                        :
                        <p className={styles.main__noResults}>Brak zapisanych ofert</p>
                }
            </div>
            {
                offers.lastPage > 1 &&
                <Pagination
                    page={page}
                    lastPage={offers.lastPage}
                    setPage={setPage}
                />
            }
        </main>
    )
}

export default Bookmarks
