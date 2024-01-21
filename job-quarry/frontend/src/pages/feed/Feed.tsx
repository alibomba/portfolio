import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { OFFER_SEARCH } from '../../graphql/queries';
import Search from '../../components/search/Search';
import styles from './feed.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import OfferTile from '../../components/offerTile/OfferTile';
import Pagination from '../../components/pagination/Pagination';

const Feed = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(decodeURI(location.search));
    const [searchQuery] = useLazyQuery(OFFER_SEARCH);
    const [searchInput, setSearchInput] = useState<SearchInput>({});
    const [page, setPage] = useState<number>(1);
    const [offers, setOffers] = useState<PaginationResponse<OfferTile>>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const isMounted = useRef(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            let querySearchInput: SearchInput = {};
            if (!isMounted.current) {
                if (searchParams.get('phrase')) {
                    querySearchInput.phrase = searchParams.get('phrase')!;
                }
                if (searchParams.get('city')) {
                    querySearchInput.city = searchParams.get('city')!;
                }
                if (searchParams.get('level')) {
                    querySearchInput.level = searchParams.get('level')!;
                }
                if (searchParams.get('contractType')) {
                    querySearchInput.contractType = searchParams.get('contractType')!;
                }
                if (searchParams.get('mode')) {
                    querySearchInput.mode = searchParams.get('mode')!;
                }
                if (searchParams.get('technologies')) {
                    const technologies = JSON.parse(searchParams.get('technologies')!);
                    if (technologies.length > 0) {
                        querySearchInput.technologies = technologies;
                    }
                }
                if (searchParams.get('salaryFrom')) {
                    querySearchInput.salaryFrom = parseInt(searchParams.get('salaryFrom')!);
                }
                if (searchParams.get('salaryTo')) {
                    querySearchInput.salaryTo = parseInt(searchParams.get('salaryTo')!);
                }
            } else {
                querySearchInput = searchInput;
                setPage(1);
            }
            querySearchInput.page = 1;
            const { data, error } = await searchQuery({ variables: { searchInput: querySearchInput } });
            if (error) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
                return;
            }
            setOffers(data.search);
            setIsLoading(false);
        }

        fetchData();
        isMounted.current = true;
    }, [searchInput]);

    useEffect(() => {
        async function fetchData() {
            if (isMounted.current) {
                setIsLoading(true);
                const { data, error } = await searchQuery({ variables: { searchInput: { ...searchInput, page } } });
                if (error) {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                    return;
                }
                setOffers(data.search);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [page]);

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <Search className={styles.main__search} setSearchInput={setSearchInput} variant='search' />
            <h2 className={styles.main__heading}>Wyniki</h2>
            <div className={styles.main__offers}>
                {
                    isLoading && <Loading />
                }
                {
                    offers && offers.data.length > 0 ?
                        <>
                            {
                                offers.data.map(offer => {
                                    return (
                                        <OfferTile
                                            key={offer._id}
                                            _id={offer._id}
                                            title={offer.title}
                                            location={offer.location}
                                            company={offer.company}
                                            mode={offer.mode}
                                            salary={offer.salary}
                                            requiredTechnologies={offer.requiredTechnologies}
                                        />
                                    )
                                })
                            }
                            {
                                offers.lastPage > 1 && <Pagination lastPage={offers.lastPage} page={page} setPage={setPage} />
                            }
                        </>
                        :
                        <p className={styles.main__noResults}>Brak wyników</p>
                }
            </div>
        </main>
    )
}

export default Feed
