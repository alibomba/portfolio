import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useLazyQuery, useMutation } from '@apollo/client';
import { OfferInfo, OfferTechnologies, OfferListSection, OfferRecruitment, ApplicationForm } from '../../sections';
import styles from './offer.module.css';
import { GET_OFFER, IS_BOOKMARKED } from '../../graphql/queries';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import Popup from '../../components/popup/Popup';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { ADD_VIEW, BOOKMARK } from '../../graphql/mutations';

const Offer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoading, isAuthorized, isCompany } = useSelector((state: RootState) => state.auth);
    const [offer, setOffer] = useState<Offer | null>(null);
    const [offerQuery] = useLazyQuery(GET_OFFER);
    const [isBookmarkedQuery] = useLazyQuery(IS_BOOKMARKED);
    const [bookmarkMutation] = useMutation(BOOKMARK, { refetchQueries: [{ query: IS_BOOKMARKED }] });
    const [viewMutation] = useMutation(ADD_VIEW);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [isOfferLoading, setIsOfferLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<Popup>({ content: null, active: false, type: 'good' });


    useEffect(() => {
        async function fetchData() {
            const { data, error } = await offerQuery({ variables: { getOfferId: id } });
            if (error) {
                const graphQLError = error.graphQLErrors[0];
                if (graphQLError.extensions.code === 'NOT_FOUND') {
                    navigate('/404');
                } else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
                return;
            }
            setOffer(data.getOffer);
            try {
                await viewMutation({ variables: { addViewId: id } });
            } catch (err) {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
                return;
            }
            setIsOfferLoading(false);
        }

        fetchData();

    }, [id]);

    useEffect(() => {
        async function fetchData() {
            if (!isLoading && isAuthorized && !isCompany) {
                const { data, error } = await isBookmarkedQuery({ variables: { isBookmarkedId: id } });
                if (error) {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                    return;
                }
                if (data.isBookmarked.success) {
                    setIsBookmarked(true);
                }
            }
        }

        fetchData();
    }, [isLoading]);

    async function bookmark() {
        if (isLoading) return;
        if (!isAuthorized) {
            setPopup({ content: 'Musisz być zalogowany', active: true, type: 'bad' });
            setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            return;
        }
        try {
            const { data } = await bookmarkMutation({ variables: { bookmarkId: id } });
            if (data.bookmark.isBookmarked) {
                setIsBookmarked(true);
                setPopup({ content: 'Dodano do zapisanych', active: true, type: 'good' });
                setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            }
            else {
                setIsBookmarked(false);
                setPopup({ content: 'Usunięto z zapisanych', active: true, type: 'good' });
                setTimeout(() => setPopup(prev => ({ ...prev, active: false })), 4000);
            }
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie później...');
        }
    }

    function toApplication() {
        const section = document.querySelector('#applicationSection') as HTMLElement;
        section.scrollIntoView({ behavior: 'smooth' });
    }

    if (isOfferLoading || !offer || isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <header className={styles.main__header}>
                <div className={styles.header__left}>
                    <Link to={`/firma/${offer.company._id}`}>
                        <img className={styles.header__logo} src={offer.company.logo || '/default.webp'} alt={`logo ${offer.company.companyName}`} />
                    </Link>
                    <div className={styles.header__column}>
                        <p className={styles.header__companyName}><Link to={`/firma/${offer.company._id}`} style={{ all: 'unset', cursor: 'pointer' }}>{offer.company.companyName}</Link></p>
                        <h1 className={styles.header__title}>{offer.title}</h1>
                    </div>
                </div>
                {
                    !isCompany &&
                    <div className={styles.header__right}>
                        <button onClick={bookmark} title={isBookmarked ? 'Usuń z zapisanych' : 'Zapisz ofertę'} className={styles.header__bookmark}>
                            {
                                isBookmarked ? <FaBookmark /> : <FaRegBookmark />
                            }
                        </button>
                        <button onClick={toApplication} className={styles.header__button}>Aplikuj</button>
                    </div>
                }
            </header>
            <main className={styles.main__main}>
                <OfferInfo
                    mode={offer.mode}
                    location={offer.location}
                    level={offer.level}
                    expiresAt={offer.expiresAt}
                    contractType={offer.contractType}
                    salary={offer.salary}
                />
                <OfferTechnologies
                    requiredTechnologies={offer.requiredTechnologies}
                    optionalTechnologies={offer.optionalTechnologies}
                />
                <section className={styles.main__description}>
                    <h2 className={styles.description__heading}>Opis:</h2>
                    <p className={styles.description__content}>{offer.description}</p>
                </section>
                <OfferListSection
                    heading='Twoje zadania'
                    items={offer.tasks}
                />
                <OfferListSection
                    heading='Wymagamy'
                    items={offer.required}
                />
                <OfferListSection
                    heading='Opcjonalnie'
                    items={offer.optional}
                />
                <OfferListSection
                    heading='Oferujemy'
                    items={offer.benefits}
                />
                <OfferRecruitment
                    recruitmentStages={offer.recruitmentStages}
                />
                {
                    !isCompany && <ApplicationForm offerId={id!} />
                }
            </main>
            <Popup active={popup.active} type={popup.type}>{popup.content}</Popup>
        </main>
    )
}

export default Offer
