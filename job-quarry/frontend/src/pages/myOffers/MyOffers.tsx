import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MY_OFFERS } from '../../graphql/queries';
import MyOfferTile from '../../components/myOfferTile/MyOfferTile';
import styles from './myOffers.module.css';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

const MyOffers = () => {
    const [offerQuery] = useLazyQuery(GET_MY_OFFERS);
    const [offers, setOffers] = useState<MyOffer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await offerQuery();
            if (error) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
                return;
            }
            setOffers(data.myOffers);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            {
                offers.length > 0 ?
                    offers.map(offer => {
                        return (
                            <MyOfferTile
                                key={offer._id}
                                _id={offer._id}
                                title={offer.title}
                                salary={offer.salary}
                                level={offer.level}
                                contractType={offer.contractType}
                                expiresAt={offer.expiresAt}
                                setOffers={setOffers}
                            />
                        )
                    })
                    :
                    <p className={styles.main__noResults}>Brak ofert</p>
            }
        </main>
    )
}

export default MyOffers
