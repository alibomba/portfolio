import { useState } from 'react';
import { Link } from 'react-router-dom';
import OfferTile from '../../components/offerTile/OfferTile';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import styles from './offersHomepage.module.css';
import { useQuery } from '@apollo/client';
import { OFFER_SEARCH } from '../../graphql/queries';

const OffersHomepage = () => {
    const [offers, setOffers] = useState<OfferTile[]>([]);
    const { error, loading } = useQuery(OFFER_SEARCH, { variables: { searchInput: { page: 1 } }, onCompleted: data => setOffers(data.search.data) });

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error>Coś poszło nie tak, spróbuj ponownie później...</Error>
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.section__heading}>Najnowsze oferty</h2>
            <div className={styles.section__column}>
                {
                    offers.map(offer => {
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
                }
            </div>
            <Link className={styles.section__button} to='/przegladaj'>Zobacz więcej</Link>
        </section>
    )
}

export default OffersHomepage
